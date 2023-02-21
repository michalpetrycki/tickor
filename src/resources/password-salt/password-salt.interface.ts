interface PasswordSalt {
    user_salt: {
        id: number;
        username: string;
        password_salt: string;
    }
}

export default PasswordSalt;