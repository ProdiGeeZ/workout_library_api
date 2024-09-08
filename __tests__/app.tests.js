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

describe('POST /api/exercises', () => {
    test('201: Should create a new exercise and return a success message', () => {
        return request(app)
            .post('/api/exercises')
            .send({
                name: 'New Exercise',
                description: 'New Description',
                equipment_id: 1,
                group_id: 1,
                exercise_category: 'Isolation',
                image_url: 'https://www.image.com',
                video_url: 'https://www.youtube.com/watch?v=12345'
            })
            .expect(201)
            .then(({ body }) => {
                expect(body.msg).toBe('Exercise added.');
            });
    });
    test('400: Should return an error message when the request is invalid', () => {
        return request(app)
            .post('/api/exercises')
            .send({
                description: 'New Description',
                equipment_id: 1,
                group_id: 1
            })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad Request: Request body is missing values.');
            });
    });
    test('404: Should return an error message when equipment does not exist', () => {
        return request(app)
            .post('/api/exercises')
            .send({
                name: 'New Exercise',
                description: 'New Description',
                equipment_id: 9999,
                group_id: 1,
                exercise_category: 'Isolation',
                image_url: 'https://www.google.com',
                video_url: 'https://www.youtube.com/watch?v=12345'
            })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not Found: One or more values do not exist.');
            });
    });
    test('404: Should return an error message when muscle group does not exist', () => {
        const exerciseData = {
            name: 'New Exercise',
            description: 'New Description',
            equipment_id: 1,
            group_id: 9999,
            exercise_category: 'Isolation',
            image_url: 'https://www.image.com',
            video_url: 'https://www.youtube.com/watch?v=12345'
        };
        return request(app)
            .post('/api/exercises')
            .send(exerciseData)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe(`Not Found: One or more values do not exist.`);
            });
    });
    test('201: Should return the new exercise', () => {
        return request(app)
            .post('/api/exercises')
            .send({
                name: 'New Exercise',
                description: 'New Description',
                equipment_id: 1,
                group_id: 1,
                exercise_category: 'Isolation',
                image_url: 'https://www.image.com',
                video_url: 'https://www.youtube.com/watch?v=12345'
            })
            .expect(201)
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
});


describe('DELETE /api/exercises/:exercise_id', () => {
    test('204: Should delete an exercise and return no content', () => {
        return request(app)
            .delete('/api/exercises/1')
            .expect(204)
            .then(({ body }) => {
                console.log(body);
                
                expect(body).toEqual({});
            });
    });
    test('404: Should return an error message when exercise does not exist', () => {
        return request(app)
            .delete('/api/exercises/9999')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not Found: Exercise does not exist.');
            });
    });
    test('400: Should return an error message when the request is invalid', () => {
        return request(app)
            .delete('/api/exercises/invalid')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad Request: Invalid request format.');
            });
    });
});

describe.only('PUT /api/exercises/:exercise_id', () => {
    test('200: Should update an exercise and return the updated exercise', () => {
        const originalExercise = {
            name: "Barbell Bench Press",
            description: "A compound exercise targeting the chest, shoulders, and triceps.",
            equipment_id: 3,
            group_id: 1,
            exercise_category: "Compound",
            image_url: "https://example.com/images/barbell_bench_press.jpg",
            video_url: "https://example.com/videos/barbell_bench_press.mp4"
        };
    
        const updatedExerciseData = {
            name: 'Updated Exercise',
            description: 'Updated Description',
            equipment_id: 1,
            group_id: 1,
            exercise_category: 'Isolation',
            image_url: 'https://www.image.com',
            video_url: 'https://www.youtube.com/watch?v=12345'
        };
    
        return request(app)
            .put('/api/exercises/1')
            .send(updatedExerciseData)
            .expect(200)
            .then(({ body }) => {
                const updatedExercise = body.exercise;
                expect(updatedExercise.name).toEqual(updatedExerciseData.name);
                expect(updatedExercise.description).toEqual(updatedExerciseData.description);
                expect(updatedExercise.equipment_id).toEqual(updatedExerciseData.equipment_id);
                expect(updatedExercise.group_id).toEqual(updatedExerciseData.group_id);
                expect(updatedExercise.exercise_category).toEqual(updatedExerciseData.exercise_category);
                expect(updatedExercise.image_url).toEqual(updatedExerciseData.image_url);
                expect(updatedExercise.video_url).toEqual(updatedExerciseData.video_url);
                expect(updatedExercise.exercise_id).toEqual(1);
            });
    });
    test('404: Should return an error message when exercise does not exist', () => {
        return request(app)
            .put('/api/exercises/9999')
            .send({
                name: 'Updated Exercise',
                description: 'Updated Description',
                equipment_id: 1,
                group_id: 1,
                exercise_category: 'Isolation',
                image_url: 'https://www.image.com',
                video_url: 'https://www.youtube.com/watch?v=12345'
            })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not Found: Exercise does not exist.');
            });
    });
    test('400: Should return an error message when the request is empty', () => {
        return request(app)
            .put('/api/exercises/1')
            .send({})
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('No fields to update');
            });
    });
    test('200: Update only one field in the exercise whilst keeping the rest the same', () => {
        const updatedExerciseData = {
            name: 'Updated Exercise',
        };
        return request(app)
            .put('/api/exercises/1')
            .send(updatedExerciseData)
            .expect(200)
            .then(({ body }) => {
                const updatedExercise = body.exercise;
                expect(updatedExercise.name).toEqual(updatedExerciseData.name);
                expect(updatedExercise.description).toEqual('A compound exercise targeting the chest, shoulders, and triceps.');
                expect(updatedExercise.equipment_id).toEqual(3);
                expect(updatedExercise.group_id).toEqual(1);
                expect(updatedExercise.exercise_category).toEqual('Compound');
                expect(updatedExercise.image_url).toEqual('https://example.com/images/barbell_bench_press.jpg');
                expect(updatedExercise.video_url).toEqual('https://example.com/videos/barbell_bench_press.mp4');
                expect(updatedExercise.exercise_id).toEqual(1);
            });
    });
});