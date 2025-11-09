// models/HospitalSystem.js
const Doctor = require('./Doctor');
const Patient = require('./Patient');
const Appointment = require('./Appointment');
const Staff = require('./Staff');
const Database = require('./Database');

class HospitalSystem {
  constructor() {
    this.db = new Database();
  }

  // Add new doctor
  addDoctor(name, specialty) {
    const id = this.db.generateId('doctors');
    const doctor = new Doctor(id, name, specialty);
    this.db.addRecord('doctors', doctor.toJSON());
    return doctor;
  }

  // Add new patient
  addPatient(name, phone, email) {
    const id = this.db.generateId('users');
    const patient = new Patient(id, name, phone, email);
    this.db.addRecord('users', patient.toJSON());
    return patient;
  }

  // Book appointment
  createAppointment(patientId, doctorId, date, time) {
    const id = this.db.generateId('appointments');
    const appointment = new Appointment(id, patientId, doctorId, date, time);
    this.db.addRecord('appointments', appointment.toJSON());
    return appointment;
  }

  // Get all appointments
  getAllAppointments() {
    return this.db.getCollection('appointments');
  }

  // Delete appointment by ID
  deleteAppointment(id) {
    this.db.deleteRecord('appointments', id);
    return true;
  }

  // Add staff (admin, doctor, nurse)
  addStaff(username, password, role = 'staff') {
    const staff = new Staff(username, password, role);
    this.db.addRecord('staff', staff.toJSON());
    return staff;
  }

  // Authenticate staff login
  login(username, password) {
    const staffList = this.db.getCollection('staff');
    const staff = staffList.find(s => s.username === username && s.password === password);
    if (!staff) throw new Error('Invalid credentials');
    const loggedIn = new Staff(staff.username, staff.password, staff.role);
    loggedIn.markLogin();
    this.db.updateRecord('staff', staff.username, { lastLogin: loggedIn.lastLogin });
    return loggedIn;
  }

  // Get summary data for admin dashboard
  getStats() {
    return {
      totalDoctors: this.db.getCollection('doctors').length,
      totalPatients: this.db.getCollection('users').length,
      totalAppointments: this.db.getCollection('appointments').length
    };
  }

  // Utility: Find doctor by ID
  getDoctorById(id) {
    return this.db.getCollection('doctors').find(d => d.id === id);
  }

  // Utility: Find patient by ID
  getPatientById(id) {
    return this.db.getCollection('users').find(u => u.id === id);
  }
}

module.exports = HospitalSystem;
