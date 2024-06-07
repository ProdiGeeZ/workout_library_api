# Exercise Library Mini Project

## Objective
Build a library of exercises with video demonstrations. Users can browse exercises and watch instructional videos.

## Features to Implement
1. **Exercise Browsing:**
   - Allow users to browse through a list of exercises.
2. **Video Demonstrations:**
   - Include video demonstrations for each exercise. (You can use YouTube Embeds)
3. **Exercise Categories:**
   - Categorise exercises for easy navigation.

## Description
This project aims to build a library of exercises with video demonstrations. Users can browse exercises and watch instructional videos.

**Aspects to Consider:**

- **Schema Design:**
  - Plan how to structure the database to store exercise details, categories, and video links.
  - Consider how to efficiently query exercises by category or search terms.

- **React App Design:**
  - Design components for browsing exercises, viewing exercise details, and playing videos.
  - Ensure a smooth and responsive video playback experience.

- **Best Practices:**
  - Optimise video loading and playback to handle various internet speeds.
  - Implement a user-friendly interface for searching and filtering exercises.
  - Ensure accessibility features are in place, such as captions for videos.

## Technical Requirements
- **Backend:** Node.js with Express
- **Database:** Supabase
- **Frontend:** React

## Steps to Build
1. **Set up the project:**
   - Initialise a new Node.js project.
   - Set up Supabase and connect it to the project.
2. **Exercise API:**
   - Create endpoints to add, update, delete, and fetch exercises.
3. **Frontend:**
   - Build React components for browsing exercises.
   - Integrate video playback for exercise demonstrations.
4. **Categories:**
   - Implement categories and filtering options for exercises.
