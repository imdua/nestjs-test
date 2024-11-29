import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards') // 경로
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // Pipe
  // Data Transformation, Data Validation 하는 역할
  // 핸들러 레벨, 파라미터 레벨, 글로벌 레벨 파이프가 있다.
  // 글로벌 레벨 파이프는 클라이언트에서 들어오는 모든 요청에 적용되며, main.ts에서 설정한다.
  // class-validator, class-transformer 모듈을 사용해서 유효성 검사를 할 수 있다.

  @Get() // => @Get('/')과 같음
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  // ValidationPipe: NestJS에서 제공하는 파이프 6개 중 하나
  @UsePipes(ValidationPipe)
  // request body를 받아오는 방법
  // createBoard(@Body() body)
  // createBoard(@Body('title') title)
  // createBoard(@Body('description') description)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  // 모든 파라미터를 받아오는 방법
  // @Param() params: string[]
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }

  // Put은 모든 리소스를 업데이트 하는 것. 요청에서 보내지지 않은 값은 null로 업데이트 된다.
  // Patch는 일부 리소스를 업데이트 하는 것. 요청에서 보낸 값만 업데이트 하며, 나머지 값은 그대로 유지된다.
  // BoardStatusValidationPipe: status 파라미터 값을 validation 하는 pipe
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Board {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
