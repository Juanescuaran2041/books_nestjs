import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar", length: 225, unique:true})
    email:string

    @Column({type:"varchar", length:225})
    password:string

    @CreateDateColumn({type: "timestamptz", default: () => 'CURRENT_TIMESTAMP', name:"created_at"})
    createdAt:Date

    @UpdateDateColumn({type: "timestamptz", default:() => 'CURRENT_TIMESTAMP', name:"updated_at"})
    updatedAt:Date
}