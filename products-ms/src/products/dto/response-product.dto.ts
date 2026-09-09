import { HttpStatus } from '@nestjs/common';

interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductResponse {
  statusCode: HttpStatus;
  message: string;
  data: Product | Product[];
  count?: number;
}
