import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';
import { CreateContactDto } from 'src/contact/dto';

describe('Contacts (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/contacts (POST) - should return 400 for invalid data', async () => {
    const { status } = await request(app.getHttpServer())
      .post('/contacts')
      .send({});

    expect(status).toBe(400);
  });

  it('/contacts (POST) - should create a contact and return 201', async () => {
    const createContactDto: CreateContactDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
    };

    const { status, body } = await request(app.getHttpServer())
      .post('/contacts')
      .send(createContactDto);

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
    expect(body.name).toBe(createContactDto.name);
    expect(body.email).toBe(createContactDto.email);
    expect(body.phone).toBe(createContactDto.phone);
  });
});
