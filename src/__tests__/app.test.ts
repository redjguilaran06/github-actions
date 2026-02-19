import request from 'supertest';
import app from '../app';
import { pool } from '../db';

jest.mock('../db', () => ({
  pool: {
    query: jest.fn(),
    end: jest.fn(),
  },
}));

afterAll(async () => {
  // Close the database pool after tests to prevent hanging processes
  await pool.end();
});

describe('GET /users', () => {
  it('should return a 200 status and an array', async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});