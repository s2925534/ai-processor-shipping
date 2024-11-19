# API Processor

This project is an API AI based processor for shipping containers, it was designed to quickly spin up a new API 
codebase using 
AI, TypeScript, Express, 
and Sequelize for database interaction. The setup provides the basic functionality to get started with a REST API and can be easily extended for your needs.

## Features

- **Express.js** for building the API
- **Sequelize** as ORM to interact with MySQL database
- **TypeScript** for better type safety and development experience
- **dotenv** for managing environment variables
- **nodemon** for automatic server reloading during development
- **Seamless setup** with predefined routes and controllers

## Prerequisites

Before setting up this project, you need the following installed on your local machine:

- **Node.js** (version 16.x or higher)
- **npm** (Node package manager, comes with Node.js)
- **MySQL** database running locally or remotely

## Setup Instructions

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone git@github.com:s2925534/ai-processor-shipping.git
cd ai-processor
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Set up the Environment Variables

Copy the sample `.env.sample` file to a new file named `.env` in the root directory of the project:

```bash
cp .env.sample .env
```

Then, fill in the values for the following environment variables:

```bash
DATABASE_NAME=your_database_name
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
DATABASE_HOST=your_database_host
OPENAI_API_KEY=chatpgt_key
FILES_DIR=src/_files -> this is the directory you want to keep files for p[rocessing]
```

Ensure that the MySQL database is running, and the credentials provided match those in your `.env` file.

### 4. Build the Project

To build the TypeScript project, run:

```bash
npm run build
```

This will compile the TypeScript files in the `src` directory and output the compiled JavaScript files to the `dist` directory.

### 5. Run the Project

To start the project, use the following command:

```bash
npm start
```

This will first build the project and then start the server using the compiled `dist/app.js` file.

Alternatively, you can run the project in **development mode** with automatic restarts using:

```bash
npm run dev
```

This will use `nodemon` to watch for changes in your `src` directory and restart the server automatically.

### 6. Testing the Routes

Once the server is running, you can test the following routes:

- **GET `/api/get-sample`** – Returns a success message: "Success in GET".
- **POST `/api/post-sample`** – Returns a success message: "Success in POST".
- **GET `/api/test`** – A test route that responds with: "Test route works!".
- **POST `/api/parse`** – A route to request AI to process a file or text and return it in a given format".

You can use tools like **Postman** or **cURL** to test the API endpoints.

## Dependencies

### Core Dependencies:
- **express**: Web framework for Node.js.
- **sequelize**: ORM for MySQL (used to interact with the database).
- **mysql2**: MySQL client for Node.js.
- **dotenv**: Loads environment variables from a `.env` file.
- **axios**: Promise-based HTTP client for making requests.
- **chatgpt**: ChatGPT API (for interaction with the OpenAI API).
- **jsdom**: JavaScript implementation of the web standards.
- **pdf-parse**: A library for parsing PDF documents.

### Development Dependencies:
- **typescript**: TypeScript compiler.
- **nodemon**: Utility that automatically restarts the server during development.
- **ts-node**: TypeScript execution environment for Node.js.
- **tsconfig-paths**: Adds support for TypeScript paths.
- **@types/express**: TypeScript type definitions for Express.
- **@types/jsdom**: TypeScript type definitions for jsdom.
- **@types/node**: TypeScript type definitions for Node.js.
- **@types/pdf-parse**: TypeScript type definitions for pdf-parse.

## Project Structure

Here is the structure of the project:

```
.
├── .env.sample            # Sample .env file
├── .gitignore             # Git ignore file
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Lock file for npm dependencies
├── tsconfig.json          # TypeScript configuration file
├── src/
│   ├── app.ts             # Main application file (entry point)
│   ├── config/
│   │   └── database.ts    # Database configuration and sequelize setup
│   ├── controllers/
│   │   └── sampleController.ts  # Controller handling the logic for routes
│   ├── routes/
│   │   └── sampleRoutes.ts      # Express routes for the API
│   ├── interfaces/
│   │   ├── sample.interface.ts  # TypeScript interface for the sample data
│   │   ├── prompt.interface.ts  # TypeScript interface for the sample data
│   │   └── sources/
│   │       └── sampleSource.interface.ts  # Interface for source data
│   ├── models/
│   │   └── Sample.model.ts  # Sequelize model for the Sample table
│   └── utils/
│       └── readJson.ts      # Utility function to read JSON files
└── dist/                   # Compiled JavaScript files
```

### Important Files:

- **`src/app.ts`**: Main application setup, registers the routes, and starts the server.
- **`src/config/database.ts`**: Configures the connection to the MySQL database using Sequelize.
- **`src/routes/sampleRoutes.ts`**: Contains the API routes for the sample controller.
- **`src/controllers/sampleController.ts`**: Contains the logic for handling API requests.
- **`src/models/Sample.model.ts`**: Defines the Sequelize model for the `Sample` table.
- **`src/interfaces/sample.interface.ts`**: TypeScript interface for the `Sample` model attributes.

## Author

This project was created and is maintained by **Pedro Veloso**.  
Feel free to reach out at [pedro@veloso.dev](mailto:pedro@veloso.dev).

## Repository

You can find the repository for this project here:  
[git@github.com:s2925534/ai-processor-shipping.git](git@github.com:s2925534/ai-processor-shipping.git)

## Contributing

Feel free to fork the repository and contribute by opening a pull request with any changes or improvements. If you have any questions, open an issue, and I will respond as soon as possible.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
