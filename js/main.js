/* ============================================================
   GoDrive Taxi — Link in Bio
   ============================================================ */

(function () {
  'use strict';

  // Reservar Viaje
  const btnReservar = document.getElementById('btnReservar');
  if (btnReservar) {
    btnReservar.addEventListener('click', function () {
      alert('🔧 Función de reserva próximamente disponible.\n\nPor ahora, escríbenos por WhatsApp para programar tu viaje.');
    });
  }

  // Compartir Ubicación
  const btnUbicacion = document.getElementById('btnUbicacion');
  if (btnUbicacion) {
    btnUbicacion.addEventListener('click', function () {
      if (!navigator.geolocation) {
        alert('La geolocalización no está disponible en este navegador.');
        return;
      }

      const original = this.innerHTML;
      const loading =
        '<span class="btn-icon location"><i class="fa-solid fa-spinner fa-spin"></i></span>' +
        '<span class="btn-text"><span class="btn-title">Obteniendo ubicación...</span><span class="btn-sub">Por favor espera</span></span>' +
        '<span class="btn-arrow"><i class="fa-solid fa-chevron-right"></i></span>';
      this.innerHTML = loading;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          const msg = `https://wa.me/584161234567?text=${encodeURIComponent('Hola GoDrive! Mi ubicación actual es: ' + mapsUrl)}`;
          window.open(msg, '_blank');
          this.innerHTML = original;
        },
        () => {
          alert('No pudimos obtener tu ubicación. Verifica los permisos de geolocalización.');
          this.innerHTML = original;
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }

  // Background slideshow — crossfade every 3s
  (function slideshow() {
    var images = [
      'imagenfondo/1.jpg',
      'imagenfondo/2.jpg',
      'imagenfondo/3.jpg',
    ];

    // Preload all images
    images.forEach(function (src) { var p = new Image(); p.src = src; });

    var track = document.getElementById('slideshowTrack');
    if (!track) return;
    var idx = 0;

    // Set first image immediately
    track.style.backgroundImage = 'url(' + images[0] + ')';

    setInterval(function () {
      idx = (idx + 1) % images.length;
      track.style.backgroundImage = 'url(' + images[idx] + ')';
    }, 7000);
  })();

})();
