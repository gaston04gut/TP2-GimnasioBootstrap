$(document).ready(function() {
  // Inicializar tooltips de Bootstrap
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltips.forEach(tooltip => {
    new bootstrap.Tooltip(tooltip);
  });

  // Toggle entre precios mensuales y anuales
  $('input[name="planType"]').change(function() {
    if (this.id === 'anual') {
      $('.precio-mensual').addClass('d-none');
      $('.precio-anual').removeClass('d-none');
    } else {
      $('.precio-anual').addClass('d-none');
      $('.precio-mensual').removeClass('d-none');
    }
  });

  // Efecto hover en las cards
  $('.card').hover(
    function() {
      $(this).addClass('shadow-lg').css('transform', 'translateY(-5px)');
    },
    function() {
      $(this).removeClass('shadow-lg').css('transform', 'translateY(0)');
    }
  );

  // Variables para el hover
  let lastHoveredCell = null;
  let lastHoveredIndex = null;

  // Resaltar columna al hacer hover
  $('.table').on('mouseover', 'td, th', function() {
    const index = $(this).index();
    
    // Si es la misma columna, no hacer nada
    if (lastHoveredIndex === index) return;
    
    // Remover resaltado anterior
    if (lastHoveredIndex !== null) {
      $('td:nth-child(' + (lastHoveredIndex + 1) + '), th:nth-child(' + (lastHoveredIndex + 1) + ')')
        .removeClass('table-active');
    }
    
    // No resaltar la primera columna (nombres de características)
    if (index > 0) {
      // Aplicar nuevo resaltado
      $('td:nth-child(' + (index + 1) + '), th:nth-child(' + (index + 1) + ')')
        .addClass('table-active');
      lastHoveredIndex = index;
      lastHoveredCell = $(this);
    }
  });

  // Remover resaltado al salir de la tabla
  $('.table').on('mouseleave', function() {
    if (lastHoveredIndex !== null) {
      $('td:nth-child(' + (lastHoveredIndex + 1) + '), th:nth-child(' + (lastHoveredIndex + 1) + ')')
        .removeClass('table-active');
      lastHoveredIndex = null;
      lastHoveredCell = null;
    }
  });
}); 