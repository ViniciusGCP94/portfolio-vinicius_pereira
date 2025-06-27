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


// URLs das imagens no GitHub
const projectImages = {
  1: 'https://raw.githubusercontent.com/ViniciusGCP94/validador_De_Cartao_de_Credito/main/assets/images/Valida%C3%A7%C3%A3o-de-Cart%C3%A3o-CAPA.png',
  2: 'https://raw.githubusercontent.com/ViniciusGCP94/piano-simulator/d379b70e323a8f18ca241f0dd1d48f3e0eb6374b/assets/image/Piano-Simulator-Capa-readme.png',
  3: 'https://raw.githubusercontent.com/ViniciusGCP94/jogo-da-memoria/main/assets/images/Jogo-da-Mem%C3%B3ria_finish.png'
};

// Seleciona todos os elementos .project__wrapper
const projectWrappers = document.querySelectorAll('.project__wrapper');

// Itera sobre os elementos e aplica a imagem de fundo correspondente
projectWrappers.forEach(wrapper => {
  const id = wrapper.getAttribute('data-id'); // Obtém o ID do projeto
  if (projectImages[id]) {
    wrapper.style.background = `url(${projectImages[id]})`;
    wrapper.style.backgroundSize = 'cover'; // Ajusta o tamanho da imagem
    wrapper.style.backgroundPosition = 'center'; // Centraliza a imagem
    wrapper.style.backgroundRepeat = 'no-repeat'; // Evita repetição da imagem
  }
});

const projectStates = {};

const projectContainers = document.querySelectorAll('.project__container');

projectContainers.forEach(container => {
  const wrapper = container.querySelector('.project__wrapper');
  const description = container.querySelector('.project__description');
  const stackImages = container.querySelectorAll('.list__image__stack img');
  const buttons = container.querySelectorAll('.access__button');

  const id = wrapper.getAttribute('data-id');

  projectStates[id] = {
    typed: false,
    typing: false,
    description,
    stackImages,
    buttons,
    wrapper,
  };

  // ANIMAÇÃO AO PASSAR O MOUSE
  wrapper.addEventListener('mouseenter', () => {
    const state = projectStates[id];
    if (state.typed || state.typing) return;

    const text = state.description.getAttribute('data-text');
    state.description.textContent = '';
    let index = 0;
    state.typing = true;

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        state.description.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(typeInterval);
        state.typed = true;
        state.typing = false;

        // ANIMAÇÃO DAS IMAGENS
        state.stackImages.forEach((img, i) => {
          setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'rotateY(0deg)';

            // ANIMAÇÃO DOS BOTÕES
            if (i === state.stackImages.length - 1) {
              setTimeout(() => {
                state.buttons.forEach((btn, j) => {
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
});

  let scrollTimeout;
  let scrollTriggered = false;

  // RESET AUTOMÁTICO APÓS SCROLL
  window.addEventListener('scroll', () => {
    if (scrollTriggered) return;

    if (window.scrollY >= 60 || window.scrollY <= -60) {
      scrollTriggered = true;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // RESET DO CONTEÚDO
        Object.values(projectStates).forEach(state =>{
          state.description.textContent = '';
          state.typed = false;
        
        

          state.stackImages.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'rotateY(90deg)';
          });

          state.buttons.forEach(btn => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
          });
        })

        scrollTriggered = false;
      }, 5000);
    }
  });