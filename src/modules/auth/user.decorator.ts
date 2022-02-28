import { createParamDecorator } from "@nestjs/common";
import { UserDto } from '../user/dto/user.dto';
import { User } from '../user/user.entity';

export const GetUser = createParamDecorator(
   (data, request): UserDto => {
      return request.User;
});