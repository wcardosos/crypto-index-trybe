import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { CreateUserUseCase } from './CreateUserUseCase';

describe("Testes de criação de usuários", () => {
    const idGenerator: any = {};
    const hashManager: any = {};
    const authenticator: any = {};
    const usersRepository: any = {};

    const createUserUseCase = new CreateUserUseCase(
        idGenerator,
        hashManager,
        authenticator,
        usersRepository
    );

    test("Retorna erro quando a entrada é vazia", async () => {
        expect.assertions(3);

        try {
            await createUserUseCase.execute({
                email: "",
                password: ""
            });
        } catch (error) {
            expect(error.message).toBe("Entrada vazia");
            expect(error.code).toBe(422);
            expect(error).toBeInstanceOf(InvalidParameterError);
        }
    });

    test("Retorna erro quando uma entrada específica é vazia", async () => {
        expect.assertions(3);

        try {
            await createUserUseCase.execute({
                email: "",
                password: "123456"
            });
        } catch (error) {
            expect(error.message).toBe("Email vazio");
            expect(error.code).toBe(422);
            expect(error).toBeInstanceOf(InvalidParameterError);
        }
    });

    test("Retorna erro quando o email é inválido por não ter '@'", async () => {
        expect.assertions(3);

        try {
            await createUserUseCase.execute({
                email: "email",
                password: "123456"
            });
        } catch (error) {
            expect(error.message).toBe("Email inválido");
            expect(error.code).toBe(422);
            expect(error).toBeInstanceOf(InvalidParameterError);
        }
    });

    test("Retorna erro quando o email é inválido por não ter '.com' no final", async () => {
        expect.assertions(3);
        
        try {
            await createUserUseCase.execute({
                email: "email@email",
                password: "123456"
            });
        } catch (error) {
            expect(error.message).toBe("Email inválido");
            expect(error.code).toBe(422);
            expect(error).toBeInstanceOf(InvalidParameterError);
        }
    });

    test("Retorna erro quando a senha tem menos de 6 caracteres", async () =>{
        expect.assertions(3);
        
        try {
            await createUserUseCase.execute({
                email: "email@email.com",
                password: "123"
            });
        } catch (error) {
            expect(error.message).toBe("Senha possui menos de 6 caracteres");
            expect(error.code).toBe(422);
            expect(error).toBeInstanceOf(InvalidParameterError);
        }
    });

    test("Retorna erro quando a senha não é numérica", async () => {
        expect.assertions(3);
        
        try {
            await createUserUseCase.execute({
                email: "email@email.com",
                password: "password"
            });
        } catch (error) {
            expect(error.message).toBe("Senha deve ser numérica");
            expect(error.code).toBe(422);
            expect(error).toBeInstanceOf(InvalidParameterError);
        }
    });

    test("Cria o usuário quando todos os campos são válidos", async () => {
        expect.assertions(7);

        try {
            idGenerator.generate = jest.fn(() => "id");
            hashManager.hash = jest.fn(() => "senha");
            authenticator.generateToken = jest.fn(() => "token");
            usersRepository.save = jest.fn();

            const token = await createUserUseCase.execute({
                email: "email@email.com",
                password: "123456"
            });
            
            expect(idGenerator.generate).toHaveBeenCalled();
            expect(idGenerator.generate).toReturnWith("id");
            expect(hashManager.hash).toHaveBeenCalled();
            expect(hashManager.hash).toReturnWith("senha");
            expect(usersRepository.save).toHaveBeenCalled();
            expect(authenticator.generateToken).toHaveBeenCalled();
            expect(token).toBe("token");
        } catch (error) {
            console.log("OLHA O ERRO: **********" + error)
        }
    })
})