import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SimpleUser } from '../../users/dto/simple-user.dto';
import { TokenContent } from '../dto/token-content.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_SECRET,
    });
  }

  validate({ id, firstName, lastName, username, avatar }: TokenContent): SimpleUser {
    return { id, firstName, lastName, username, avatar };
  }
}
