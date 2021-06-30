import { Test } from "@nestjs/testing"
import { Connection } from "mongoose"
import * as request from 'supertest';

import { AppModule } from "../../../app.module"
import { DatabaseService } from "../../../database/database.service";
import { CreateUserRequest } from "../../dto/request/create-user-request.dto";
import { userStub } from "../stubs/user.stub";

describe('UsersController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle();
    httpServer = app.getHttpServer();
  })

  afterAll(async () => {
    await app.close();
  })

  beforeEach(async () => {
    await dbConnection.collection('users').deleteMany({});
  })

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      await dbConnection.collection('users').insertOne(userStub())
      const response = await request(httpServer).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([userStub()]);
    })
  })

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserRequest: CreateUserRequest = {
        email: userStub().email,
        age: userStub().age
      }
      const response = await request(httpServer).post('/users').send(createUserRequest)

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createUserRequest);

      const user = await dbConnection.collection('users').findOne({ email: createUserRequest.email });
      expect(user).toMatchObject(createUserRequest);
    })
  })
})