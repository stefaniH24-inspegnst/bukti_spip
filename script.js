document.addEventListener('DOMContentLoaded', () => {
  console.log('Website BUKTI DUKUNG SPIP KK 3.1 siap.');

  // Event listener untuk semua tombol trigger
  const triggerButtons = document.querySelectorAll('.trigger-btn');

  triggerButtons.forEach((triggerBtn) => {
    triggerBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Mencegah default behavior dari link
      
      // Ambil target sub-buttons dari data-target attribute
      const targetId = triggerBtn.getAttribute('data-target');
      const subButtons = document.getElementById(targetId);

      if (subButtons) {
        // Tutup semua sub-buttons lainnya terlebih dahulu
        document.querySelectorAll('.sub-buttons').forEach((subBtn) => {
          if (subBtn.id !== targetId) {
            subBtn.style.display = 'none';
          }
        });

        // Toggle tampilan 3 tombol pilihan untuk tombol yang diklik
        if (subButtons.style.display === 'none') {
          subButtons.style.display = 'block';
        } else {
          subButtons.style.display = 'none';
        }
      }
    });
  });
});


