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
      // Inicializar la validación del formulario después de cargar el footer
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

      // Mostrar spinner y deshabilitar botón
      submitBtn.prop('disabled', true);
      spinner.removeClass('d-none');

      // Simular envío del formulario
      setTimeout(function() {
        // Ocultar spinner y habilitar botón
        spinner.addClass('d-none');
        submitBtn.prop('disabled', false);

        // Mostrar mensaje de éxito
        alert('¡Mensaje enviado con éxito!');
        
        // Resetear formulario
        form.reset();
        form.classList.remove('was-validated');
      }, 2000);
    });

    // Validación en tiempo real
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
});
