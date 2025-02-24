import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import cors from "cors";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Load environment variables
dotenv.config();

// AWS S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create Express App
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    methods: ["GET", "POST"], // Specify allowed methods
    credentials: true, // Include credentials if needed (e.g., cookies)
  })
);
app.post("/upload", upload.single("video"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${Date.now()}_${file.originalname}`, // Unique file name
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    const videoUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

    res.status(200).json({ videoUrl });
  } catch (error) {
    console.error("Error uploading to S3:", error);
    res.status(500).json({ message: "Failed to upload video" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
