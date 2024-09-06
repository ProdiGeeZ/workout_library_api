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

describe('GET /api/exercises', () => {
    test('200: Should return an array of objects with the correct key:pair values for exercises', () => {
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

describe('GET /api/exercises/:exercise_id', () => {
    test('200: Should return an object with the correct key:pair values for an exercise', () => {
        return request(app)
            .get('/api/exercises/1')
            .expect(200)
            .then(({ body }) => {
                const exercise = body.exercise;
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
    test('400: Should return an error message when the request is invalid', () => {
        return request(app)
            .get('/api/exercises/invalid')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad Request: Invalid request format.');
            });
    });
    test('404: Should return an error message when exercise does not exist', () => {
        return request(app)
            .get('/api/exercises/9999')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not Found: Exercise does not exist.');
            });
    });
});

describe('GET /api/equipment', () => {
    test('200: Should fetch all equipment with the correct key:pair values', () => {
        return request(app)
            .get('/api/equipment')
            .expect(200)
            .then(({ body }) => {
                expect(body.equipment).toHaveLength(9);
                body.equipment.forEach(equipment => {
                    expect(equipment).toHaveProperty('equipment_id');
                    expect(equipment).toHaveProperty('name');
                });
            });
    });
});

describe('GET /api/muscle-groups', () => {
    test('200: Should fetch all muscle groups with the correct key:pair values', () => {
        return request(app)
            .get('/api/muscle-groups')
            .expect(200)
            .then(({ body }) => {
                expect(body.groups).toHaveLength(10);
                body.groups.forEach(group => {
                    expect(group).toHaveProperty('group_id');
                    expect(group).toHaveProperty('name');
                });
            });
    });
});

describe('GET /api/exercises/equipment/:equipment_id', () => {
    test('200: Should fetch all exercises by equipment id with the correct key:pair values', () => {
        return request(app)
            .get('/api/exercises/equipment/1')
            .expect(200)
            .then(({ body }) => {
                expect(body.exercises).toHaveLength(1);
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
    test('400: Should return an error message when the request is invalid', () => {
        return request(app)
            .get('/api/exercises/equipment/invalid')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad Request: Invalid request format.');
            });
    });
    test('404: Should return an error message when equipment does not exist', () => {
        return request(app)
            .get('/api/exercises/equipment/9999')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not Found: Equipment does not exist.');
            });
    });
});

describe('GET /api/exercises/muscle-group/:group_id', () => {
    test('200: Should fetch all exercises by muscle group id with the correct key:pair values', () => {
        return request(app)
            .get('/api/exercises/muscle-group/1')
            .expect(200)
            .then(({ body }) => {
                expect(body.exercises).toHaveLength(1);
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
    test('400: Should return an error message when the request is invalid', () => {
        return request(app)
            .get('/api/exercises/muscle-group/invalid')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad Request: Invalid request format.');
            });
    });
    test('404: Should return an error message when muscle group does not exist', () => {
        return request(app)
            .get('/api/exercises/muscle-group/9999')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not Found: Muscle group does not exist.');
            }
            );
    });
});
