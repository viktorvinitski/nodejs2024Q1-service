import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { config } from 'dotenv';
import { load } from 'js-yaml';
import { UsersModule } from './api/users/users.module';
import { ArtistModule } from './api/artist/artist.module';
import { TrackModule } from './api/track/track.module';
import { AlbumModule } from './api/album/album.module';
import { FavoritesModule } from './api/favorites/favorites.module';
config();

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiPath = join(__dirname, '../..', 'doc/api.yaml');
  const apiYaml = await readFile(apiPath, 'utf-8');

  const config: OpenAPIObject = load(apiYaml) as OpenAPIObject;
  const document = SwaggerModule.createDocument(app, config, {
    include: [
      UsersModule,
      TrackModule,
      ArtistModule,
      AlbumModule,
      FavoritesModule,
    ],
  });

  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  console.log(`Server starts at http://localhost:${port}`);
  console.log(`Docs at http://localhost:${port}/docs`);
}
bootstrap();
