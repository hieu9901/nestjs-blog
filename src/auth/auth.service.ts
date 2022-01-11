/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { RegisterDTO } from 'src/models/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,

        private mailService: MailService
    ){}

    async register(credentials: RegisterDTO){
        try {
            const user = this.userRepo.create(credentials);
            await user.save();
            this.mailService.sendConfirmationEmail(user, '1234');
            return user;
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}
