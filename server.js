// ----------------------------
// 🏥 City Hospital Server
// OOP Version using HospitalSystem class
// ----------------------------

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Import your OOP model controller
const HospitalSystem = require("./models/HospitalSystem");

const app = express();
const hospital = new HospitalSystem(); // main controller instance

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// ----------------------------
// 🌐 API ROUTES
// ----------------------------

// ✅ GET: Doctors
app.get("/api/doctors", (req, res) => {
  try {
    const doctors = hospital.db.getCollection("doctors");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET: Users (Patients)
app.get("/api/users", (req, res) => {
  try {
    const users = hospital.db.getCollection("users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET: Appointments
app.get("/api/appointments", (req, res) => {
  try {
    const appts = hospital.getAllAppointments();
    res.json(appts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST: Create Appointment
app.post("/api/appointments", (req, res) => {
  const { name, email, phone, doctorId, date, time } = req.body;
  if (!name || !doctorId || !date || !time)
    return res.status(400).json({ error: "Missing fields" });

  try {
    // Add patient if not exists
    let existingUser = hospital.db
      .getCollection("users")
      .find(u => u.email === email || u.phone === phone);
    let patientId;

    if (existingUser) {
      patientId = existingUser.id;
    } else {
      const newPatient = hospital.addPatient(name, phone, email);
      patientId = newPatient.id;
    }

    // Create appointment
    const appt = hospital.createAppointment(patientId, Number(doctorId), date, time);
    res.json({ success: true, appointment: appt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE: Appointment by ID
app.delete("/api/appointments/:id", (req, res) => {
  const id = Number(req.params.id);
  try {
    hospital.deleteAppointment(id);
    res.json({ success: true, message: "Appointment deleted" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// ✅ POST: Staff Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  try {
    const staffList = hospital.db.getCollection("staff");
    const user = staffList.find(
      s => s.username === username && s.password === password
    );
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Token simulation
    const token = Buffer.from(username + ":" + Date.now()).toString("base64");
    res.json({
      success: true,
      token,
      role: user.role,
      username: user.username
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET: Admin View (All Data)
app.get("/api/admin/all", (req, res) => {
  try {
    res.json(hospital.db.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET: Admin Stats
app.get("/api/admin/stats", (req, res) => {
  try {
    const stats = hospital.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🚀 Start Server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
