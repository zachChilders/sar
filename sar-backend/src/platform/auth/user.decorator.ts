import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User, UserSchema } from './user';

export interface IUserRequest extends Request {
  user: string;
}

export const UserContext = createParamDecorator(
  (_data: never, context: ExecutionContext): User =>
    // unsafe parse because guard should have been up
    UserSchema.parse(context.switchToHttp().getRequest<IUserRequest>().user),
);
