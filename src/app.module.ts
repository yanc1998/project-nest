import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [
    AuthModule,
    TypegooseModule.forRoot('mongodb://localhost:27017/nest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }), FileModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
