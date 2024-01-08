import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'integrations/prisma/prisma.service';
import { config } from 'platform/config';
import { ZodError } from 'zod';
import { $Enums } from '@prisma/client';
import { ClaimsSchema } from './claims.schema';
import { Auth0Strategy } from './auth0.strategy';

describe('Auth0Strategy', () => {
  let strategy: Auth0Strategy;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Auth0Strategy, PrismaService],
    }).compile();

    strategy = module.get<Auth0Strategy>(Auth0Strategy);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('validate', () => {
    it('should return the user object if validation is successful', async () => {
      // Arrange
      const request: Request = {} as Request;
      const payload = {
        sub: 'user-sub',
      };

      const user = {
        id: 'user-id',
        auth0Id: 'auth0-id',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        Organization: {
          id: 'feabbbf9-9b5f-4ff6-82b9-bfb2ee1154c7',
          name: 'Not Datum',
        },
        acceptedTermsDate: new Date(),
        roles: [$Enums.Role.BuyerContributor],
        hasAlphaAccess: true,
        hasBetaAccess: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce({
        ...user,
        organizationId: user.Organization.id,
      });

      // Act
      const result = await strategy.validate(request, payload);

      // Assert
      expect(result).toEqual({
        id: user.id,
        organizationId: user.Organization.id,
        isDatumMs: user.Organization.id === config.DATUM_ORG_ID,
      });
    });

    it('should throw BadRequestException if JWT claims parsing fails', async () => {
      // Arrange
      const request: Request = {} as Request;
      const payload = {};

      jest.spyOn(ClaimsSchema, 'safeParse').mockReturnValueOnce({
        success: false,
        error: 'Invalid Claims' as unknown as ZodError,
      });

      // Act & Assert
      await expect(strategy.validate(request, payload)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if user does not exist in the database', async () => {
      // Arrange
      const request: Request = {} as Request;
      const payload = {
        sub: 'user-sub',
      };

      jest.spyOn(ClaimsSchema, 'safeParse').mockReturnValueOnce({
        success: true,
        data: payload,
      });

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      // Act & Assert
      await expect(strategy.validate(request, payload)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw UnauthorizedException if user is deactivated', async () => {
      // Arrange
      const request: Request = {} as Request;
      const payload = {
        sub: 'user-sub',
      };

      const user = {
        id: 'user-id',
        auth0Id: 'auth0-id',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        organizationId: 'feabbbf9-9b5f-4ff6-82b9-bfb2ee1154c7',
        acceptedTermsDate: new Date(),
        roles: [$Enums.Role.BuyerContributor],
        hasAlphaAccess: true,
        hasBetaAccess: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };

      jest.spyOn(ClaimsSchema, 'safeParse').mockReturnValueOnce({
        success: true,
        data: payload,
      });

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(user);

      // Act & Assert
      await expect(strategy.validate(request, payload)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
