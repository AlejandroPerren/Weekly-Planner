import { CryptoRepository } from "../../services/CryptoRepository";
import {User} from '../../entities/User';
import { ms } from "../../utils/ms";

export function createCryptoRepositoryMock() : CryptoRepository {
    return {
        async hashPassword(password: string) : Promise<string>{
            await ms(100)
            return "[HASHED]" + password
        },
        async comparePassword(password: string, hashedPassword: string) : Promise<boolean> {
            return "[HASHED]" + password === hashedPassword
        },
        async generateJWT(user: User) : Promise<string>{
            return "JWT" + JSON.stringify({
                dni : user.dni,
                name : user.name,
                email : user.email,
            })
        },
        async validateToken(token: string) : Promise<User> {
            return JSON.parse(token.slice(3))
        },
        generateRandomToken(): string {
            return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        },
    }
}