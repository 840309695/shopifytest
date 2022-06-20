import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { ProductService } from './service/product.service';
import { ConfigModule } from '@nestjs/config';
import { ClientService } from './service/client.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [ProductService,ClientService],
})
export class AppModule {}
