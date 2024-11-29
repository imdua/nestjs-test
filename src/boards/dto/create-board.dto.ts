import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  // validation 데코레이터
  // https://github.com/typestack/class-validator 참고
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
