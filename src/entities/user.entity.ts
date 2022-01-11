import { classToPlain, Exclude } from "class-transformer";
import { IsEmail } from "class-validator";
import { BeforeInsert, Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import * as bcrypt from "bcryptjs";

@Entity('users')
export class UserEntity extends AbstractEntity {
    @Column()
    @IsEmail()
    email: string;

    @Column()
    username: string;
    
    @Column()
    @Exclude()
    password: string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

    toJSON(){
        return classToPlain(this); //??
    }
}