import { IsEmail, IsNotEmpty } from 'class-validator';

/* tslint:disable:max-classes-per-file */

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;
}

/* tslint:enable:max-classes-per-file */
