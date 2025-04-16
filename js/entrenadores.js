$(document).ready(function() {
  // Efecto flip en las tarjetas
  $('.flip-card').hover(
    function() {
      $(this).find('.flip-card-inner').css('transform', 'rotateY(180deg)');
    },
    function() {
      $(this).find('.flip-card-inner').css('transform', 'rotateY(0deg)');
    }
  );

  // Animación de las barras de progreso
  $('.progress-bar').each(function() {
    const value = $(this).attr('aria-valuenow');
    $(this).animate({
      width: value + '%'
    }, 1500);
  });

  // Sistema de rating con estrellas
  $('.rating input').hide();
  
  $('.rating label').hover(
    function() {
      const starValue = $(this).prev('input').val();
      const ratingGroup = $(this).closest('.rating');
      
      // Resaltar estrellas hasta la actual
      ratingGroup.find('label').each(function(index) {
        if (index < starValue) {
          $(this).css('color', 'gold');
        } else {
          $(this).css('color', '#ccc');
        }
      });
    },
    function() {
      const ratingGroup = $(this).closest('.rating');
      const checkedInput = ratingGroup.find('input:checked');
      
      // Restaurar color según la selección actual
      if (checkedInput.length) {
        const checkedValue = checkedInput.val();
        ratingGroup.find('label').each(function(index) {
          if (index < checkedValue) {
            $(this).css('color', 'gold');
          } else {
            $(this).css('color', '#ccc');
          }
        });
      } else {
        ratingGroup.find('label').css('color', '#ccc');
      }
    }
  );

  $('.rating input').change(function() {
    const ratingGroup = $(this).closest('.rating');
    const value = $(this).val();
    
    // Actualizar color de las estrellas
    ratingGroup.find('label').each(function(index) {
      if (index < value) {
        $(this).css('color', 'gold');
      } else {
        $(this).css('color', '#ccc');
      }
    });
  });
}); 