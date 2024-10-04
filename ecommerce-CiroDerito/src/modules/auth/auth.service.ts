import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../users/user.repository";
const bcrypt = require('bcryptjs');
import { User } from "src/entities/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) { }
    getAuths(): string {
        return 'Autenticado'
    }

    async singup(user: Partial<User>) {
        const { email, password } = user
        if (!email || !password)
            throw new BadRequestException('Se requiere email y password')

        const foundUser = await this.userRepository.getUserByEmail(email);

        if (foundUser) throw new BadRequestException('El email esta en uso')

        const hashedPassword = await bcrypt.hash(password, 10)
        return await this.userRepository.createUser({ ...user, password: hashedPassword })

    }


    async singIn(email: string, password: string) {
        if (!email || !password)
            return 'Los datos son requeridos';
        const user = await this.userRepository.getUserByEmail(email)
        if (!user) throw new BadRequestException('Credenciales invalidas')

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new BadRequestException('Credenciales invalidas');

        const payload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        };

        const token = this.jwtService.sign(payload)

        return {
            message: 'Login exitoso',
            token,
        }
    }
}

