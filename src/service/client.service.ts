import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { Shopify,DataType} from '@shopify/shopify-api/dist';

interface Product {
    Title:string,
    IamgeSrc:Array<string>
    Body:string
    VariantPrice:Array<string>
    Option:Array<string>
}

@Injectable()
export class ClientService {
    constructor(private readonly configService: ConfigService) {
    }
     sent(body:any,path:string):any{
        try {
            const client = new Shopify.Clients.Rest(
                this.configService.get("DOMAN"),
                this.configService.get("ACCESS_TOKEN")
            );
            const Response =  client.post({
                path: path,
                data: body,
                type: DataType.JSON,
            });
            return Response;

        }catch (e) {
         console.log(e)
        }
    }

}
