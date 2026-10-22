import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"profiles"})
export class Profile{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar", length:225, name:"first_name"})
    firstName:string;

    @Column({type:"varchar", length:225, name:"last_name"})
    lastName:string;

    @Column({type:"varchar", length:225, unique:true, nullable:true})
    nickname:string;

    @Column({type:"varchar", length:225, nullable:true})
    avatar:string;

    @CreateDateColumn({type:"timestamptz", default: () => 'CURRENT_TIMESTAMP', name:"created_at"})
    createdAt:Date;

    @UpdateDateColumn({type:"timestamptz", default:() => 'CURRENT_TIMESTAMP', name:"updated_at"})
    updatedAt:Date
}