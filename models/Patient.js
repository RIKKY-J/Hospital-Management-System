// models/Patient.js
class Patient {
  constructor(id, name, phone, email) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.appointments = []; // will store Appointment objects
  }

  // Link a new appointment to this patient
  addAppointment(appointment) {
    this.appointments.push(appointment);
  }

  // Get all appointment summaries
  getAppointmentsSummary() {
    if (this.appointments.length === 0)
      return `${this.name} has no appointments.`;
    return this.appointments.map(a => a.getSummary()).join('\n');
  }

  // Return formatted details
  getDetails() {
    return `Patient: ${this.name} | Phone: ${this.phone} | Email: ${this.email}`;
  }

  // Serialize for saving
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      email: this.email
    };
  }
}

module.exports = Patient;
