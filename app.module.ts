import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { JurusanModule } from './jurusan/jurusan.module';
import { MatkulModule } from './matkul/matkul.module';
import MahasiswaEntity from './models/mahasiswa.entity';
import JurusanEntity from './models/jurusan.entity';
import MatkulEntity from './models/matkul.entity';

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
      entities:[MahasiswaEntity, JurusanEntity, MatkulEntity],
      synchronize: true,
      logging: true
    }),
    MahasiswaModule,
    JurusanModule,
    MatkulModule
  ],
})
export class AppModule {}
