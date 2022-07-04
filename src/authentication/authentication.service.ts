import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '../users/user.entity';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { TokenContent } from './types';
import { ACCESS_TOKEN_LIFE_SECONDS, REFRESH_TOKEN_LIFE_SECONDS } from './constants';
import { ConfigService } from '@nestjs/config';
import { SimpleUser } from '../users/types';
import { TokenPair } from './dto/token-pair.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  private accessTokenOptions: JwtSignOptions = {
    expiresIn: ACCESS_TOKEN_LIFE_SECONDS,
    secret: this.configService.getOrThrow<string>('ACCESS_SECRET'),
  };

  private refreshTokenOptions: JwtSignOptions = {
    expiresIn: REFRESH_TOKEN_LIFE_SECONDS,
    secret: this.configService.getOrThrow<string>('REFRESH_SECRET'),
  };

  private generateTokenPair = (user: SimpleUser): TokenPair => {
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
    return this.generateTokenPair(tokenData as SimpleUser);
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
