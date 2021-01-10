import { PostgresDatabase } from '../../database/PostsgresDatabase';
import { DatabaseError } from '../../errors/DatabaseError';
import { User } from '../../entities/User';
import { IUsersRepository } from './IUsersRepository';

export class PostgresUsersRepository implements IUsersRepository {
    private postgresDb: PostgresDatabase;

    constructor() {
        this.postgresDb = new PostgresDatabase();
    }

    public async findByEmail(email: string): Promise<User> {
        try {
            const [ result ] = await this.postgresDb.getConnection()
                .select('*')
                .from('users')
                .where({ email })

            if (!result) return undefined;
            
            const user = new User(
                result.id,
                result.email,
                result.password
            );

            return user;
        } catch (error) {
            throw new DatabaseError(error.message);
        }
    }

    public async save(user: User): Promise<void> {
        try {
            await this.postgresDb.getConnection()
                .insert({
                    id: user.getId(),
                    email: user.getEmail(),
                    password: user.getPassword()
                })
                .into('users')
        } catch (error) {
            throw new DatabaseError(error.message);
        }
    }
}