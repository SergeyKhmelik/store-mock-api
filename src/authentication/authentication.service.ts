import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '../users/user.schema';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { TokenContent, TokenPair } from './types';
import { ACCESS_SECRET, ACCESS_TOKEN_LIFE_SECONDS, REFRESH_SECRET, REFRESH_TOKEN_LIFE_SECONDS } from '../constants';

@Injectable()
export class AuthenticationService {
  private accessTokenOptions: JwtSignOptions = {
    expiresIn: ACCESS_TOKEN_LIFE_SECONDS,
    secret: ACCESS_SECRET,
  };

  private refreshTokenOptions: JwtSignOptions = {
    expiresIn: REFRESH_TOKEN_LIFE_SECONDS,
    secret: REFRESH_SECRET,
  };

  constructor(private jwtService: JwtService) {}

  private generateTokenPair = (user: Omit<User, 'password'>): TokenPair => {
    return {
      accessToken: this.jwtService.sign(user, this.accessTokenOptions),
      refreshToken: this.jwtService.sign(user, this.refreshTokenOptions),
    };
  };

  async signIn(signInDto: SignInDto, user: User) {
    const isValid = await bcrypt.compare(signInDto.password, user.password);

    if (!isValid) {
      throw new BadRequestException('Password is wrong');
    }

    const { password, ...tokenData } = user;
    return this.generateTokenPair(tokenData as Omit<User, 'password'>);
  }

  refreshToken(refreshToken: string): TokenPair {
    try {
      const userData = this.jwtService.verify(refreshToken, this.refreshTokenOptions) as TokenContent;

      return this.generateTokenPair(userData);
    } catch (error) {
      throw new UnauthorizedException(error && error.message);
    }
  }
}
