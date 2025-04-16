$(document).ready(function () {
  $(".header").load("includes/header.html", function (response, status, xhr) {
    if (status === "error") {
      console.error("Error al cargar el header:", xhr.status, xhr.statusText);
    }
  });

  $(".footer").load("includes/footer.html", function (response, status, xhr) {
    if (status === "error") {
      console.error("Error al cargar el footer:", xhr.status, xhr.statusText);
    } else {
      inicializarValidacionFormulario();
    }
  });

  function inicializarValidacionFormulario() {
    const form = document.getElementById('contactoForm');
    if (!form) return;

    const submitBtn = $('#submitBtn');
    const spinner = submitBtn.find('.spinner-border');

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      submitBtn.prop('disabled', true);
      spinner.removeClass('d-none');

      setTimeout(function() {
        spinner.addClass('d-none');
        submitBtn.prop('disabled', false);
        alert('¡Mensaje enviado con éxito!');
        form.reset();
        form.classList.remove('was-validated');
      }, 2000);
    });

    $('.form-control').on('input', function() {
      if (form.classList.contains('was-validated')) {
        $(this).get(0).checkValidity();
      }
    });
  }

  function iniciarContador() {
    let contador = 0;
    const elementoNumero = $(".numero");
    const valorFinal = 500;
    const duracion = 2000;
    const pasos = 50;
    const incremento = valorFinal / pasos;
    const intervalo = duracion / pasos;

    const timer = setInterval(function () {
      contador += incremento;
      if (contador >= valorFinal) {
        elementoNumero.text(valorFinal);
        clearInterval(timer);
        elementoNumero.addClass("completado");
      } else {
        elementoNumero.text(Math.round(contador));
      }
    }, intervalo);
  }

  function esVisible(elemento) {
    const rect = elemento[0].getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight && rect.bottom >= 0;
  }

  $(window).on("scroll", function () {
    const elementoNumero = $(".numero");
    if (!elementoNumero.hasClass("contado") && esVisible(elementoNumero)) {
      elementoNumero.addClass("contado");
      iniciarContador();
    }
  });

  const elementoNumero = $(".numero");
  if (!elementoNumero.hasClass("contado") && esVisible(elementoNumero)) {
    elementoNumero.addClass("contado");
    iniciarContador();
  }

  $('.hero-text').hide().fadeIn(2000);
  $('.hero-text h1').hide().each(function(i) {
    $(this).delay(i * 1000).slideDown(1000);
  });

  // Funcionalidad para la página de clases
  $(document).ready(function() {
    // Inicializar Masonry para cada galería
    $('.galeria-clases').each(function() {
      const $grid = $(this).masonry({
        itemSelector: '.clase-card',
        columnWidth: '.clase-card',
        percentPosition: true,
        gutter: 20
      });

      // Ajustar Masonry al cargar imágenes
      $grid.imagesLoaded().progress(function() {
        $grid.masonry('layout');
      });
    });

    // Mostrar la primera sección por defecto
    $('.clase-section').hide();
    $('.yoga').show();
    
    // Manejar clics en los botones de filtro
    $('.filtro-btn').click(function() {
      const target = $(this).data('target');
      
      // Remover clase active de todos los botones
      $('.filtro-btn').removeClass('active');
      
      // Agregar clase active al botón clickeado
      $(this).addClass('active');
      
      // Ocultar todas las secciones
      $('.clase-section').hide();
      
      // Mostrar la sección correspondiente
      $(target).show();
      
      // Scroll suave a la sección
      $('html, body').animate({
        scrollTop: $(target).offset().top - 100
      }, 500);

      // Recalcular layout de Masonry para la sección activa
      $(target).find('.galeria-clases').masonry('layout');
    });

    // Efecto hover en las tarjetas
    $('.clase-card').hover(
      function() {
        $(this).find('.overlay').stop().fadeIn(300);
      },
      function() {
        $(this).find('.overlay').stop().fadeOut(300);
      }
    );

    // Ajustar Masonry al redimensionar la ventana
    $(window).on('resize', function() {
      $('.galeria-clases').masonry('layout');
    });
  });

  // Funcionalidad para el filtro
  $('input[name="categoria"]').change(function() {
    const categoria = $(this).attr('id');
    
    // Ocultar todas las clases
    $('.clase').hide();
    
    // Mostrar la clase seleccionada
    if (categoria === 'todos') {
      $('.clase').show();
    } else {
      $(`#${categoria}`).show();
    }
  });

  // Inicializar Masonry
  $('.masonry').each(function() {
    $(this).masonry({
      itemSelector: 'img',
      columnWidth: 'img',
      percentPosition: true,
      gutter: 20
    });
  });

  // Mostrar todas las clases al inicio
  $('.clase').show();
});
