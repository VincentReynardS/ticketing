import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

// Ditaruh di luar beforeAll() karena kita membutuhkan env variable ini
// dalam stripe.ts, bukan di test suite yang baru mengambil env variable
// ketika tes dijalankan.
process.env.STRIPE_KEY =
  'sk_test_51Jwg2rJHUvMr4TjWmyJ2nTiwfjyJ0ATZuplYcRfLVFScvPD3LtSL8mhVmfdOCyZT44t0VOMBUgOgNEe7SMpIR8Wr009Av1REbA';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'abcdefgh';

  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // Build a JWT payload {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. {jwt: MY_JWT}
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Return a string that is the cookie with the encoded data
  return [`express:sess=${base64}`];
};
