# Resume Analyzer          
[![Live App](https://img.shields.io/badge/Live-App-brightgreen)](https://resume-analyser-kp0f.onrender.com/)

## Description

Resume Analyzer is a full-stack web application that analyzes resumes using Artificial Intelligence and provides meaningful insights such as skill extraction, resume evaluation, and improvement suggestions.

This project integrates **Google Gemini AI** for resume analysis and includes secure authentication features like email verification and password reset using **Brevo** and job suggestions using **Adzuna API**.

## Tech Stack
- **Frontend**: React.js, Vite, HTML, CSS (Custom Glassmorphism Design)
- **Backend**: Java, Spring Boot 
- **Database**: MySQL

## Screenshots / Preview

<!-- TODO: Upload your screenshots to GitHub and replace these placeholder links below -->
<p align="center">
  <img width="45%" src="https://placehold.co/600x400?text=Screenshot+1" alt="Screenshot 1"/>
  <img width="45%" src="https://placehold.co/600x400?text=Screenshot+2" alt="Screenshot 2"/>
</p>
<p align="center">
  <img width="45%" src="https://placehold.co/600x400?text=Screenshot+3" alt="Screenshot 3"/>
  <img width="45%" src="https://placehold.co/600x400?text=Screenshot+4" alt="Screenshot 4"/>
</p>

## Project Structure

This repository is cleanly divided into two main folders:
- `/Frontend` - Contains the Vite & React codebase.
- `/Backend` - Contains the Spring Boot API, configurations, and statically built UI.

## How to Run the Project Locally

### 1. Clone the Repository
```bash
git clone https://github.com/jay1466/Ai-Resume-Analyser.git
```

### 2. Run the Frontend (Development Mode)
Navigate to the `Frontend` directory to run the React development server.
```bash
cd Frontend
npm install
npm run dev
```

### 3. Run the Backend
Navigate to the `Backend` directory.
Open the project in **IntelliJ IDEA / Eclipse**, or run it from the terminal.

#### Configure Credentials (`.env` or `application.properties`)
Create a `.env` file in the `Backend` folder (do **not** commit it) or modify your `application.properties` with the required API keys:
- `url`, `uname`, `upass` (MySQL Database)
- `genkey` (Google Gemini API Key)
- `mailkey` (Brevo Mail API Key)
- `adzunaid`, `adzunakey` (Adzuna Job API Credentials)
- `gcpid`, `gcpsecret` (Google OAuth credentials)
- `jwtkey` (Random secure JWT string)

*See `Backend/.env.example` for the required format.*

```bash
cd Backend
./mvnw spring-boot:run
```

#### 4. Open in Browser
When the backend is running, it automatically serves the production-ready frontend statically at:
```
http://localhost:8080/
```

## Modifying the Frontend UI for Production

If you make changes to the `Frontend` and want to deploy them inside the `Backend`:
```bash
cd Frontend
npm run build
```
Then, copy the contents of the `Frontend/dist/` folder into `Backend/src/main/resources/static/`. This allows Spring Boot to serve your updated React app!

## Disclaimer
- This project is developed for learning and demonstration purposes.
- AI analysis results may vary and should not be considered professional career advice.
