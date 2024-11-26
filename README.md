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
        

2. **Login Page** (`/`)
    - **Fields**: Username, Password
    - **Constraints**:
      - User must sign up first
      - Username must be unique
      - Password must have a minimum of 8 characters
        

3. **Dashboard Page** (`/home`)
    - Displays a welcome message
    - Navbar includes options like `Employee List`, `Logout`, etc.
    - Username is displayed in the navbar


4. **Create Employee Page** (`/create`)
      - Name: Text field
      - Email: Text field (should be unique)
      - Mobile No.: Text field (minimum of 10 characters)
      - Designation: Dropdown
      - Gender: Radio buttons
      - Course: Checkbox
      - Image Upload: Only JPG/PNG
        

5. **Employee List Page** (`/employeelist`)
    - Search functionality considers all fields in the table
    - List of employees with `Edit` and `Delete` actions
    - Clicking `Edit` passes the employee's ID as a parameter to the Update Employee Page
      

6. **Update Employee Page** (`/update/:id`)
    - On load, the employee's data is fetched using the `id` and pre-filled in the form
    - Admin can edit the initial values
      

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



## Deployment Process

### Client:
- Deployed on **Vercel**.

### Common Package:
- Published on **NPM**.

### Server:
- CI/CD pipeline set up using **GitHub workflows** on **AWS EC2**.

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



## Database


