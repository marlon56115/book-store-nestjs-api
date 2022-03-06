import { createParamDecorator } from "@nestjs/common";
import { UserDto } from '../user/dtos/user.dto';

export const GetUser = createParamDecorator(
   (data, request): UserDto => {
      return request.User;
});