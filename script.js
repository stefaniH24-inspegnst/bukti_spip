document.addEventListener('DOMContentLoaded', () => {
  console.log('Website BUKTI DUKUNG SPIP KK 3.1 siap.');

  // Password yang benar
  const correctPassword = 'SPIP2025';

  // Fungsi untuk menampilkan modal password
  function showPasswordModal(targetId) {
    // Buat elemen modal
    const modal = document.createElement('div');
    modal.className = 'password-modal';
    modal.innerHTML = `
      <div class="password-modal-content">
        <h2>Masukkan Password</h2>
        <input type="password" id="password-input" class="password-input" placeholder="Masukkan password" autofocus>
        <div class="password-modal-buttons">
          <button class="btn-password btn-submit">Masuk</button>
          <button class="btn-password btn-cancel">Batal</button>
        </div>
        <p id="password-error" class="password-error"></p>
      </div>
    `;
    document.body.appendChild(modal);

    // Fokus ke input password
    const passwordInput = document.getElementById('password-input');
    passwordInput.focus();

    // Handler untuk tombol submit
    function handleSubmit() {
      const enteredPassword = passwordInput.value;
      
      if (enteredPassword === correctPassword) {
        // Password benar, tampilkan sub-buttons
        modal.remove();
        showSubButtons(targetId);
      } else {
        // Password salah, tampilkan error
        const errorMsg = document.getElementById('password-error');
        errorMsg.textContent = 'Password salah! Silakan coba lagi.';
        passwordInput.value = '';
        passwordInput.focus();
      }
    }

    // Handler untuk tombol cancel
    function handleCancel() {
      modal.remove();
    }

    // Event listener untuk tombol submit
    const submitBtn = modal.querySelector('.btn-submit');
    submitBtn.addEventListener('click', handleSubmit);

    // Event listener untuk tombol cancel
    const cancelBtn = modal.querySelector('.btn-cancel');
    cancelBtn.addEventListener('click', handleCancel);

    // Event listener untuk Enter key
    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    });

    // Event listener untuk Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
      if (e.key === 'Escape') {
        handleCancel();
        document.removeEventListener('keydown', escapeHandler);
      }
    });
  }

  // Fungsi untuk menampilkan sub-buttons
  function showSubButtons(targetId) {
    const subButtons = document.getElementById(targetId);
    
    if (subButtons) {
      // Tutup semua sub-buttons lainnya terlebih dahulu
      document.querySelectorAll('.sub-buttons').forEach((subBtn) => {
        if (subBtn.id !== targetId) {
          subBtn.style.display = 'none';
        }
      });

      // Toggle tampilan sub-buttons untuk tombol yang diklik
      if (subButtons.style.display === 'none') {
        subButtons.style.display = 'block';
      } else {
        subButtons.style.display = 'none';
      }
    }
  }

  // Event listener untuk semua tombol trigger
  const triggerButtons = document.querySelectorAll('.trigger-btn');

  triggerButtons.forEach((triggerBtn) => {
    triggerBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Mencegah default behavior dari link
      
      // Ambil target sub-buttons dari data-target attribute
      const targetId = triggerBtn.getAttribute('data-target');
      const subButtons = document.getElementById(targetId);

      if (subButtons) {
        // Jika sub-buttons sudah ditampilkan, langsung toggle (tutup)
        if (subButtons.style.display === 'block') {
          subButtons.style.display = 'none';
        } else {
          // Jika sub-buttons belum ditampilkan, minta password dulu
          showPasswordModal(targetId);
        }
      }
    });
  });
});


