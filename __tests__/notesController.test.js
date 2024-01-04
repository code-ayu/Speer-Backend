import request from 'supertest';
import app from '../index.js'; // Assuming your Express app is exported from 'app.js' or a similar file
import notesDetails from '../models/notesDetails.js';

describe('Tests for Notes Endpoints', () => {
  // Sample data for testing
  const sampleNote = {
    subject: 'Test Subject',
    semester: 1,
    notes: 'Test Notes Content',
    writtenBy: 'Test Author',
  };

  beforeEach(async () => {
    // Clear the database or perform any setup logic before each test
    await notesDetails.deleteMany({});
  });

  afterAll(async () => {
    // Close database connections or perform any cleanup after all tests
    await mongoose.connection.close();
  });

  // Test for GET /api/getNotes
  it('should get all notes successfully', async () => {
    await notesDetails.create(sampleNote);

    const response = await request(app).get('/api/getNotes');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  // Test for GET /api/getNotesById/:id
  it('should get a note by ID successfully', async () => {
    const createdNote = await notesDetails.create(sampleNote);

    const response = await request(app).get(`/api/getNotesById/${createdNote._id}`);

    expect(response.status).toBe(200);
    expect(response.body.subject).toBe(sampleNote.subject);
  });

  // Test for POST /api/createNotes
  it('should create a new note successfully', async () => {
    const response = await request(app).post('/api/createNotes').send(sampleNote);

    expect(response.status).toBe(201);
    expect(response.body.subject).toBe(sampleNote.subject);
  });

  // Test for PUT /api/updateNotes/:id
  it('should update a note by ID successfully', async () => {
    const createdNote = await notesDetails.create(sampleNote);
    const updatedContent = 'Updated Notes Content';

    const response = await request(app).put(`/api/updateNotes/${createdNote._id}`).send({
      ...sampleNote,
      notes: updatedContent,
    });

    expect(response.status).toBe(200);
    expect(response.body.notes).toBe(updatedContent);
  });

  // Test for DELETE /api/deleteNotes/:id
  it('should delete a note by ID successfully', async () => {
    const createdNote = await notesDetails.create(sampleNote);

    const response = await request(app).delete(`/api/deleteNotes/${createdNote._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Note deleted successfully');
  });
});
