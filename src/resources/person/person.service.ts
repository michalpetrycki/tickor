import token from '@/utils/token';
import Person from '@/resources/person/person.model';

class PersonService {
    
    private person = Person;

    /**
     * Register a new user
     */
    public async register(username: string, email: string, password: string, role: string): Promise<Error | string>{
        
        try {

            const person = await this.person.create({ username, email, password, role });

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
            
            const existingPerson = await this.person.findOne({ where: {  email } });

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

}

export default PersonService;
