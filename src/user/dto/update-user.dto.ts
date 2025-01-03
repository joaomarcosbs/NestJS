import { UserUpdatableInterface } from '../interfaces'

export class UpdateUserDto implements UserUpdatableInterface {
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    email?: string;
    active?: boolean;
}
