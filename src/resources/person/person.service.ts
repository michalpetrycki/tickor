import token from '@/utils/token';
import Person from '@/resources/person/person.model';
import PersonModel from '@/resources/person/person.model';
import { default as env } from '@/utils/config/config';
import fetch from 'cross-fetch';
import * as argon2 from 'argon2';
import PasswordHash from '@/resources/password-hash/password-hash.interface';
import PasswordSalt from '@/resources/password-salt/password-salt.interface';
import adze from 'adze';

class PersonService {

    private personModel = PersonModel;

    /**
     * Register a new user
     */
    public async register(username: string, email: string, password: string, kind: string): Promise<Error | string> {

        try {

            const person = await this.personModel.create({ username, email, kind });
            const [passSalt, passHash] = await this.extractPasswordHashAndSalt(password);

            const hashResponse = await this.registerPasswordHash(2, passHash, username);
            const saltResponse = await this.registerPasswordSalt(2, passSalt, username);

            if (hashResponse instanceof Error) {
                throw hashResponse;
            }
            else {
                adze().info(hashResponse);
            }

            if (saltResponse instanceof Error) {
                throw saltResponse;
            }
            else {
                adze().info(saltResponse);
            }

            const accessToken = token.createToken(person);
            return accessToken;

        }
        catch (error: any) {
            throw new Error(`Unable to create person.\ Error: ${error.message}`);
        }

    }

    /**
     * Attempt to login a person
     */
    public async loginWithEmail(email: string, password: string): Promise<Error | string> {
        try {

            const existingPerson = await this.personModel.findOne({ where: { email } });

            if (!existingPerson) {
                throw new Error('Unable to find person with that email address');
            }

            if (await existingPerson.isPasswordValid(password, '$abcd')) {
                return token.createToken(existingPerson);
            }
            else {
                throw new Error('Wrong credentials given');
            }

        }
        catch (error) {
            throw new Error('Unable to login person. ' + error);
        }
    }

    /**
     * Attempt to login a person
     */
    public async loginWithUsername(username: string, password: string): Promise<Error | string> {

        try {

            const existingPerson = await this.personModel.findOne({ where: { username } });

            if (!existingPerson) {
                throw new Error('Unable to find person with that username');
            }

            const passHashStr = await this.fetchUserPasswordHash(username);
            const passSaltStr = await this.fetchUserPasswordSalt(username);

            if (passHashStr instanceof Error) {
                throw new Error('ERROR - Password hash or salt ');
            }
            if (passSaltStr instanceof Error) {
                throw new Error('ERROR - Password hash or salt ');
            }

            const passHash = (<PasswordHash>JSON.parse(passHashStr)).user_hash.password_hash;
            const passSalt = (<PasswordSalt>JSON.parse(passSaltStr)).user_salt.password_salt;
            const restoredHash = passHash.replace('insertsalthere', passSalt);

            if (await existingPerson.isPasswordValid(password, restoredHash)) {
                return token.createToken(existingPerson);
            }
            else {
                throw new Error('ERROR - Wrong credentials given');
            }

        }
        catch (error) {
            throw new Error('Unable to login person. ' + error);
        }

    }

    public async getPersons(): Promise<Error | Person[]> {

        try {
            return Person.findAll({});
        }
        catch (error) {
            throw new Error('Unable to get persons');
        }

    }

    public async getByEmail(email: string): Promise<Error | PersonModel> {

        try {
            const existingPerson = await this.personModel.findOne({ where: { email } });

            if (!existingPerson) {
                throw new Error('Unable to find person with that email address');
            }
            else {
                return existingPerson;
            }

        }
        catch (error) {
            throw new Error('ERROR - no person with given email found');
        }

    }

    public async getById(id: number): Promise<PersonModel | null> {
        return await this.personModel.findByPk(id);
    }

    public async createPerson(id: number, username: string, email: string, kind: string): Promise<Error | PersonModel> {
        try {

            const newProject = await this.personModel.create({ id, username, email, kind });
            adze().info('INFO - new person successfully created');
            return newProject;

        }
        catch (error) {
            throw new Error('ERROR - error during creation of person. Reason => ' + error);
        }

    }

    public async editPerson(id: number, username: string, email: string, kind: string): Promise<PersonModel | null> {

        const personToEdit = await this.getById(id);

        if (!!personToEdit) {
            personToEdit.set({
                username: username ?? personToEdit.getDataValue('username'),
                email: email ?? personToEdit.getDataValue('email'),
                kind: kind ?? personToEdit.getDataValue('kind')
            });
            personToEdit.save();
        }

        return personToEdit;

    }

    public async deletePerson(id: number): Promise<boolean> {
        try {

            let success = false;
            const personToDelete = await this.getById(id);

            if (!!personToDelete) {
                await personToDelete.destroy();
                success = true;
                adze().info(`INFO - person with id {${id}} successfully deleted`);
            }

            return new Promise((resolve) => {
                resolve(success);
            });

        }
        catch (error) {
            throw new Error('ERROR - error during deleting person. Reason => ' + error);
        }

    }

    public async setAdminAccount(): Promise<void> {

        // following official documentation https://github.com/ranisalt/node-argon2/wiki/Options#salt
        // it's not recommended to generate own salt. Salt is part of the hash itself.

        const adminAccount = await this.getByEmail(env.adminEmail);

        if (adminAccount instanceof PersonModel) {

            const [passSalt, passHash] = await this.extractPasswordHashAndSalt(env.adminPassword);

            try {

                const admin_hash_response = await fetch('http://localhost:3033/api/password-hash/username', {
                    method: 'POST',
                    body: JSON.stringify({ username: env.adminLogin }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (admin_hash_response.status === 400 && (await admin_hash_response.text()).indexOf('no password hash found') > -1) {

                    try {

                        const hash_response = await this.registerPasswordHash(1, passHash, env.adminLogin);

                        if (hash_response instanceof Error) {
                            throw hash_response;
                        }
                        else {
                            adze().info(hash_response);
                        }

                    }
                    catch (error) {
                        adze().info('ERROR - Error during registration of admin password hash => ' + error);
                    }

                }
                else {
                    adze().info('INFO - admin password hash already set');
                }

            }
            catch (error) {
                adze().info('ERROR - Error during fetching admin password hash => ' + error);
            }

            try {

                const admin_salt_response = await fetch('http://localhost:3044/api/password-salt/username', {
                    method: 'POST',
                    body: JSON.stringify({ username: 'administrator' }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (admin_salt_response.status === 400 && (await admin_salt_response.text()).indexOf('no password salt found') > -1) {

                    try {

                        const salt_response = await this.registerPasswordSalt(1, passSalt, env.adminLogin);

                        if (salt_response instanceof Error) {
                            throw salt_response;
                        }
                        else {
                            adze().info(salt_response);
                        }

                    }
                    catch (error) {
                        adze().info('ERROR - Error during registration of admin password salt => ' + error);
                    }

                }
                else {
                    adze().info('INFO - admin password salt already set');
                }

            }
            catch (error) {
                adze().info('ERROR - Error during fetching admin password salt => ' + error);
            }

        }
        else {
            adze().error('ERROR - Admin account not found');
        }

    }

    private async generatePasswordHash(password: string): Promise<string> {

        return argon2.hash(env.adminPassword, {
            type: argon2.argon2id, // recommended here https://crypto.stackexchange.com/a/72437 
        });

    }

    private async extractPasswordHashAndSalt(password: string): Promise<string[]> {

        const passwordBits: string[] = [];

        try {

            const generatedHash = await this.generatePasswordHash(password);
            const generatedHashBits = generatedHash.split('$');
            passwordBits[0] = generatedHashBits[4]; // salt
            generatedHashBits[4] = 'insertsalthere';
            passwordBits[1] = generatedHashBits.join('$'); // hashWithoutSalt

        }
        catch (error) {
            adze().info('ERROR - Error during generating hash => ' + error);
        }
        finally {
            return passwordBits;
        }

    }

    private async registerPasswordHash(id: number, hashWithoutSalt: string, username: string): Promise<string | Error> {

        return new Promise<string | Error>(async (resolve) => {

            const hash_response = await fetch('http://localhost:3033/api/password-hash/register', {
                method: 'POST',
                body: JSON.stringify({ id, username, password_hash: hashWithoutSalt }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (hash_response.status === 201) {
                resolve(`SUCCESS - User ${username} password hash successfully registered`);
            }
            else {
                resolve(new Error('REASON - ' + await hash_response.text()));
            }

        });

    }

    private async registerPasswordSalt(id: number, passwordSalt: string, username: string): Promise<string | Error> {

        return new Promise<string | Error>(async (resolve) => {

            const salt_response = await fetch('http://localhost:3044/api/password-salt/register', {
                method: 'POST',
                body: JSON.stringify({ id, username, password_salt: passwordSalt }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (salt_response.status === 201) {
                resolve(`SUCCESS - User ${username} password salt successfully registered`);
            }
            else {
                resolve(new Error('REASON - ' + await salt_response.text()));
            }

        });

    }

    private async fetchUserPasswordSalt(username: string): Promise<Error | string> {

        const admin_salt_response = await fetch('http://localhost:3044/api/password-salt/username', {
            method: 'POST',
            body: JSON.stringify({ username }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (admin_salt_response.status === 200) {
            return await admin_salt_response.text();
        }
        else {
            return new Error('ERROR - Error while fetching user password salt => ' + await admin_salt_response.text());
        }

    }

    private async fetchUserPasswordHash(username: string): Promise<Error | string> {

        const admin_hash_response = await fetch('http://localhost:3033/api/password-hash/username', {
            method: 'POST',
            body: JSON.stringify({ username }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (admin_hash_response.status === 200) {
            return await admin_hash_response.text();
        }
        else {
            return new Error('ERROR - Error while fetching user password hash => ' + await admin_hash_response.text());
        }

    }

}

export default PersonService;
