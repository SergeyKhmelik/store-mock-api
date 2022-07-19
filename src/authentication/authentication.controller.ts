import { BadRequestException, Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from '../users/users.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Public } from './decorators/public.decorator';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
import { TokenPair } from './dto/token-pair.dto';
import { SimpleUser } from '../users/dto/simple-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<TokenPair> {
    const user = await this.usersService.findByUsername(signInDto.username, true);

    if (!user) {
      throw new BadRequestException('User with such username is not found.');
    }

    return this.authenticationService.signIn(signInDto, user.toJSON());
  }

  @Public()
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<TokenPair> {
    const newUser = await this.usersService.create(signUpDto);
    return this.authenticationService.signIn(signUpDto, newUser);
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenPair> {
    return this.authenticationService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Get('profile')
  async getProfile(@Request() req) {
    return this.usersService.findOne(req.user.id) as unknown as Promise<SimpleUser>;
  }
}
