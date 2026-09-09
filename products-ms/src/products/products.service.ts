import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductResponse } from './dto/response-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductResponse> {
    const product = this.productRepository.create(createProductDto);
    const response: Product = await this.productRepository.save(product);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product created successfully',
      data: response,
    };
  }

  async findAll(): Promise<ProductResponse> {
    const [data, count] = await this.productRepository.findAndCount({
      where: { isDeleted: false },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Products retrieved successfully',
      data,
      count,
    };
  }

  async findOne(id: number): Promise<ProductResponse> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Product retrieved successfully',
      data: product,
    };
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductResponse> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    Object.assign(product, updateProductDto);
    const updatedProduct = await this.productRepository.save(product);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    await this.productRepository.remove(product);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Product removed successfully',
    };
  }
}
