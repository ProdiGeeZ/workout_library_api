# Exercise Library Mini Project

## Objective
The goal of this project is to build an API that allows users to navigate a comprehensive library of exercises, each with accompanying video demonstrations. Users will be able to browse through exercises, view instructional videos embedded from YouTube, and filter exercises by categories for easy navigation.

## Features to Implement
1. **Exercise Browsing:**
   - Users can browse a list of exercises, each with details such as the exercise name, description, and equipment required.
   
2. **Video Demonstrations:**
   - Each exercise will have an instructional video, embedded from YouTube.
   
3. **Exercise Categories:**
   - Exercises will be categorised for easier navigation, such as by muscle group or exercise type (e.g. strength, flexibility).

## Technology Stack
- **Node.js**: Backend runtime environment.
- **Express**: Web framework used to build the API.
- **PostgreSQL**: Relational database for storing exercise data.
- **Winston**: Used for logging application events and errors.

## Prerequisites

To run this project locally, ensure that you have the following software installed:

1. **Node.js**: Download and install Node.js from [here](https://nodejs.org/).
2. **PostgreSQL**: Install PostgreSQL, available for download [here](https://www.postgresql.org/download/).

   Ensure PostgreSQL is running on your machine and that you have created a PostgreSQL user and database for this project.

## Step-by-Step Guide to Running the API Locally

### 1. Clone the Repository

First, clone this repository to your local machine:
```bash
git clone https://github.com/ProdiGeeZ/workout_library_api.git
cd exercise-library-api
```

### 2. Set Up PostgreSQL Database

Once PostgreSQL is installed:
- Create the local databases running the command below:
  
```bash
npm run setup
```

Ensure your PostgreSQL server is running, and the credentials you set are correct.

### 3. Set Up Environment Variables

Create a `.env.development` file in the root of the project. This file will hold your environment variables, allowing the API to connect to the PostgreSQL database:

```bash
PGDATABASE=workout_library
```

You can also create `.env.production` and `.env.test` files if you plan to use different environments.

### 4. Install Dependencies

Run the following command to install all required dependencies for the project:
```bash
npm install
```

### 5. Set Up the Project

Run the following setup script to configure the project:
```bash
npm run setup
```

This will set up the database schema needed for the API.

### 6. Seed the Database

After the schema is set up, seed the database with initial data by running:
```bash
npm run seed
```

This will populate the database with a collection of exercises, including their names, categories, and video links.

### 7. Start the API

To start the API locally, run:
```bash
npm run start
```

The API will start on the default port (typically `3000`), unless specified otherwise in your environment variables. You can now interact with the API and browse the exercise data.

---

### Additional Commands
- **Running Tests**: To run the automated tests for the project, use:
  ```bash
  npm test
  ```
- **Logs**: Logs are managed using **Winston** and can be found in the `logs/` directory. Logs include information about requests, errors, and other application events.

---

By following these steps, you will have the Exercise Library API running locally. 