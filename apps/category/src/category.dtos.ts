import { IsNotEmpty } from 'class-validator';

/* tslint:disable:max-classes-per-file */

export class CreateCategoryDTO {
  @IsNotEmpty()
  name: string;
}

/* tslint:enable:max-classes-per-file */
