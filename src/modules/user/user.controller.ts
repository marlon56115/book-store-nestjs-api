import { Controller, Param, Get, Post, Body, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { ReadUserDto } from './dtos/read-user.dto';

@Controller('users')
export class UserController {
   constructor(private readonly _userService: UserService) { }


   @Get(':userId')
   //solo se van a permitir esos roles
   //@Roles(RoleType.ADMINISTRATOR)
   //@UseGuards(AuthGuard(),RoleGuard)
   getUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadUserDto> {
      return this._userService.get(userId);

   }

   @UseGuards(AuthGuard())
   @Get()
   getUsers(): Promise<ReadUserDto[]> {
      return this._userService.getAll();

   }

   @Patch(':userId')
   updateUser(@Param('userId', ParseIntPipe) userId: number, @Body() user: User): Promise<User> {
      return this.updateUser(userId, user);

   }

   @Delete(':userId')
   deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<void> {
      return this._userService.delete(userId);

   }

   @Post('set-role/:userId/:roleId')
   setRoleToUser(@Param('userId', ParseIntPipe) userId: number, @Param('roleId', ParseIntPipe) roleId: number): Promise<boolean>  {
      return this._userService.setRoleToUser(userId, roleId);
   }
}
