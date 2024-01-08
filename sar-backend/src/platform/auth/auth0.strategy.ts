import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { Request } from 'express';
import { ClaimsSchema } from './claims.schema';
import { User } from './user';
import { PrismaService } from 'src/integrations/prisma/prisma.service';
import { config } from '../config';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${config.AUTH0_DOMAIN}.auth0.com/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: config.AUTH0_AUDIENCE,
      issuer: `https://${config.AUTH0_DOMAIN}.auth0.com/`,
      algorithms: ['RS256'],
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: unknown): Promise<User> {
    const result = ClaimsSchema.safeParse(payload);

    if (!result.success) {
      throw new BadRequestException("Couldn't parse JWT claims");
    }

    const user = await this.prisma.member.findUnique({
      where: {
        auth0Id: result.data.sub,
      },
    });

    if (!user) {
      throw new BadRequestException(
        "User doesn't exist in the database, complete onboarding",
      );
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Member is inactive');
    }

    return {
      id: user.id,
    };
  }
}
