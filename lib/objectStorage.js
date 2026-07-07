import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "us-east-1", // این مقدار برای سرویس لیارا اهمیتی نداره ولی SDK بهش نیاز داره
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
  },
  forcePathStyle: true, // برای سرویس‌های سازگار با S3 مثل لیارا لازمه
});

const BUCKET = process.env.LIARA_BUCKET_NAME;
const ENDPOINT = process.env.LIARA_ENDPOINT;

export async function uploadImage(buffer, key, contentType) {
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ACL: "public-read",
    })
  );

  return `${ENDPOINT}/${BUCKET}/${key}`;
}

export async function deleteImage(url) {
  // از روی آدرس کامل، فقط بخش "کلید" فایل رو استخراج می‌کنیم
  const prefix = `${ENDPOINT}/${BUCKET}/`;
  if (!url.startsWith(prefix)) return;
  const key = url.slice(prefix.length);

  try {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
  } catch {
    // اگه فایل از قبل وجود نداشت، مشکلی نیست
  }
}