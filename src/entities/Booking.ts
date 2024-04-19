import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { GroceryItem } from './GroceryItem';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    totalPrice!: number;

    // Define the relationship with User entity
    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @Column('jsonb')
    items!: { itemId: number; quantity: number }[];
}
