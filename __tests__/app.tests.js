const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seed/seed.js");
const data = require("../db/data/index.js");

beforeEach(() => {
    return seed(data);
});

afterAll(() => {
    db.end();
});

describe('200: GET /api/exercises', () => {
    test('Should return an array of objects with the correct key:pair values for exercises', () => {
        return request(app)
            .get('/api/exercises')
            .expect(200)
            .then(({ body }) => {
                expect(body.exercises).toHaveLength(5);
                body.exercises.forEach(exercise => {
                    expect(exercise).toHaveProperty('exercise_id');
                    expect(exercise).toHaveProperty('name');
                    expect(exercise).toHaveProperty('description');
                    expect(exercise).toHaveProperty('equipment_id');
                    expect(exercise).toHaveProperty('group_id');
                    expect(exercise).toHaveProperty('exercise_category');
                    expect(exercise).toHaveProperty('image_url');
                    expect(exercise).toHaveProperty('video_url');
                });
            });
    });
});