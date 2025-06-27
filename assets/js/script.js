// FORMULÁRIO
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  formStatus.textContent = 'Enviando...';

  setTimeout(() => {
    formStatus.textContent = 'Mensagem enviada com sucesso!';
    form.reset();
  }, 1500);
});

// TEXTO DINÂMICO
const dynamicText = document.getElementById('dynamicText');
const words = ['Web', 'Front-End', 'JavaScript'];
let index = 0;

setInterval(() => {
  index = (index + 1) % words.length;
  dynamicText.textContent = words[index];
}, 2000);

// IMAGENS DOS PROJETOS
const projectImages = {
  1: 'https://raw.githubusercontent.com/ViniciusGCP94/validador_De_Cartao_de_Credito/main/assets/images/Valida%C3%A7%C3%A3o-de-Cart%C3%A3o-CAPA.png',
  2: 'https://raw.githubusercontent.com/ViniciusGCP94/piano-simulator/d379b70e323a8f18ca241f0dd1d48f3e0eb6374b/assets/image/Piano-Simulator-Capa-readme.png',
  3: 'https://raw.githubusercontent.com/ViniciusGCP94/jogo-da-memoria/main/assets/images/Jogo-da-Mem%C3%B3ria_finish.png'
};

const projectWrappers = document.querySelectorAll('.project__wrapper');

projectWrappers.forEach(wrapper => {
  const id = wrapper.getAttribute('data-id');
  if (projectImages[id]) {
    wrapper.style.background = `url(${projectImages[id]})`;
    wrapper.style.backgroundSize = 'cover';
    wrapper.style.backgroundPosition = 'center';
    wrapper.style.backgroundRepeat = 'no-repeat';
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
    typeInterval: null,
    resetTimeout: null
  };

  // ANIMAÇÃO AO PASSAR O MOUSE
  wrapper.addEventListener('mouseenter', () => {
    const state = projectStates[id];

    if (state.typed || state.typing) return;

    // Cancela reset pendente
    clearTimeout(state.resetTimeout);

    const text = state.description.getAttribute('data-text');
    state.description.textContent = '';
    let index = 0;
    state.typing = true;

    state.typeInterval = setInterval(() => {
      if (index < text.length) {
        state.description.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(state.typeInterval);
        state.typed = true;
        state.typing = false;

        state.stackImages.forEach((img, i) => {
          setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'rotateY(0deg)';

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

  // RESET INDIVIDUAL AO SAIR DO HOVER
  container.addEventListener('mouseleave', (e) => {
    const state = projectStates[id];

    if (container.contains(e.relatedTarget)) return;

    // Inicia timeout para reset individual
    state.resetTimeout = setTimeout(() => {
      clearInterval(state.typeInterval);
      state.description.textContent = '';
      state.typed = false;
      state.typing = false;

      state.stackImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'rotateY(90deg)';
      });

      state.buttons.forEach(btn => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
      });
    }, 1000); // Tempo de espera antes do reset
  });
});

function isMobileDevice() {
  return window.matchMedia("(max-width: 800px)").matches;
}


if (isMobile) {
  wrapper.addEventListener('click', () => {
    const state = projectStates[id];

    // Mostrar tudo direto sem animação de digitação
    state.description.textContent = state.description.getAttribute('data-text');

    state.stackImages.forEach(img => {
      img.style.opacity = '1';
      img.style.transform = 'translateY(0)';
    });

    state.buttons.forEach(btn => {
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
    });
  });

  // Reset no clique fora do container
  document.addEventListener('click', (e) => {
    if (container.contains(e.target)) return;

    const state = projectStates[id];
    state.description.textContent = '';

    state.stackImages.forEach(img => {
      img.style.opacity = '0';
      img.style.transform = 'translateY(20px)';
    });

    state.buttons.forEach(btn => {
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(20px)';
    });
  });
}
