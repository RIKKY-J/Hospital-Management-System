// models/Doctor.js
class Doctor {
  constructor(id, name, specialty) {
    this.id = id;
    this.name = name;
    this.specialty = specialty;
  }

  // Return doctor details
  getDetails() {
    return `${this.name} (${this.specialty})`;
  }

  // Update doctor specialty
  updateSpecialty(newSpecialty) {
    this.specialty = newSpecialty;
  }

  // Serialize for saving in JSON
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      specialty: this.specialty
    };
  }
}

module.exports = Doctor;
