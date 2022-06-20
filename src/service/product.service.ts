import { Workbook } from 'exceljs';
import { Injectable } from '@nestjs/common';
import { ClientService } from '../service/client.service';
import { Product } from '../interface/product.interface';


@Injectable()
export class ProductService {
    productId:string
    constructor(private readonly clientService: ClientService) {
    }
   async upload(path: string): Promise<void> {
        const workbook = new Workbook();
        const Product={};
       await workbook.xlsx.readFile(path).then(() => {
            var worksheet = workbook.getWorksheet('jewelery');
            worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                if (rowNumber>1){
                   let values ={
                       "Title":row.values[2],
                       "IamgeSrc":[row.values[25]],
                       "Body":row.values[3],
                       "VariantPrice":[row.values[20]],
                       "Option":[row.values[6]]
                   }
                   if(Product[row.values[1]]){
                       Product[row.values[1]].IamgeSrc.push(row.values[25])
                       if(row.values[6]){
                           Product[row.values[1]].Option.push(row.values[6])
                       }

                   }else {
                       Product[row.values[1]]=values
                   }
                }
            });

        });
    
       for (let key in Product) {
           this.addProduct(Product[key]);
       }
   }

    async addProduct(Product:Product): Promise<void> {
        const body = {
            product: {
                title: Product.Title,
                body_html:Product.Body,
            }
        };
       const productResponse=await this.clientService.sent(body,"product")
    
       this.productId= productResponse.body.product.id;
        Promise.all([
            this.addImages(Product.IamgeSrc),
            this.addOptions(Product.Option)
        ])
    }

    async addImages(IamgeSrc:Array<string>):Promise<void> {
        IamgeSrc.map( (data)=> {
            const body = {
                image: {
                    product_id:this.productId,
                    src:data,
                }
            };
            this.clientService.sent(body,"image")
        })
    }
    async addOptions(Option:Array<string>):Promise<void> {
        Option.map((data) =>{
            const body = {
                variant: {
                    product_id:this.productId,
                    option1:data,
                }
            };
            this.clientService.sent(body,"variant")

        })
    }
}
