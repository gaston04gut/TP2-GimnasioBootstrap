$(document).ready(function() {
  // Inicializar AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    offset: 100
  });

  // Inicializar tooltips
  $('[data-bs-toggle="tooltip"]').tooltip();

  // Filtro por tags
  $('input[name="tagFilter"]').change(function() {
    const selectedTag = $(this).attr('id');
    
    // Mostrar todos los artículos si se selecciona "all"
    if (selectedTag === 'all') {
      $('.col-12.col-md-6.col-lg-4').show();
      return;
    }
    
    // Ocultar todos los artículos primero
    $('.col-12.col-md-6.col-lg-4').hide();
    
    // Mostrar solo los artículos con el tag seleccionado
    $(`.col-12.col-md-6.col-lg-4[data-tags="${selectedTag}"]`).show();
  });

  // Sistema de comentarios
  $('.reply-btn').click(function() {
    const commentDiv = $(this).closest('.comment');
    const replyForm = `
      <div class="reply-form mt-3">
        <textarea class="form-control mb-2" placeholder="Escribe tu respuesta..."></textarea>
        <div class="d-flex gap-2">
          <button class="btn btn-primary btn-sm submit-reply">Enviar</button>
          <button class="btn btn-secondary btn-sm cancel-reply">Cancelar</button>
        </div>
      </div>
    `;
    
    if (!commentDiv.find('.reply-form').length) {
      commentDiv.append(replyForm);
    }
  });

  // Cancelar respuesta
  $(document).on('click', '.cancel-reply', function() {
    $(this).closest('.reply-form').remove();
  });

  // Enviar respuesta
  $(document).on('click', '.submit-reply', function() {
    const replyText = $(this).siblings('textarea').val();
    if (replyText.trim()) {
      const replyDiv = `
        <div class="comment mt-3 ms-4" data-aos="fade-up">
          <div class="avatar" data-initial="TU"></div>
          <div class="comment-content">
            <div class="comment-header">
              <strong>Tú</strong>
              <small class="text-muted">ahora</small>
            </div>
            <p>${replyText}</p>
          </div>
        </div>
      `;
      $(this).closest('.reply-form').before(replyDiv).remove();
      // Reinicializar AOS para el nuevo elemento
      AOS.refresh();
    }
  });

  // Sistema de likes
  $('.like-btn').click(function() {
    const likeCount = $(this).find('span');
    const currentLikes = parseInt(likeCount.text());
    
    if ($(this).hasClass('liked')) {
      likeCount.text(currentLikes - 1);
      $(this).removeClass('liked btn-primary').addClass('btn-outline-secondary');
    } else {
      likeCount.text(currentLikes + 1);
      $(this).removeClass('btn-outline-secondary').addClass('liked btn-primary');
    }
  });

  // Generar avatares
  $('.avatar').each(function() {
    const initial = $(this).data('initial');
    $(this).text(initial);
  });
}); 