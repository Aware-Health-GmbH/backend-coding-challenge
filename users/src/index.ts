import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  name: string;
  email: string;
  appointments: Appointment[];
  results: Result[];
}

interface Appointment {
  id: string;
  status: 'CONFIRMED' | 'CANCELLED' | 'RESCHEDULED';
  facility: {
    id: string;
    address: string;
    city: string;
    name: string;
    lat: number;
    lng: number;
  };
  timeSlot: {
    id: string;
    scheduledAt: string;
    duration: number;
  };
  checkedInAt?: string;
  beganAt?: string;
  endedAt?: string;
}

interface Result {
  id: string;
  date: string;
  notes?: string;
  inRange: number;
  outOfRange: number;
  seenAt?: string;
}

const users: User[] = [];

const app: FastifyInstance = fastify({
  logger: true,
});

app.get('/users', async () => {
  return users;
});

app.get<{ Params: { id: string } }>('/users/:id', async (req) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
});

app.post<{ Params: { id: string }, Body: Appointment }>('/users/:id/appointments', async (req) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    throw new Error('User not found');
  }
  const appointment: Appointment = { id: uuidv4(), ...req.body };
  user.appointments.push(appointment);
  return appointment;
});

app.get<{ Params: { id: string } }>('/users/:id/appointments', async (req) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    throw new Error('User not found');
  }
  return user.appointments;
});

app.get<{ Params: { id: string } }>('/users/:id/results', async (req) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    throw new Error('User not found');
  }
  return user.results;
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on port 3000`);
});
