# Role Based Access Control Dashboard for Admin


## Deployed links

- [Github repo](https://github.com/saiabhiramjaini/DealsDray)


- [Client Link](https://rbac.abhiramverse.tech/)

- [NPM Package Link](https://www.npmjs.com/package/@abhiram2k03/rbac-common)

- [API link](https://server-rbac.abhiramverse.tech/)

## Tech Stack

#### Frontend
- **ReactJS**
- **TailwindCSS**
- **ShadcnUI**
- **Framer-motion**
- **TypeScript**

#### Backend
- **NodeJS**
- **ExpressJS**
- **MongoDB**
- **TypeScript**

#### Authentication
- **JWT** and **Cookies**

#### Input Validation
- Using **Zod** library

#### Storing Data
- **Database**: MongoDB
- **Images**: Cloudinary

#### Deployment
- **Frontend**: Vercel
- **Common Package**: NPM
- **Server**: CI/CD using GitHub workflows on AWS EC2
   - **Docker**: Containerization
   - **Nginx**: for reverse proxy
   - **Certbot**: SSL certificate

## Project Architecture
![image](https://github.com/user-attachments/assets/9907d1fb-6ea3-46fd-be45-ce3354fa97d4)

## Server Deployment Architecture
![image](https://github.com/user-attachments/assets/72e62ca5-d324-4001-8cd9-c3bfdb686707)

## Database schema
![image](https://github.com/user-attachments/assets/2109aba0-883f-43f3-8749-ef24d228cef7)

## Client Structure

### Link 

- [Client Link](https://rbac.abhiramverse.tech/)

### Folder Structure

- **pages folder**: Contains the different route pages like Login, Signup, Dashboard, etc.
- **components folder**: Contains reusable UI components.

### Routes

```jsx
path="/" --> LoginPage
path="/signup" --> SignupPage
path="/home" --> HomePage
path="/create" --> CreateEmployeePage
path="/employeelist" --> EmployeeListPage 
path="/update/:id" --> UpdateEmployeePage
```

### Pages

1. **Signup Page** (`/signup`)
    - **Fields**: Username, Password
    - **Constraints**:
      - Username must be unique
      - Password must have a minimum of 8 characters

![image](https://github.com/user-attachments/assets/f97213b9-b33a-49ea-a5eb-daa8daefc29a)


2. **Login Page** (`/`)
    - **Fields**: Username, Password
    - **Constraints**:
      - User must sign up first
      - Username must be unique
      - Password must have a minimum of 8 characters

![image](https://github.com/user-attachments/assets/607a20ed-a723-487d-a6bb-6a96dc693a57)

3. **Dashboard Page** (`/home`)
    - Displays a welcome message
    - Navbar includes options like `Employee List`, `Logout`, etc.
    - Username is displayed in the navbar
![image](https://github.com/user-attachments/assets/9225dcbc-9cff-495f-afec-a250583b3a68)

4. **Create Employee Page** (`/create`)
      - Name: Text field
      - Email: Text field (should be unique)
      - Mobile No.: Text field (minimum of 10 characters)
      - Gender: Radio buttons
      - Status: Dropdown
      - Roles: Checkbox
      - Image Upload: Only JPG/PNG
   **So Admin can add all the employee details and assign roles and set a status for them.**
![image](https://github.com/user-attachments/assets/fcf12049-579d-466e-b2b9-c75098c7916d)

5. **Employee List Page** (`/employeelist`)
    - Search functionality considers all fields in the table
    - List of employees with `Edit` and `Delete` actions
    - Clicking `Edit` passes the employee's ID as a parameter to the Update Employee Page
![image](https://github.com/user-attachments/assets/4216ee99-8aa9-48c9-a545-c0d0b36a370f)
      

6. **Update Employee Page** (`/update/:id`)
    - On load, the employee's data is fetched using the `id` and pre-filled in the form
    - Admin can edit the initial values
   **Here Admin can change the details along wwith status and permissions as well**
![image](https://github.com/user-attachments/assets/f81fc5e1-ea88-46c1-8c46-c1ef41b98fd0)

### Authentication Check (isLoggedIn):

- The isLoggedIn variable is used to check if a user is authenticated by checking if the username exists in localStorage.
- If username is present in localStorage, the user is considered logged in.
- If the user is logged in (isLoggedIn is true), they are redirected to the `/home` route using `<Navigate to="/home" replace />`


## Common Package

This package is used for **type safety**. It declares types and schemas that are used across both the frontend and backend.

### Link
- [NPM Package Link](https://www.npmjs.com/package/@abhiram2k03/rbac-common)

### Types & Enums
- **loginSchema** and **Login type**
- **employeeSchema** and **Employee type**
- **genderEnum**
- **permissionsEnum**
- **statusEnum**

All necessary validations are handled in this common package.

### NPM Package
This folder is uploaded to NPM under the name `@abhiram2k03/rbac-common`.
  
To install:
```
npm i @abhiram2k03/rbac-common
```

## Server Structure

The server follows the **MVC architecture**.

### Link
- [API link](https://server-rbac.abhiramverse.tech/)

### Authentication Routes: `/api/v1/auth`

1. **`POST /signup`** - `createUser`
   - Parses username and password using `loginSchema`.
   - Hashes the password using bcrypt.
   - Creates a new user if the username is unique.
   - Generates a JWT token and stores it in a cookie.
   - Response: User creation success or validation error.


2. **`POST /login`** - `loginUser`
   - Parses username and password using `loginSchema`.
   - Verifies if the user exists and compares the password.
   - If authenticated, a JWT token is generated and stored in a cookie.
   - Response: Login success or error if credentials are incorrect.
     

3. **`GET /logout`** - `logoutUser`
   - Clears the authentication cookie (JWT token).
   - Response: Logout success.



### Employee Management Routes:  `/api/v1/employee`

1. **`POST /employee`** - `createEmployee`
   - Protected route (requires authentication).
   - Validates employee data with `employeeSchema`.
   - Checks if an employee with the provided email already exists.
   - Creates a new employee if validation passes.
   - Response: Employee creation success or validation error.
     

2. **`GET /employee`** - `getEmployees`
   - Protected route (requires authentication).
   - Retrieves a list of all employees.
   - Response: JSON array of employees or an error.
     

3. **`GET /employee/:id`** - `getEmployee`
   - Protected route (requires authentication).
   - Fetches a specific employee by ID.
   - Response: JSON object of the employee or an error.
     

4. **`PUT /employee/:id`** - `updateEmployee`
   - Protected route (requires authentication).
   - Validates employee data with `employeeSchema`.
   - Updates the employee’s data by ID.
   - Response: Employee update success or validation error.
     

5. **`DELETE /employee/:id`** - `deleteEmployee`
   - Protected route (requires authentication).
   - Deletes an employee by ID.
   - Response: Employee deletion success or error if not found.
     

### Auth Middleware:
- Checks if a valid JWT token is stored in cookies.
- Verifies the token and finds the corresponding user.
- Proceeds with the request if the user is authenticated.


## Database Choice
- **Database**: MongoDB
- **ODM (Object Document Mapper)**: Mongoose
- **Collections**: 2 primary collections

### Collection 1: Login Collection
- **Model Name**: Login
- **Purpose**: User authentication and login management
- **Key Fields**:
  - `username`: Unique identifier for user login
  - `password`: Stored credentials (To maintain privacy, this is be hashed)
- **Automatic Tracking**: 
  - `createdAt`: Timestamp of user account creation
  - `updatedAt`: Timestamp of last user account modification

![image](https://github.com/user-attachments/assets/e9bc7efa-e744-41e2-8947-88d72376b5ad)

### Collection 2: Employee Collection
- **Model Name**: Employee
- **Purpose**: Store comprehensive employee information
- **Key Fields**:
  - `name`: Full name of the employee
  - `email`: Unique identifier for each employee (enforced as unique)
  - `mobile`: Contact number
  - `gender`: Restricted to predefined gender options
  - `permissions`: Array of access permissions
  - `status`: Current employment status
  - `image`: Employee profile image path or identifier
- **Automatic Tracking**:
  - `createdAt`: Timestamp of employee record creation
  - `updatedAt`: Timestamp of last employee record modification

![image](https://github.com/user-attachments/assets/a084c774-82f9-4725-9d9c-12ab2991e971)


### Key Design Characteristics
- Strict schema validation using Mongoose
- Enum-based restrictions on certain fields (gender, permissions, status)
- Unique constraints on sensitive fields like email
- Automatic timestamp management
- Modular approach with separate schemas for different entities





## Deployment Process

### Client:
- Deployed on **Vercel**.
![image](https://github.com/user-attachments/assets/d690d863-37ce-49e1-bcad-1aa161a7c124)

### Common Package:
- Published on **NPM**.
![image](https://github.com/user-attachments/assets/40754126-37b1-4525-861d-a3cf2fba56dd)


### Containerization:
- Used Docker for Containerization and the image will be uploaded by CI/CD to docker hub.
![image](https://github.com/user-attachments/assets/9ca89622-e1cc-4f6f-bf60-1ba9d1a2c53c)

### Server:
- CI/CD pipeline set up using **GitHub workflows** on **AWS EC2**.
![image](https://github.com/user-attachments/assets/cee9cb03-635e-4a4d-8426-d4007a64ddab)



#### Steps Followed:
1. Created a **Dockerfile** and verified the image by building it locally.
2. Set up two GitHub workflows: `build.yaml` and `deploy.yaml`.
3. Created a new repository on **Docker Hub** for `deploy.yaml`.
4. Launched a new **EC2 instance** (t2.micro, running Ubuntu).
5. SSH'd into the EC2 instance.
6. Installed **Docker** on the instance.
7. Updated the security rules to allow access on port `8080`.
8. Installed **Nginx** to serve as a reverse proxy.
9. Used **Certbot** to set up an SSL certificate for secure communication.


## Setting Up Locally

### Prerequisites
- **Node.js**: Ensure Node.js (v16 or higher) is installed.
- **MongoDB**: Install MongoDB and run it locally.
- **Docker** (optional): Required for containerization.
- **Git**: Version control for cloning the repository.

### Steps to Set Up

1. **Clone the Repository**
   ```bash
   git clone https://github.com/saiabhiramjaini/RBAC-admin.git
   cd RBAC-admin
   ```

2. **Install Dependencies**
   Navigate to the client and server directories and install dependencies.
   ```bash
   # For the client
   cd client
   npm install
   cd ..

   # For the server
   cd server
   npm install
   cd ..
   ```

3. **Set Up Environment Variables**

   Create `.env` files for both `client` and `server` directories:


## Contribution Guide

Contributions are welcome! Follow the steps below to contribute:

### Steps to Contribute

1. **Fork the Repository**
   - Go to the GitHub repository and click the "Fork" button.

2. **Clone the Forked Repository**
   ```bash
   git clone https://github.com/your-username/RBAC-admin.git
   cd RBAC-admin
   ```

3. **Create a Branch**
   Create a new branch for your feature or bug fix.
   ```bash
   git checkout -b feature-or-bugfix-name
   ```

4. **Make Changes**
   - Implement your changes in the codebase.
   - Ensure the code adheres to the project's coding standards.

5. **Run Tests**
   Test your changes locally to ensure they work as expected.

6. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add meaningful commit message"
   ```

7. **Push Changes to GitHub**
   ```bash
   git push origin feature-or-bugfix-name
   ```

8. **Create a Pull Request**
   - Go to the original repository and click "Pull Requests."
   - Click "New Pull Request" and choose your forked branch.

9. **Review Process**
   - I will review your pull request.
   - Make any requested changes, if necessary.

10. **Merge**
    - Once approved, your changes will be merged into the main branch.

