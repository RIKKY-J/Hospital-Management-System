// models/Database.js
const fs = require('fs');
const path = require('path');

class Database {
  constructor(filePath = path.join(__dirname, '../db.json')) {
    this.filePath = filePath;
    this.data = { doctors: [], users: [], appointments: [], staff: [] };
    this.load();
  }

  // Load database from file
  load() {
    try {
      const content = fs.readFileSync(this.filePath, 'utf8');
      this.data = JSON.parse(content);
      console.log('✅ Database loaded successfully');
    } catch (err) {
      console.warn('⚠️ Could not load DB, using empty dataset.', err.message);
    }
  }

  // Save database to file
  save() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.error('❌ Error saving database:', err);
      return false;
    }
  }

  // Get a collection (doctors, users, appointments, staff)
  getCollection(name) {
    if (!this.data[name]) throw new Error(`Collection '${name}' not found`);
    return this.data[name];
  }

  // Add a new record to a collection
  addRecord(collection, record) {
    if (!this.data[collection]) throw new Error(`Collection '${collection}' not found`);
    this.data[collection].push(record);
    this.save();
  }

  // Delete record by ID from a collection
  deleteRecord(collection, id) {
    if (!this.data[collection]) throw new Error(`Collection '${collection}' not found`);
    const index = this.data[collection].findIndex(item => item.id === id);
    if (index === -1) throw new Error(`Record with id ${id} not found`);
    this.data[collection].splice(index, 1);
    this.save();
  }

  // Update existing record
  updateRecord(collection, id, updatedData) {
    if (!this.data[collection]) throw new Error(`Collection '${collection}' not found`);
    const item = this.data[collection].find(obj => obj.id === id);
    if (!item) throw new Error(`Record with id ${id} not found`);
    Object.assign(item, updatedData);
    this.save();
  }

  // Generate new unique ID
  generateId(collection) {
    const arr = this.data[collection] || [];
    return arr.length ? arr[arr.length - 1].id + 1 : 1;
  }
}

module.exports = Database;
