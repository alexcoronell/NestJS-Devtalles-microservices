import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct(@Body() createProductDto: any) {
    return `This action adds a new product with data: ${JSON.stringify(createProductDto)}`;
  }

  @Get()
  findAllProducts() {
    return 'This action returns all products';
  }

  @Get(':id')
  findProductById(@Param('id', ParseIntPipe) id: number) {
    return `This action returns a product by id: ${id}`;
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: any,
  ) {
    return `This action updates a product by id: ${id}, with data: ${JSON.stringify(updateProductDto)}`;
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return `This action delete a product by id: ${id}`;
  }
}
