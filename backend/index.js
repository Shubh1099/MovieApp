import dotenv from "dotenv";
import {
  GetObjectCommand,
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
dotenv.config();

const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

async function listObjects() {
  const command = new ListObjectsV2Command({
    Bucket: "movieebucket",
    key: "/",
  });
  const result = await s3Client.send(command);
  // console.log("Objects in the bucket:");
  // result.Contents?.forEach((object) => {
  //   console.log(` - ${object.Key} (${object.Size} bytes)`);
  // });

  console.log(JSON.stringify(result))
}

async function putObjectURL(filename, contentType) {
  const command = new PutObjectCommand({
    Bucket: "movieebucket",
    Key: `uploads/user-upload/${filename}`,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 300,
  });

  return url;
}

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "movieebucket",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  return url;
}

async function init() {
  // try {
  //   const url = await getObjectURL("video.mp4");
  //   console.log("URL for the video is:", url);
  // } catch (error) {
  //   console.error("Error getting signed URL:", error)
  // }

  // try {
  //   // const url = await putObjectURL("video.mp4");
  //   const today = new Date().toISOString().slice(0, 10);

  //   console.log(
  //     "URL for uploading is:",
  //     await putObjectURL(`video-${today}.mp4`, "video/mp4")
  //   );
  // } catch (error) {
  //   console.error("Error getting signed URL:", error);
  // }

  await listObjects();
}

init();
