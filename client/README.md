# Slash Bug Tracking Tool

![](https://github.com/imfahadali/slash-bug-tracker/blob/main/public/bug-tracker-optimize.gif)

Slash is a comprehensive bug tracking tool designed to streamline project management and issue tracking. With Slash, you can efficiently create projects, add authors to your projects, create tickets, assign tickets to authors, and analyze user activity. This README file provides an overview of the features, tools used, and instructions to get started with Slash.

## Features

Slash offers the following key features:

1. **Create Project:** Easily create new projects to organize and manage your bug tracking tasks effectively.

2. **Add Authors:** Add authors to your projects from the current pool of users, ensuring collaboration and efficient issue resolution.

3. **Create Ticket:** Create detailed tickets to document and track bugs, feature requests, or any other issues related to your projects.

4. **Assign Ticket:** Assign tickets to specific authors, ensuring clear responsibility and accountability for issue resolution.

5. **User Analytics:** Analyze user activity to gain insights into the performance and productivity of your team members.

## Tools Used

Slash is built using modern web technologies and frameworks. The key tools and technologies used in the development of Slash include:

### Frontend

- **React.js**: A popular JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript for enhanced productivity and code quality.
- **Tailwind CSS**: A highly customizable CSS framework for rapid UI development.
- **Vite**: A fast and lightweight development server and build tool.
- **Formik**: A popular form library for managing and validating forms.
- **Yup**: A JavaScript schema builder for value parsing and validation.
- **React Router Dom**: A routing library for easy navigation within the application.

### Backend

- **Node.js**: A JavaScript runtime environment for server-side development.
- **Express**: A fast and minimalist web application framework for Node.js.
- **JSON Web Token (JWT)**: A secure method for transmitting information between parties.
- **bcryptjs**: A library for hashing and salting passwords for secure storage.
- **AWS S3**: Object storage service for file uploading and storage.
- **Prisma**: A modern database toolkit for Node.js and TypeScript.
- **PostgreSQL**: A powerful open-source relational database management system.
- **Google Cloud App Engine**: A fully managed serverless application platform for hosting.
- **Google Cloud SQL**: A fully managed relational database service for hosting the database.

## Getting Started

To get started with Slash, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/imfahadali/slash-bug-tracker.git

   ```

2. Clone the Backend repository:

   ```bash
   git clone https://github.com/imfahadali/slash-bug-tracker-be.git

   ```

3. Install BE dependencies:

   ```bash
   cd slash-bug-tracker-be
   npm install
   ```

4. Configure the environment variables BE:

   Create .env and add all the necessary configuration options:

- `DATABASE_URL`: [description of the database URL]
- `TOKEN_KEY`: [description of the token key]
- `AWS_S3_ACCESS_KEY_ID`: [description of the AWS S3 access key ID]
- `AWS_S3_SECRET_ACCESS_KEY`: [description of the AWS S3 secret access key]
- `BUCKET_NAME`: [description of the bucket name]

5. Start the development server(FE):

   ```bash
   npm start
   ```

6. Install FE dependencies:

   ```bash
   cd ../slash-bug-tracker
   npm install
   ```

7. Configure the environment variables FE:
   Create .env and add the necessary configuration option:

- `VITE_BACKEND_API`=http://localhost:4000
