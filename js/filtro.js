$(document).ready(function() {
  // Ocultar todas las clases al inicio
  $('.clase').hide();
  
  // Mostrar la primera clase por defecto
  $('#yoga').show();

  // Manejar clics en los botones de filtro
  $('.filtro-btn').click(function() {
    // Obtener el target del botón
    const target = $(this).data('target');
    console.log('Target:', target); // Para debug
    
    // Ocultar todas las clases
    $('.clase').hide();
    
    // Mostrar la clase seleccionada
    if (target === 'todos') {
      $('.clase').show();
    } else {
      $(`#${target}`).show();
    }
  });
}); 