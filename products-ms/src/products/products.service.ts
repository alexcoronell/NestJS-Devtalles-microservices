import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import {
  ResponseSingleProductDto,
  ResponseProductList,
} from './dto/response-product.dto';

import { PaginationDto } from '@common/dto/pagination.dto';
import { normalizePagination, paginationHelper } from '@common/helpers/index';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<ResponseSingleProductDto> {
    const product = this.productRepository.create(createProductDto);
    const response: Product = await this.productRepository.save(product);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product created successfully',
      data: response,
    };
  }

  async findAll(pagination?: PaginationDto): Promise<ResponseProductList> {
    const { page, limit, skip } = normalizePagination(
      pagination?.page,
      pagination?.limit,
    );

    const [data, count] = await this.productRepository.findAndCount({
      where: { isDeleted: false },
      skip,
      take: limit,
    });

    return paginationHelper(data, count, page, limit);
  }

  async findOne(id: number): Promise<ResponseSingleProductDto> {
    const product = await this.productRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!product) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Product with id:${id} not found`,
      });
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Product retrieved successfully',
      data: product,
    };
  }

  async update(
    updateProductDto: UpdateProductDto,
  ): Promise<ResponseSingleProductDto> {
    const { id, ...data } = updateProductDto;
    const { data: product } = await this.findOne(id);
    Object.assign(product, data);
    const updatedProduct = await this.productRepository.save(product);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  async remove(id: number) {
    const { data: product } = await this.findOne(id);
    const changes = {
      isDeleted: true,
      deletedAt: new Date(),
    };

    Object.assign(product, changes);
    await this.productRepository.save(product);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Product removed successfully',
    };
  }
}
