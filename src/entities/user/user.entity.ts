import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'varchar',
        unique: true,
        length: 255,
    })
    email: string;

    @Column({
        type: 'varchar',
        unique: true,
        length: 255,
    })
    username: string;
    
    @Column({
        type: 'varchar',
        length: 255,
        select: false
    })
    password: string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string){
        return await bcrypt.compare(attempt, this.password);
    }

    toJSON(){
       // return instanceToPlain(this); //??
    }
}