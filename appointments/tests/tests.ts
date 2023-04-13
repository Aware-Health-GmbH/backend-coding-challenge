import { Appointment } from '../types';
import request from 'supertest';
import app from '../app';

const testAppointment: Appointment = {
  id: '2f47eb96-7193-4d3d-8c57-af7771c71db7',
  status: 'CONFIRMED',
  facility: {
    id: '4e4e4c12-0f4a-4da3-a3f1-c8f3e2ee9c3d',
    address: '123 Main St',
    city: 'Anytown',
    name: 'Anytown Medical Center',
    lat: 0,
    lng: 0,
  },
  timeSlot: {
    id: '432d0b5c-0675-43f9-a49b-59e4dc8cb1db',
    scheduledAt: '2023-04-14T10:00:00Z',
    duration: 60,
  },
  userId: '2f47eb96-7193-4d3d-8c57-af7771c71db7',
};

describe('appointments microservice', () => {
  it('should create a new appointment', async () => {
    const response = await request(app)
      .post('/users/2f47eb96-7193-4d3d-8c57-af7771c71db7/appointments')
      .send(testAppointment)
      .expect(201);

    expect(response
      .toMatchObject(testAppointment);
  });

  it('should retrieve a list of all appointments for a user', async () => {
    const response = await request(app)
      .get(`/users/${testAppointment.userId}/appointments`)
      .expect(200);

    expect(response.body).toContainEqual(testAppointment);
  });

  it('should retrieve a specific appointment by ID', async () => {
    const response = await request(app)
      .get(`/users/${testAppointment.userId}/appointments/${testAppointment.id}`)
      .expect(200);

    expect(response.body).toMatchObject(testAppointment);
  });

  it('should update an existing appointment', async () => {
    const updatedAppointment: Appointment = {
      ...testAppointment,
      status: 'CANCELLED',
    };

    const response = await request(app)
      .put(`/users/${testAppointment.userId}/appointments/${testAppointment.id}`)
      .send(updatedAppointment)
      .expect(200);

    expect(response.body).toMatchObject(updatedAppointment);
  });

  it('should delete an existing appointment', async () => {
    await request(app)
      .delete(`/users/${testAppointment.userId}/appointments/${testAppointment.id}`)
      .expect(204);
  });
});
