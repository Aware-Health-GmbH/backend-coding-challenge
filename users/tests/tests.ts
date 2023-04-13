import { User } from '../types';
import request from 'supertest';
import app from '../app';

const testUser: User = {
  id: '2f47eb96-7193-4d3d-8c57-af7771c71db7',
  name: 'Alice',
  email: 'alice@example.com',
  appointments: [],
  results: [],
};

describe('users microservice', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send(testUser)
      .expect(201);

    expect(response.body).toMatchObject(testUser);
  });

  it('should retrieve an existing user by ID', async () => {
    const response = await request(app)
      .get(`/users/${testUser.id}`)
      .expect(200);

    expect(response.body).toMatchObject(testUser);
  });

  it('should retrieve a list of all users', async () => {
    const response = await request(app)
      .get('/users')
      .expect(200);

    expect(response.body).toContainEqual(testUser);
  });

  it('should update an existing user', async () => {
    const updatedUser: User = {
      ...testUser,
      name: 'Alice Smith',
    };

    const response = await request(app)
      .put(`/users/${testUser.id}`)
      .send(updatedUser)
      .expect(200);

    expect(response.body).toMatchObject(updatedUser);
  });

  it('should delete an existing user', async () => {
    await request(app).delete(`/users/${testUser.id}`).expect(204);
  });
});
