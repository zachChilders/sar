import { Injectable } from '@nestjs/common';
import {
  ManagementClient,
  AuthenticationClient,
  GetUsers200ResponseOneOfInner,
} from 'auth0';
import { faker } from '@faker-js/faker';
import { unreachable } from 'src/platform/guards.util';
import { config } from 'src/platform/config';

type Auth0User = GetUsers200ResponseOneOfInner;

/**
 * This is the core service for interacting with Auth0. It should only be used when bypassing the cache is explicitly desired.
 * @see DirectoryService for a higher level service that is used by the rest of the application.
 */
@Injectable()
export class Auth0Service {
  private readonly authenticationClient = new AuthenticationClient({
    domain: `${config.AUTH0_DOMAIN}.auth0.com`,
    clientId: config.AUTH0_CLIENT_ID,
  });

  private readonly managementClient = new ManagementClient({
    domain: `${config.AUTH0_DOMAIN}.auth0.com`,
    clientId: config.AUTH0_CLIENT_ID,
    clientSecret: config.AUTH0_CLIENT_SECRET,
    audience: `https://${config.AUTH0_DOMAIN}.auth0.com/api/v2/`,
  });

  async createUser(email: string): Promise<Auth0User> {
    const response = await this.managementClient.users.create({
      connection: 'Username-Password-Authentication',
      email,
      password: `Temp!!${faker.internet.password()}`,
      email_verified: true,
    });

    return response.data;
  }

  async updateUser(id: string, email: string): Promise<Auth0User> {
    const response = await this.managementClient.users.update(
      { id },
      { email },
    );

    return response.data;
  }

  async resetPassword(id: string): Promise<void> {
    const response = await this.managementClient.users.get({ id });

    if (!response.data.email)
      return unreachable(`User ${id} does not have an email address`);

    await this.authenticationClient.database.changePassword({
      // The parameters here depend on the actual method signature in the v4 SDK
      email: response.data.email,
      connection: 'Username-Password-Authentication',
    });
  }
}
