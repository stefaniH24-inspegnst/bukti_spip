document.addEventListener('DOMContentLoaded', () => {
  console.log('Website BUKTI DUKUNG SPIP KK 3.1 siap.');

  // Password yang benar
  const correctPassword = 'SPIP2025';

  // ============================================
  // KONFIGURASI VIDEO TUTORIAL YOUTUBE
  // ============================================
  // GANTI LINK DI BAWAH INI DENGAN LINK YOUTUBE ANDA
  // Anda bisa menggunakan salah satu format berikut:
  // 1. Format embed: https://www.youtube.com/embed/VIDEO_ID
  // 2. Format watch: https://www.youtube.com/watch?v=VIDEO_ID
  // 3. Format short: https://youtu.be/VIDEO_ID
  // Contoh: const youtubeVideoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const youtubeVideoUrl = 'https://youtu.be/zjdJsu9rj6Q';

  // Fungsi untuk mengkonversi URL YouTube ke format embed
  function convertToEmbedUrl(url) {
    // Jika sudah format embed, kembalikan langsung
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    // Jika format watch, konversi ke embed
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('watch?v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Jika format short URL (youtu.be), konversi ke embed
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Jika sudah memiliki video ID saja
    return `https://www.youtube.com/embed/${url}`;
  }

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

  // Video Tutorial Modal Handler
  const videoTutorialBtn = document.getElementById('video-tutorial-btn'); // Old button (if exists)
  const videoTutorialFloatBtn = document.getElementById('video-tutorial-float-btn'); // Floating button
  const videoTutorialIconBtn = document.getElementById('video-tutorial-icon-btn'); // Icon in header
  const videoModal = document.getElementById('video-modal');
  const videoModalClose = document.getElementById('video-modal-close');
  const youtubeVideo = document.getElementById('youtube-video');

  // Fungsi untuk membuka modal video
  function openVideoModal() {
    // Set video URL
    youtubeVideo.src = convertToEmbedUrl(youtubeVideoUrl);
    videoModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  // Fungsi untuk menutup modal video
  function closeVideoModal() {
    videoModal.style.display = 'none';
    youtubeVideo.src = ''; // Stop video when closing
    document.body.style.overflow = ''; // Restore scroll
  }

  // Event listener untuk tombol video tutorial (old button - if exists)
  if (videoTutorialBtn) {
    videoTutorialBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openVideoModal();
    });
  }

  // Event listener untuk floating button
  if (videoTutorialFloatBtn) {
    videoTutorialFloatBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openVideoModal();
    });
  }

  // Event listener untuk icon button di header
  if (videoTutorialIconBtn) {
    videoTutorialIconBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openVideoModal();
    });
  }

  // Event listener untuk tombol close
  if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
  }

  // Event listener untuk klik di luar modal
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  // Event listener untuk Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.style.display === 'flex') {
      closeVideoModal();
    }
  });
});