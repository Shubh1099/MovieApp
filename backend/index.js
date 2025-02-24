dotenv.config();
import express from "express";
import cors from "cors";
import multer from "multer";
import { dirname } from "path";
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "AKIAUIHR7EQQUKH3HCUA",
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY ||
      "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",
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME || "movieebucket";

console.log("Environment variables:");
console.log("AWS_REGION:", process.env.AWS_REGION);
console.log("AWS_BUCKET_NAME:", process.env.AWS_BUCKET_NAME);
console.log("BUCKET_NAME variable:", BUCKET_NAME);

// Upload video endpoint
app.post("/api/upload", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const params = {
      Bucket: BUCKET_NAME,
      Key: `videos/${Date.now()}-${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    await s3Client.send(new PutObjectCommand(params));
    res.json({ message: "Upload successful" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Get videos list endpoint
app.get("/api/videos", async (req, res) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: "videos/",
    };

    const data = await s3Client.send(new ListObjectsV2Command(params));
    const videos =
      data.Contents?.map((item) => ({
        key: item.Key,
        url: `https://${BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${item.Key}`,
        lastModified: item.LastModified,
      })) || [];

    res.json(videos);
  } catch (error) {
    console.error("List error:", error);
    res.status(500).json({ error: "Failed to list videos" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
