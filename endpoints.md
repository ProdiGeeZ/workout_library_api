# Workout Library API Documentation

## Introduction

The Workout Library API provides an interface to interact with various workout-related data such as exercises, equipment, and muscle groups. You can create, read, update, and delete exercises, as well as filter exercises by equipment or muscle group. The API supports pagination, sorting, and various filtering capabilities to help you manage your workout data effectively.

### Base URL

The base URL for all API requests is:
```
http://to-be-decided/api
```

## Endpoints

### 1. **Get All Exercises**

#### `GET /api/exercises`

**Description:** Retrieve all exercises with optional pagination and sorting.

- **Query Parameters:**
  - `limit`: Number of exercises to return per page (default: 10)
  - `page`: Page number (default: 1)
  - `sort_by`: Field to sort by (`name`, `exercise_category`, `equipment_id`, `group_id`, default: `name`)
  - `order`: Sort order (`asc` for ascending, `desc` for descending, default: `asc`)

**Response:**
```json
{
  "exercises": [
    {
      "exercise_id": 1,
      "name": "Barbell Bench Press",
      "description": "A compound exercise targeting the chest.",
      "equipment_id": 3,
      "group_id": 1,
      "exercise_category": "Compound",
      "image_url": "https://example.com/images/barbell_bench_press.jpg",
      "video_url": "https://example.com/videos/barbell_bench_press.mp4"
    }
  ]
}
```

---

### 2. **Get Exercise by ID**

#### `GET /api/exercises/:exercise_id`

**Description:** Retrieve a specific exercise by its ID.

- **Path Parameter:**
  - `exercise_id`: The ID of the exercise to retrieve.

**Response:**
```json
{
  "exercise": {
    "exercise_id": 1,
    "name": "Barbell Bench Press",
    "description": "A compound exercise targeting the chest.",
    "equipment_id": 3,
    "group_id": 1,
    "exercise_category": "Compound",
    "image_url": "https://example.com/images/barbell_bench_press.jpg",
    "video_url": "https://example.com/videos/barbell_bench_press.mp4"
  }
}
```

---

### 3. **Get Exercises by Equipment ID**

#### `GET /api/exercises/equipment/:equipment_id`

**Description:** Retrieve exercises filtered by equipment type.

- **Path Parameter:**
  - `equipment_id`: The ID of the equipment to filter by.
  
- **Query Parameters (optional):**
  - `limit`: Number of exercises to return per page (default: 10)
  - `page`: Page number (default: 1)
  - `sort_by`: Field to sort by (`name`, `exercise_category`, default: `name`)
  - `order`: Sort order (`asc` or `desc`, default: `asc`)

**Response:**
```json
{
  "exercises": [
    {
      "exercise_id": 1,
      "name": "Barbell Bench Press",
      "description": "A compound exercise targeting the chest.",
      "equipment_id": 3,
      "group_id": 1,
      "exercise_category": "Compound",
      "image_url": "https://example.com/images/barbell_bench_press.jpg",
      "video_url": "https://example.com/videos/barbell_bench_press.mp4"
    }
  ]
}
```

---

### 4. **Get Exercises by Muscle Group ID**

#### `GET /api/exercises/muscle-group/:group_id`

**Description:** Retrieve exercises filtered by muscle group.

- **Path Parameter:**
  - `group_id`: The ID of the muscle group to filter by.

- **Query Parameters (optional):**
  - `limit`: Number of exercises to return per page (default: 10)
  - `page`: Page number (default: 1)
  - `sort_by`: Field to sort by (`name`, `exercise_category`, default: `name`)
  - `order`: Sort order (`asc` or `desc`, default: `asc`)

**Response:**
```json
{
  "exercises": [
    {
      "exercise_id": 2,
      "name": "Pull-Up",
      "description": "A bodyweight exercise for the back.",
      "equipment_id": 5,
      "group_id": 2,
      "exercise_category": "Bodyweight",
      "image_url": "https://example.com/images/pull_up.jpg",
      "video_url": "https://example.com/videos/pull_up.mp4"
    }
  ]
}
```

---

### 5. **Add a New Exercise**

#### `POST /api/exercises`

**Description:** Add a new exercise to the library.

- **Body Parameters:**
  - `name`: Name of the exercise (required)
  - `description`: Description of the exercise (required)
  - `equipment_id`: The ID of the equipment required (required)
  - `group_id`: The ID of the muscle group targeted (required)
  - `exercise_category`: Category of the exercise, e.g., Compound or Isolation (required)
  - `image_url`: URL for an image of the exercise (optional)
  - `video_url`: URL for a video tutorial of the exercise (optional)

**Response:**
```json
{
  "exercise": {
    "exercise_id": 3,
    "name": "New Exercise",
    "description": "A new exercise description.",
    "equipment_id": 1,
    "group_id": 1,
    "exercise_category": "Compound",
    "image_url": "https://example.com/images/new_exercise.jpg",
    "video_url": "https://example.com/videos/new_exercise.mp4"
  },
  "msg": "Exercise added."
}
```

---

### 6. **Edit an Exercise**

#### `PUT /api/exercises/:exercise_id`

**Description:** Update an existing exercise.

- **Path Parameter:**
  - `exercise_id`: The ID of the exercise to update.

- **Body Parameters:** (You can provide any of these parameters to update specific fields)
  - `name`: Updated name of the exercise.
  - `description`: Updated description of the exercise.
  - `equipment_id`: Updated equipment ID.
  - `group_id`: Updated muscle group ID.
  - `exercise_category`: Updated exercise category.
  - `image_url`: Updated image URL.
  - `video_url`: Updated video URL.

**Response:**
```json
{
  "exercise": {
    "exercise_id": 3,
    "name": "Updated Exercise",
    "description": "Updated description.",
    "equipment_id": 1,
    "group_id": 1,
    "exercise_category": "Compound",
    "image_url": "https://example.com/images/updated_exercise.jpg",
    "video_url": "https://example.com/videos/updated_exercise.mp4"
  },
  "msg": "Exercise updated."
}
```

---

### 7. **Delete an Exercise**

#### `DELETE /api/exercises/:exercise_id`

**Description:** Delete an exercise by ID.

- **Path Parameter:**
  - `exercise_id`: The ID of the exercise to delete.

**Response:**
```json
{
  "msg": "Exercise deleted."
}
```

---

### 8. **Get All Equipment**

#### `GET /api/equipment`

**Description:** Retrieve a list of all available equipment.

**Response:**
```json
{
  "equipment": [
    {
      "equipment_id": 1,
      "name": "Barbell"
    },
    {
      "equipment_id": 2,
      "name": "Dumbbell"
    }
  ]
}
```

---

### 9. **Get All Muscle Groups**

#### `GET /api/muscle-groups`

**Description:** Retrieve a list of all muscle groups.

**Response:**
```json
{
  "muscle_groups": [
    {
      "group_id": 1,
      "name": "Chest"
    },
    {
      "group_id": 2,
      "name": "Back"
    }
  ]
}
```

---

## Error Handling

- **400 Bad Request**: When there is an issue with the request format or missing values.
- **404 Not Found**: When the requested resource (e.g., exercise or equipment) does not exist.
- **500 Internal Server Error**: When the server encounters an unexpected error.

---

## Contact

Please reach out with improvements and suggestions for this API. 