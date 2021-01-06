// Classe para manipular os hashs de senhas
import * as bcrypt from 'bcryptjs';

export class HashManager {
    public async hash(text: string): Promise<string> {
        // Em situações normais, o cost da função é colocada em variáveis ambiente
        // para uma maior segurança
        const rounds: number = Number(12);
        const salt: string = await bcrypt.genSalt(rounds);
        const result: string = await bcrypt.hash(text, salt);

        return result;
    }

    public async compare(text: string, hash: string): Promise<boolean> {
        const result: boolean = await bcrypt.compare(text, hash);
        return result;
    }
}