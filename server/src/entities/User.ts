import { Field, ID, ObjectType } from 'type-graphql'
import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm'

@ObjectType()
@Entity()
export class User extends BaseEntity{
    @Field(_type => ID)
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column({unique: true})
    username!: string

    @Field()
    @Column({unique: true})
    email!: string

    @Column()
    password!: string

    @Field()
    @CreateDateColumn()
    createAt: Date
    
    @Field()
    @CreateDateColumn()
    updateAt: Date
}