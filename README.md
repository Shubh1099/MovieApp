# MovieCloud

**MovieCloud** is a web application featuring a sleek, user-friendly video player that lets users stream and enjoy their favorite movies effortlessly. The app also allows users to upload their movies directly to the cloud for easy access anytime, anywhere.

---

## Key Features

- **Advanced Video Player:** Smooth playback with support for multiple video formats, subtitles, and controls for a great viewing experience.  
- **Cloud Uploads:** Seamless upload of movie files to the cloud for secure storage and on-demand access.  
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop devices.  
- **User Authentication:** Secure user sign-up, login, and personalized libraries.  
- **Fast Streaming:** Optimized for minimal buffering and smooth playback.  

---

## Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js with Express  
- **Cloud Storage:** AWS S3 or Firebase  
- **Database:** MongoDB  

---

## Installation

1. Clone the repository:
   ```bash
   https://github.com/Shubh1099/MovieApp
   cd myMovies
   ```

2. Install dependencies for both the frontend and backend:
   ```bash
   # In the root folder
   npm install
   
   # Navigate to the frontend folder (if separate) and install dependencies
   cd frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root folder with the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     CLOUD_STORAGE_API_KEY=your_cloud_storage_api_key
     JWT_SECRET=your_secret_key
     ```

4. Start the application:
   ```bash
   # Run the backend
   npm run server

   # Run the frontend (if separate)
   npm run dev
   ```

5. Access the app at `http://localhost:3000` (or your specified port).

---

## Acknowledgements

- **React.js** for building the frontend.
- **Node.js** and **Express** for backend development.
- **AWS S3/Firebase** for cloud storage.
- **MongoDB** for the database solution.

Enjoy seamless movie streaming and uploading with **MovieCloud**!
