import PasswordSaltModel from '@/resources/password-salt/password-salt.model';

class PasswordSaltService {
    
    private passwordSaltModel = PasswordSaltModel;

    public async registerPasswordSaltForUsername(username: string, passwordSalt: string): Promise<Error | PasswordSaltModel>{
        
        try {

            const person = await this.passwordSaltModel.create({ username, passwordSalt });
            return person;

        } 
        catch (error: any) {
            throw new Error(`Unable to create password salt.\ Error: ${error.message}`);
        }

    }

    public async getPasswordSaltForUsername(username: string): Promise<Error | PasswordSaltModel> {

        try {

            const passwordSalt = await this.passwordSaltModel.findOne({ where: { username }});

            if (!passwordSalt){
                throw new Error('Unable to find password salt for given username');
            }
            else {
                return passwordSalt;
            }

        }
        catch (error) {
            throw new Error('no password salt found for given username');
        }

    }

    public async editPasswordSaltForUsername(username: string, passwordSalt: string): Promise<Error | PasswordSaltModel> {

        try {

            const passwordSalt = await this.passwordSaltModel.findOne({ where: { username }});

            if (!passwordSalt){
                throw new Error('Unable to find password salt for given username');
            }
            else {

                passwordSalt.setDataValue('salt', passwordSalt);
                passwordSalt.save();
                return passwordSalt;

            }

        }
        catch (error) {
            throw new Error('no password salt found for given username');
        }

    }

    public async deleteUsernameAndPassowrdSalt(username: string): Promise<Error | boolean> {

        try {

            const passwordSalt = await this.passwordSaltModel.findOne({ where: { username }});
            
            if (!passwordSalt){
                throw new Error('Unable to find password salt for given username');
            }
            else {

                passwordSalt?.destroy();
                return true;
                
            }

        }
        catch (error) {
            throw new Error('no password salt found for given username');
        }

    }

}

export default PasswordSaltService;
