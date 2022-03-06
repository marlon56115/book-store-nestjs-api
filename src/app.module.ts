import { Module } from '@nestjs/common';
import { Configurations } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, RoleModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
   //static porque no es necesario instanciar la clase para acceder a ella
   static port: number | string;
   //configuramos el constructor para inyectar una instancia de ConfigService que contendra mis configuraciones
   constructor(private readonly _configService:ConfigService) {
      AppModule.port = this._configService.get(Configurations.PORT);
   }
}
