const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../src/app");
const supertest = require("supertest");
const request = supertest(app);
const Task = require("../src/models/task");

let mongoServer;

beforeAll(async () => {
    await mongoose.disconnect();
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});


describe('Task routes', () => {
    beforeEach(async () => {
        await Task.deleteMany({});
    })

    // Prueba para obtener la lista de tareas
    it('should return all tasks', async () => {
        await Task.create({
            title: 'Task 1',
            description: 'Description 1',
        })

        const res = await request.get('/api/tasks');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].title).toBe('Task 1');
        expect(res.body[0].description).toBe('Description 1');
    });

    // Prueba para crear una tarea
    it('should create a task', async () => {
        const newTask = {
            title: 'New task',
            description: 'New description',
        }

        const res = await request.post('/api/tasks').send(newTask);
        expect(res.status).toBe(201);
        expect(res.body.title).toBe(newTask.title);

        const tasks = await Task.find();
        expect(tasks.length).toBe(1);
        expect(tasks[0].title).toBe(newTask.title);
    });

    // Prueba para actualizar una tarea
    it('should update an existing task', async () => {
        const task = await Task.create({
            title: 'Task to update',
            description: 'Description to update',
            completed: false
        });

        const response = await request
            .put(`/api/tasks/${task._id}`)
            .send({ completed: true });

        expect(response.status).toBe(200);
        expect(response.body.completed).toBe(true);

        const updatedTask = await Task.findById(task._id);
        expect(updatedTask.completed).toBe(true);
    });

    // Prueba para eliminar una tarea
    it('should delete an existing task', async () => {
        const task = await Task.create({
            title: "Task to delete"
        })

        const response = await request.delete(`/api/tasks/${task._id}`);
        expect(response.status).toBe(200);

        const tasks = await Task.find();
        expect(tasks.length).toBe(0);
    });

});