import { Global, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
// const bcrypt = require('bcrypt');
import * as bcrypt from 'bcrypt';

@Global()
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto) {
    // 1. Find user by email
    const loggedUser = await this.usersService.findUserByEmail(loginData.email);
    // 1-1 If user doesn't exist send Exception
    if (!loggedUser) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User not in the database !',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    // 2. Compare password
    const areEqual = await bcrypt.compare(
      loginData.password,
      loggedUser.password,
    );
    // 2-1 If passwords don't match send Exception
    if (!areEqual) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "Password don't match!",
        },
        HttpStatus.FORBIDDEN,
      );
    }
    // 3. Send back the user (without pw)
    delete loggedUser.password;
    const payload = { username: loggedUser.username, sub: loggedUser.id };

    return {
      user: loggedUser,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registrationData: RegisterDto) {
    // 1. Generate password Hash;
    // 2. Save the new user in the DB
    const createdUser = await this.usersService.create(registrationData);
    // 3. Return the saved user (without pw)
    delete createdUser.password;
    return createdUser;
  }
}
