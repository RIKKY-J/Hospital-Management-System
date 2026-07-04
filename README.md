# 🏥 City Hospital Management System

This is a simple full-stack web application designed for booking medical appointments and managing hospital staff logins.

---

## 📋 What is this project about?

This application allows patients to schedule doctor appointments online and enables hospital staff (Admins, Doctors, Nurses, and Staff) to log in and manage those appointments.

It is built using:
*   **Backend**: Node.js & Express
*   **Frontend**: Simple HTML, CSS, & JavaScript
*   **Database**: A local JSON file (`db.json`)
*   **Testing**: Selenium WebDriver (for automated browser tests) & Allure (for visual test reports)

---

## 🚀 How to Run the Project

### 1. Install Dependencies
Open your terminal in the project folder and run:
```bash
npm install
```

### 2. Start the Server
Run the following command to start the web server:
```bash
npm start
```

### 3. Open in Browser
Once the server is running, navigate to:
*   **Patient Portal (Book Appointments)**: [http://localhost:3000](http://localhost:3000)
*   **Staff Login Portal**: [http://localhost:3000/staff.html](http://localhost:3000/staff.html)

---

## 🔑 Demo Login Credentials
Use these pre-configured accounts on the Staff Login page to test different user roles:
*   **Admin**: `admin` / `admin123`
*   **Doctor**: `drrahul` / `doc123`
*   **Nurse**: `nurse1` / `nurse123`
*   **Staff**: `staff1` / `pass123`

---

## 🧪 How to Run Tests

This project includes automated tests that control Google Chrome to verify booking and login functionality.

1. Ensure the web server is running (`npm start`).
2. Run the test suite:
   ```bash
   npm test
   ```
3. To view a visual dashboard of the test results, run:
   ```bash
   npm run report
   ```