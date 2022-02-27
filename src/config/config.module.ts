import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';


//cada vez que importemos este modulo, vamos a tener una instancia de nuestro servicio
@Module({
   providers: [
      //cuando me soliciten un configService, devolvere una instancia de configservide
      {
         provide: ConfigService,
         useValue:new ConfigService()
      }
   ],
   exports:[ConfigService]
})
export class ConfigModule {}
