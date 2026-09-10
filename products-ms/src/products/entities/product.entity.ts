import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity({ name: 'products' })
@Index('idx_products_not_deleted', ['isDeleted'])
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public price: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @Column({
    name: 'deleted_at',
    type: 'datetime',
    nullable: true,
    default: null,
  })
  public deletedAt: Date | null;

  @Column({ name: 'is_deleted', nullable: true, default: false })
  public isDeleted: boolean;
}
