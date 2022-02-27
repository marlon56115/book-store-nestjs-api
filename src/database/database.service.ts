import { TypeOrmModule } from "@nestjs/typeorm"
import { ConnectionOptions } from "typeorm";
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { Configurations } from '../config/config.keys';

export const databaseProviders = [
   //modulo para conectarse a postgress
   TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(config:ConfigService) {
         return {
            port: 5444,
            database: config.get(Configurations.DATABASE),
            type: 'postgres',
            host: config.get(Configurations.HOST),
            username: config.get(Configurations.USERNAME),
            password: config.get(Configurations.PASSWORD),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            migrations: [__dirname +'/migrations/*.entity{.ts,.js}']
         } as ConnectionOptions
      }
   })
   //... poedo agregar otro modulo para mysql o mongo
]
