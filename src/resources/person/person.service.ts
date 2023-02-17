import token from '@/utils/token';
import Person from '@/resources/person/person.model';
import PersonModel from '@/resources/person/person.model';
import bcrypt from 'bcrypt';
import { default as env } from '@/utils/config/config';
import PasswordHashController from '@/resources/password-hash/password-hash.controller';
import PasswordSaltController from '@/resources/password-salt/password-salt.controller';
import TickorApp from 'apps/TickorApp';
import fetch from 'cross-fetch';

class PersonService {

    private personModel = PersonModel;

    /**
     * Register a new user
     */
    public async register(username: string, email: string, password: string, kind: string): Promise<Error | string> {

        try {

            const person = await this.personModel.create({ username, email, password, kind });

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

            if (await existingPerson.isPasswordValid(password)) {
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

            if (await existingPerson.isPasswordValid(password)) {
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
            throw new Error('no person with given email found');
        }

    }

    public async getById(id: number): Promise<Error | Person> {

        try {
            const existingPerson = await this.personModel.findByPk(id);

            if (!existingPerson) {
                throw new Error('id does not specify a valid person');
            }
            else {
                return existingPerson;
            }

        }
        catch (error) {
            throw new Error('Error during fetching by id: ' + error);
        }

    }

    public async insertInitialPersonData(): Promise<void> {



    }

    public async setAdminAccount(): Promise<void> {

        const adminAccount = await this.getByEmail(env.adminEmail);

        if (adminAccount instanceof PersonModel) {

            let salt = '';
            let hash = '';

            try {

                const admin_salt_response = await fetch('http://localhost:3044/api/password-salt/username', {
                    method: 'POST',
                    body: JSON.stringify({ username: 'admin' }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (admin_salt_response.status === 400 && (await admin_salt_response.text()).indexOf('no password salt found') > -1) {

                    try {
                        salt = bcrypt.genSaltSync(7);
                    }
                    catch (error) {
                        console.error('ERROR - Error during generating password salt => ' + error);
                    }

                    try {

                        const salt_response = await fetch('http://localhost:3044/api/password-salt/register', {
                            method: 'POST',
                            body: JSON.stringify({ id: 1, username: 'admin', password_salt: salt }),
                            headers: { 'Content-Type': 'application/json' }
                        });

                        if (salt_response.status === 201) {
                            console.info('SUCCESS - Admin password salt successfully registered');
                        }
                        else {
                            throw new Error('REASON - ' + await salt_response.text());
                        }

                    }
                    catch (error) {
                        console.log('ERROR - Error during registration of admin password salt => ' + error);
                    }

                }
                else {
                    console.log('INFO - admin password salt already set');
                }

            }
            catch (error) {
                console.log('ERROR - Error during fetching admin password salt => ' + error);
            }

            try {

                const admin_hash_response = await fetch('http://localhost:3033/api/password-hash/username', {
                    method: 'POST',
                    body: JSON.stringify({ username: 'admin' }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (admin_hash_response.status === 400 && (await admin_hash_response.text()).indexOf('no password hash found') > -1) {

                    try {
                        hash = bcrypt.hashSync(env.adminPassword, salt);
                    }
                    catch (error) {
                        console.error('ERROR - Error during generating password hash => ' + error);
                    }

                    try {

                        const hash_response = await fetch('http://localhost:3033/api/password-hash/register', {
                            method: 'POST',
                            body: JSON.stringify({ id: 1, username: 'admin', password_hash: hash }),
                            headers: { 'Content-Type': 'application/json' }
                        });

                        if (hash_response.status === 201) {
                            console.info('SUCCESS - Admin password hash successfully registered');
                        }
                        else {
                            throw new Error('REASON - ' + await hash_response.text());
                        }

                    }
                    catch (error) {
                        console.log('ERROR - Error during registration of admin password hash => ' + error);
                    }

                }
                else {
                    console.log('INFO - admin password hash already set');
                }

            }
            catch (error) {
                console.log('ERROR - Error during fetching admin password hash => ' + error);
            }

        }
        else {
            console.error('ERROR - Admin account not found');
        }

    }

}

export default PersonService;
