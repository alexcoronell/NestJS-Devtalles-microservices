/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpStatus } from '@nestjs/common';
import {
  ResponseProductDto,
  ResponseProductList,
} from '../../products/dto/response-product.dto';
import { Product } from '../../products/entities/product.entity';

export const paginationHelper = (
  data: Product[],
  count: number,
  page: number,
  limit: number | undefined,
): ResponseProductList => {
  const totalPages = limit !== undefined ? Math.ceil(count / limit) : undefined;

  const products: ResponseProductDto[] = data.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }));

  return {
    statusCode: HttpStatus.OK,
    data: products,
    meta: {
      totalItems: count,
      page,
      limit,
      totalPages,
      hasNextPage: totalPages !== undefined ? page < totalPages : false,
      hasPreviousPage: totalPages !== undefined ? page > 1 : false,
    },
  };
};
