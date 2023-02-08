import token from '@/utils/token';
import Person from '@/resources/person/person.model';
import PersonModel from '@/resources/person/person.model';
import bcrypt from 'bcrypt';
import { default as env } from '@/utils/config/config';

class PersonService {
    
    private personModel = PersonModel;

    /**
     * Register a new user
     */
    public async register(username: string, email: string, password: string, kind: string): Promise<Error | string>{
        
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
    public async login(email: string, password: string): Promise<Error | string>{
        try {
            
            const existingPerson = await this.personModel.findOne({ where: {  email } });

            if (!existingPerson){
                throw new Error('Unable to find person with that email address');
            }
            
            if (await existingPerson.isPasswordValid(password)){
                return token.createToken(existingPerson);
            }
            else{
                throw new Error('Wrong credentials given');
            }

        } 
        catch (error) {
            throw new Error('Unable to login person. ' + error);
        }
    }

    public async getPersons(): Promise <Error | Person[]>{

        try{
            return Person.findAll({});
        }
        catch (error){
            throw new Error('Unable to get persons');
        }

    };

    public async getByEmail(email: string): Promise<Error | Person> {

        try {
            const existingPerson = await this.personModel.findOne({ where: {  email } });

            if (!existingPerson){
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

            if (!existingPerson){
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

    public async updateAdminPassword(): Promise<void> {

        const adminAccount = await this.getByEmail(env.adminEmail);

        if (adminAccount instanceof PersonModel) {

            if (adminAccount.getDataValue('password') === '') {
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(env.adminPassword, salt);
                adminAccount.setDataValue('password', hash);
                adminAccount.save();
                console.log('Admin password updated');
            }
            else {
                console.log('Admin password already set')
            }

        }
        else {
            console.log('Admin account not found');
        }

    }

}

export default PersonService;
