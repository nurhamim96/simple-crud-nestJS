import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import MahasiswaEntity from './models/mahasiswa.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password:'',
      database:'db_mahasiswa',
      entities:[MahasiswaEntity],
      synchronize: true,
      logging: true
    }),
    MahasiswaModule
  ],
})
export class AppModule {}
