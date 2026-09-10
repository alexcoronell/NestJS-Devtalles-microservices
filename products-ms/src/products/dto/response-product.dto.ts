import { HttpStatus } from '@nestjs/common';

export interface ResponseProductDto {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponseSingleProductDto {
  statusCode: HttpStatus;
  message: string;
  data: ResponseProductDto;
  count?: number;
}

export interface ResponseProductList {
  statusCode: HttpStatus.OK;
  data: ResponseProductDto[];
  meta: {
    totalItems: number;
    page: number;
    limit: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
