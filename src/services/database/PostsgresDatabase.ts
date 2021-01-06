import Knex from 'knex';
import config from './config';
import { IBaseDatabase } from './IBaseDatabase';

export class PostgresDatabase implements IBaseDatabase {
    private connection: Knex | null;

    public getConnection(): Knex {
        if (!this.connection) {
            this.connection = Knex(config['postgres']);
        }

        return this.connection;
    }

    public async destroyConnection(): Promise<void> {
        if(this.connection) {
            await this.connection.destroy();
            this.connection = null;
        }
    }
}