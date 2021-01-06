// Classe para manipular a criação de UUID's na versão 4
import { v4 } from 'uuid';

export class IdGenerator {
    public generate(): string {
        return v4();
    }
}
