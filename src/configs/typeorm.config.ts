import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

// Repository: 엔티티 개체와 함께 작동하며 엔티티 찾기, 삽입, 업데이트, 삭제 등을 처리 함. DB 관련된 일을 함.
// Request -> Controller -> Service -> Repository
