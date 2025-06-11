 const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      formStatus.textContent = 'Enviando...';

      setTimeout(() => {
        formStatus.textContent = 'Mensagem enviada com sucesso!';
        form.reset();
      }, 1500);
    });

    const dynamicText = document.getElementById('dynamicText');
    const words = ['Web', 'Front-End', 'JavaScript'];
    let index = 0;

    setInterval(() => {
      index = (index + 1) % words.length;
      dynamicText.textContent = words[index];
    }, 2000);