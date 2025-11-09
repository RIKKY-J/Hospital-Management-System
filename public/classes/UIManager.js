// public/classes/UIManager.js
class UIManager {
  constructor() {
    this.toastContainer = null;
    this.initToastContainer();
  }

  // -----------------------
  // 🧱 BASIC INITIALIZATION
  // -----------------------
  initToastContainer() {
    this.toastContainer = document.createElement('div');
    this.toastContainer.className = 'toast-container';
    document.body.appendChild(this.toastContainer);
  }

  // -----------------------
  // 🧾 RENDERING HELPERS
  // -----------------------
  renderTable(tableId, data, columns) {
    const table = document.getElementById(tableId);
    if (!table) return;
    const tbody = table.querySelector('tbody');
    if (!tbody) return;

    if (!data || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="${columns.length}">No records found</td></tr>`;
      return;
    }

    tbody.innerHTML = data.map(item => {
      return `<tr>${columns.map(col => `<td>${this.escapeHtml(item[col] ?? '')}</td>`).join('')}</tr>`;
    }).join('');
  }

  // -----------------------
  // 📢 FEEDBACK UI
  // -----------------------
  showToast(message, type = "info", timeout = 2500) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    this.toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 20);
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, timeout);
  }

  // -----------------------
  // 🎯 PAGE TITLE UPDATE
  // -----------------------
  updatePageTitle(titleText) {
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) headerTitle.textContent = titleText;
    document.title = titleText;
  }

  // -----------------------
  // 🔄 LOADING SPINNER
  // -----------------------
  showLoading(msg = "Loading...") {
    let loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `<div class="spinner"></div><p>${msg}</p>`;
    document.body.appendChild(loader);
  }

  hideLoading() {
    const loader = document.querySelector('.loader');
    if (loader) loader.remove();
  }

  // -----------------------
  // 🧼 UTILITY
  // -----------------------
  escapeHtml(str) {
    if (str == null) return '';
    return String(str).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }
}

// Expose globally
window.UIManager = UIManager;
