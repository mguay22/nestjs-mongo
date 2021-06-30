import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
