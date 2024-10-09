import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);



  // Express Confg
  app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );
  app.use(bodyParser.json());
  app.use(helmet());

  // swagger config

  const config = new DocumentBuilder()
  .setTitle('Locals360-dev')
  .setDescription('The locals360 API description')
  .setVersion('1.0')
  .addBearerAuth(
    { 
      
      description: ` Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http', 
      in: 'Header'
    },
    'access-token', 
  )
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);


  // Firebase Confg
//   const serviceAccount = require('./path/to/serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });



  await app.listen(process.env.PORT || 3200);
}
bootstrap();
