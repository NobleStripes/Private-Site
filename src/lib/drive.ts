import { google } from "googleapis";

export async function getDriveClient() {
  const credentialsString = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
  if (!credentialsString) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_CREDENTIALS environment variable. Please add your Google Service Account JSON string to .env.");
  }

  let credentials;
  try {
    credentials = JSON.parse(credentialsString);
  } catch (e) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_CREDENTIALS is not a valid JSON string.");
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  return google.drive({ version: "v3", auth });
}

export async function listImages(folderId: string) {
  const drive = await getDriveClient();
  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/'`,
    fields: "files(id, name, mimeType, thumbnailLink, webContentLink)",
    pageSize: 100,
  });

  return res.data.files || [];
}
