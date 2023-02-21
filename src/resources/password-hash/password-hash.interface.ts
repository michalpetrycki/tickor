interface PasswordHash {
    user_hash: {
        id: number;
        username: string;
        password_hash: string;
    }
}

export default PasswordHash;