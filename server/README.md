Blog App Backend
This is the backend server for the Blog App, providing API endpoints for user authentication and managing blog data.

Technologies Used
Express.js: Web framework for Node.js used for building RESTful APIs.
MongoDB: NoSQL database used for storing user and blog data.
Mongoose: MongoDB object modeling tool for Node.js used for schema-based modeling.
bcrypt: Library for hashing passwords for secure authentication.
jsonwebtoken: Library for generating JSON Web Tokens (JWT) for user authentication.
multer: Middleware for handling multipart/form-data used for file uploads.
cloudinary: Cloud storage service used for storing uploaded images.
cors: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js.
dotenv: Library for loading environment variables from a .env file into process.env.
nodemon: Utility that automatically restarts the server when changes are detected during development.
prettier: Code formatter used to maintain consistent code style.

Installation
Clone the repository:


git clone <repository-url>
Navigate to the project directory:


cd blog-app
Install dependencies:


npm install

Create a .env file in the root directory and add the following environment variables:

plaintext
Copy code
PORT=3001
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
Start the server:


npm start
The server should now be running on http://localhost:8000.

API Endpoints
POST /users/register: Register a new user.
POST /users/login: Login an existing user.
<!-- GET /api/auth/logout: Logout the current user. -->

GET /blogapp/blogs: Get all blogs.
GET /blogapp/blogs/
: Get a specific blog by ID.
POST /blogapp/blogs: Create a new blog.
PUT /blogapp/blogs/
: Update an existing blog.
DELETE /blogapp/blogs/
: Delete a blog by ID.