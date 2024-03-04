import * as bcrypt from 'bcryptjs';

class PasswordHash {
    hashPassword = async (password: string): Promise<string> => {
        return await bcrypt.hash(password, 12);
    };

    correctPassword = async (password: string, hash: string) => {
        return await bcrypt.compare(password, hash);
    };
}

export default new PasswordHash();