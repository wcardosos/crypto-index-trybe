import fs from 'fs';

export class FileHandler {
    public async write(file: string, data: any): Promise<void | false> {
        try {
            await fs.writeFileSync(file, data);
        } catch(error) {
            return false;
        }
    }
}