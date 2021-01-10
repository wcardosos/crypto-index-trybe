import { User } from '../../entities/User';
import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { LoginUserUseCase } from './LoginUserUseCase';

describe("Testes de login de usuários", () => {
    const idGenerator: any = {};
    const hashManager: any = {};
    const authenticator: any = {};
    const usersRepository: any = {};

    const loginUserUseCase = new LoginUserUseCase(
        idGenerator,
        hashManager,
        authenticator,
        usersRepository
    );

    test("Retorna erro quando a entrada é vazia", async () => {
        expect.assertions(3);

        try {
            await loginUserUseCase.execute({
                email: "",
                unhashedPassword: ""
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
            await loginUserUseCase.execute({
                email: "",
                unhashedPassword: "123456"
            });
        } catch (error) {
            expect(error.message).toBe("Email vazio");
            expect(error.code).toBe(422);
            expect(error).toBeInstanceOf(InvalidParameterError);
        }
    });

    test("Retorna erro quando email não foi encontrado", async () => {
        expect.assertions(3);

        try {
            usersRepository.findByEmail = jest.fn(() => undefined);

            await loginUserUseCase.execute({
                email: "email@email.com",
                unhashedPassword: "unhashedPassword"
            });
        } catch (error) {
            expect(error.message).toBe("Email não cadastrado");
            expect(error.code).toBe(422);
            expect(error).toBeInstanceOf(InvalidParameterError);
        }
    });

    test("Retorna erro quando a senha é incorreta", async () => {
        expect.assertions(3);

        try {
            usersRepository.findByEmail = jest.fn(() => new User(
                "id",
                "email",
                "password"
            ));
            hashManager.compare = jest.fn(() => false);

            await loginUserUseCase.execute({
                email: "email@email.com",
                unhashedPassword: "unhashedPassword"
            })
        } catch (error) {
            expect(error.message).toBe("Senha incorreta");
            expect(error.code).toBe(422);
            expect(error).toBeInstanceOf(InvalidParameterError);
        }
    });

    test("Retorna token de autenticação quando as informações são corretas", async () => {
        expect.assertions(3);

        try {
            hashManager.compare = jest.fn(() => true);
            authenticator.generateToken = jest.fn(() => "token")

            const token = await loginUserUseCase.execute({
                email: "email@email.com",
                unhashedPassword: "unhashedPassword"
            });

            expect(usersRepository.findByEmail).toHaveBeenCalled();
            expect(hashManager.compare).toHaveBeenCalled();
            expect(token).toBe("token");
        } catch (error) {}
    });

})