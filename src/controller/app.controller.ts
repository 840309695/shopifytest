import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../service/product.service';

@Controller()
export class AppController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  upload(): void {
    const path = './src/file/jewelery.xlsx';
    this.productService.upload(path);
  }
}
