import PasswordHashModel from '@/resources/password-hash/password-hash.model';

class PasswordHashService {
    
    private passwordHashModel = PasswordHashModel;

    public async registerPasswordHashForUsername(id: number, username: string, password_hash: string): Promise<Error | PasswordHashModel>{
        
        try {

            const person = await this.passwordHashModel.create({ id, username, password_hash });
            return person;

        } 
        catch (error: any) {
            throw new Error(`Unable to create password hash.\ Error: ${error.message}`);
        }

    }

    public async getPasswordHashForUsername(username: string): Promise<Error | PasswordHashModel> {

        try {

            const user_hash = await this.passwordHashModel.findOne({ where: { username }});

            if (!user_hash){
                throw new Error('Unable to find password hash for given username');
            }
            else {
                return user_hash;
            }

        }
        catch (error) {
            throw new Error('no password hash found for given username');
        }

    }

    public async editPasswordHashForUsername(username: string, passwordHash: string): Promise<Error | PasswordHashModel> {

        try {

            const passwordHash = await this.passwordHashModel.findOne({ where: { username }});

            if (!passwordHash){
                throw new Error('Unable to find password hash for given username');
            }
            else {

                passwordHash.setDataValue('password_hash', passwordHash);
                passwordHash.save();
                return passwordHash;

            }

        }
        catch (error) {
            throw new Error('no password hash found for given username');
        }

    }

    public async deleteUsernameAndPassowrdHash(username: string): Promise<Error | boolean> {

        try {

            const passwordHash = await this.passwordHashModel.findOne({ where: { username }});
            
            if (!passwordHash){
                throw new Error('Unable to find password hash for given username');
            }
            else {

                passwordHash?.destroy();
                return true;
                
            }

        }
        catch (error) {
            throw new Error('no password hash found for given username');
        }

    }

}

export default PasswordHashService;
