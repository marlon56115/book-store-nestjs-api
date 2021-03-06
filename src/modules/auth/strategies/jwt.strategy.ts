import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '../../../config/config.service';
import { Configurations } from '../../../config/config.keys';
import { AuthRepository } from '../auth.repository';
import { InjectRepository } from "@nestjs/typeorm";
import { IJwtPayload } from '../jwt-payload.interface';
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

   /**
    * 
    * @param @Inject _configService:ConfigService
    * @param _authRepository:AuthRepository
    */
   constructor(
      private readonly _configService: ConfigService,
      @InjectRepository(AuthRepository)
      private readonly _authRepository: AuthRepository) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: _configService.get(Configurations.JWT_SECRET)
      });
   }

   /**
    * metodo para validar que existe un usuario, devuelve
    * IJwtPaiload
    * @param payload:IJwtPayload
    * @returns 
    */
   async validate(payload: IJwtPayload) {
      const { username } = payload;
      const user = await this._authRepository.findOne({
         where: { username, status: 'ACTIVE' }
      });

      if (!user) {
         throw new UnauthorizedException();
      }
      return payload;
   }
}