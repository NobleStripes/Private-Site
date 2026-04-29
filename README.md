# Vault | Private AI Image Gallery

A private, secure web application to manage and display your collection of AI-generated "crack" images. Built with Next.js App Router, Prisma, NextAuth, and integrated directly with Google Drive.

## Features

- **Google Drive Sync:** Fetch images directly from a private Google Drive folder.
- **Masonry Layout:** Beautiful, responsive grid layout for viewing images.
- **Dark Mode & Glassmorphism:** Sleek, premium user interface.
- **Private Access:** Secured with NextAuth; only authorized users can view the gallery.
- **Database Driven:** Uses Prisma (SQLite by default, easily upgradable) for metadata and tagging (coming soon).

## Getting Started

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed.
2. **Google Cloud Service Account**: You need a Google Cloud Service Account JSON key to securely access your Google Drive via the API.
3. **Google Drive Folder**: A specific folder ID in your Google Drive where your images are stored. Ensure this folder is shared with your Service Account's email address.

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate Prisma Client and sync the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. Configure Environment Variables:
   Open the `.env` file in the root of the project and ensure all variables are filled out:
   ```env
   # Your local SQLite database path
   DATABASE_URL="file:./dev.db"

   # Security settings for NextAuth
   NEXTAUTH_SECRET="your-super-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Password used to log in to the gallery
   ADMIN_PASSWORD="your-secure-password"

   # Google Drive Integration
   # Provide the entire JSON string of your service account key
   GOOGLE_SERVICE_ACCOUNT_CREDENTIALS='{ "type": "service_account", "project_id": "...", ... }'
   # The ID of the Google Drive folder containing your images
   GOOGLE_DRIVE_FOLDER_ID="YOUR_FOLDER_ID_HERE"
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser. Log in with the password you set in your `.env` file, and click the **"Sync from Drive"** button to load your images!
