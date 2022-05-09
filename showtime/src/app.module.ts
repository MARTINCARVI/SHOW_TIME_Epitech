import { Module, DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConcertsModule } from './concerts/concerts.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { GroupsModule } from './groups/groups.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './config/ormconfig';

export function DatabaseOrmModule(): DynamicModule {
  return TypeOrmModule.forRoot(ormconfig);
}

@Module({
  imports: [
    DatabaseOrmModule(),
    UsersModule,
    CategoriesModule,
    GroupsModule,
    AuthModule,
    ConcertsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
