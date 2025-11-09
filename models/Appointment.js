// models/Appointment.js
class Appointment {
  constructor(id, patientId, doctorId, date, time, status = "booked") {
    this.id = id;
    this.patientId = patientId;
    this.doctorId = doctorId;
    this.date = date;
    this.time = time;
    this.status = status; // booked, checked-in, completed, cancelled
  }

  // Change appointment status
  updateStatus(newStatus) {
    const validStatuses = ["booked", "checked-in", "completed", "cancelled"];
    if (validStatuses.includes(newStatus)) {
      this.status = newStatus;
    } else {
      throw new Error("Invalid appointment status");
    }
  }

  // Get appointment summary
  getSummary() {
    return `Appointment #${this.id} — Doctor: ${this.doctorId}, Patient: ${this.patientId}, Date: ${this.date} ${this.time}, Status: ${this.status}`;
  }

  // Check if appointment date is in the future
  isUpcoming() {
    const today = new Date();
    const apptDate = new Date(`${this.date}T${this.time}`);
    return apptDate > today;
  }

  // Serialize for JSON storage
  toJSON() {
    return {
      id: this.id,
      patientId: this.patientId,
      doctorId: this.doctorId,
      date: this.date,
      time: this.time,
      status: this.status
    };
  }
}

module.exports = Appointment;
