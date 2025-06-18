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


const wrapper = document.querySelector('.project__wrapper');
const description = document.querySelector('.project__description');
const stackImages = document.querySelectorAll('.list__image__stack img');
const buttons = document.querySelectorAll('.access__button');

let typed = false;

wrapper.addEventListener('mouseenter', () => {
  if (typed) return; 

  //animação de digitação
  const text = description.getAttribute('data-text');
  description.textContent = '';
  let index = 0;

  const typeInterval = setInterval(() => {
    if (index < text.length) {
      description.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(typeInterval);
      typed = true;

      //animação de imagens após a digitação
      stackImages.forEach((img, i) => {
        setTimeout(() => {
          img.style.opacity = '1';
          img.style.transform = 'rotateY(0deg)';

          //animação dos botões após a última imagem
          if (i === stackImages.length - 1) {
            setTimeout(() => {
              buttons.forEach((btn, j) => {
                setTimeout(() => {
                  btn.style.opacity = '1';
                  btn.style.transform = 'translateY(0)';
                }, j * 150);
              });
            }, 300);
          }
        }, i * 150);
      });
    }
  }, 20);
});

      