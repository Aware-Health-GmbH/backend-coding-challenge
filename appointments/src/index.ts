import fastify from 'fastify';
import sqlite from 'sqlite';
import { Appointment } from './appointment';

const app = fastify();
const PORT = 3000;

// Connect to SQLite database
const dbPromise = sqlite.open({
  filename: 'appointments.db',
  driver: sqlite.Database,
});

// Define CRUD endpoints for appointments
app.get('/appointments', async (request, reply) => {
  const db = await dbPromise;
  const appointments = await db.all<Appointment[]>('SELECT * FROM appointments');
  reply.send(appointments);
});

app.get('/appointments/:id', async (request, reply) => {
  const db = await dbPromise;
  const { id } = request.params;
  const appointment = await db.get<Appointment>('SELECT * FROM appointments WHERE id = ?', id);
  if (!appointment) {
    reply.status(404).send({ message: 'Appointment not found' });
  } else {
    reply.send(appointment);
  }
});

app.post('/appointments', async (request, reply) => {
  const db = await dbPromise;
  const { facility, timeSlot, userId } = request.body;
  const result = await db.run(
    'INSERT INTO appointments (status, facility, timeSlot, userId) VALUES (?, ?, ?, ?)',
    'CONFIRMED',
    JSON.stringify(facility),
    JSON.stringify(timeSlot),
    userId
  );
  const appointment = await db.get<Appointment>('SELECT * FROM appointments WHERE id = ?', result.lastID);
  reply.send(appointment);
});

app.put('/appointments/:id', async (request, reply) => {
  const db = await dbPromise;
  const { id } = request.params;
  const { facility, timeSlot, status } = request.body;
  const appointment = await db.get<Appointment>('SELECT * FROM appointments WHERE id = ?', id);
  if (!appointment) {
    reply.status(404).send({ message: 'Appointment not found' });
  } else {
    await db.run(
      'UPDATE appointments SET status = ?, facility = ?, timeSlot = ? WHERE id = ?',
      status || appointment.status,
      JSON.stringify(facility || appointment.facility),
      JSON.stringify(timeSlot || appointment.timeSlot),
      id
    );
    const updatedAppointment = await db.get<Appointment>('SELECT * FROM appointments WHERE id = ?', id);
    reply.send(updatedAppointment);
  }
});

app.delete('/appointments/:id', async (request, reply) => {
  const db = await dbPromise;
  const { id } = request.params;
  const appointment = await db.get<Appointment>('SELECT * FROM appointments WHERE id = ?', id);
  if (!appointment) {
    reply.status(404).send({ message: 'Appointment not found' });
  } else {
    await db.run('DELETE FROM appointments WHERE id = ?', id);
    reply.status(204).send();
  }
});

// Start the server
app.listen(PORT, async () => {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      status TEXT,
      facility TEXT,
      timeSlot TEXT,
      userId TEXT
    )
  `);
  console.log(`Server listening on port ${PORT}`);
});
