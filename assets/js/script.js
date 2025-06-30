// ==============================
// Configurações Iniciais
// ==============================
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const dynamicText = document.getElementById('dynamicText');
const words = ['Web', 'Front-End', 'JavaScript'];
let wordIndex = 0;

const projectImages = {
  1: 'https://raw.githubusercontent.com/ViniciusGCP94/validador_De_Cartao_de_Credito/main/assets/images/Valida%C3%A7%C3%A3o-de-Cart%C3%A3o-CAPA.png',
  2: 'https://raw.githubusercontent.com/ViniciusGCP94/piano-simulator/d379b70e323a8f18ca241f0dd1d48f3e0eb6374b/assets/image/Piano-Simulator-Capa-readme.png',
  3: 'https://raw.githubusercontent.com/ViniciusGCP94/jogo-da-memoria/main/assets/images/Jogo-da-Mem%C3%B3ria_finish.png'
};

const projectStates = {};
const projectContainers = document.querySelectorAll('.project__container');

// ==============================
// Formulário
// ==============================
function initForm() {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    formStatus.textContent = 'Enviando...';

    setTimeout(() => {
      formStatus.textContent = 'Mensagem enviada com sucesso!';
      form.reset();
    }, 1500);
  });
}

// ==============================
// Texto Dinâmico
// ==============================
function initDynamicText() {
  setInterval(() => {
    wordIndex = (wordIndex + 1) % words.length;
    dynamicText.textContent = words[wordIndex];
  }, 2000);
}

// ==============================
// Imagens de Projeto
// ==============================
function initProjectImages() {
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
}

// ==============================
// Animação Geral (Desktop e Mobile)
// ==============================
function initProjectAnimation(container, wrapper, id, state) {
  // Para celular não existe mouseenter, vamos usar toque (touchstart)
  
  // Detecta se é touch device
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    // Ativa animação no toque
    wrapper.addEventListener('click', () => {
      if (state.typed || state.typing) return;

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

    // Para resetar a animação, toque fora do container
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
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
      }
    });

  } else {
    // Desktop: mantém hover normal
    wrapper.addEventListener('mouseenter', () => {
      if (state.typed || state.typing) return;

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

    container.addEventListener('mouseleave', (e) => {
      if (container.contains(e.relatedTarget)) return;

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
      }, 1000);
    });
  }
}

// ==============================
// Inicialização dos Projetos
// ==============================
function initProjects() {
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

    initProjectAnimation(container, wrapper, id, projectStates[id]);
  });
}

// ==============================
// Inicialização Geral
// ==============================
function init() {
  initForm();
  initDynamicText();
  initProjectImages();
  initProjects(); // Remove a condição, executa em todas as telas
}

window.addEventListener('load', init);
window.addEventListener('resize', () => {
  // Pode ajustar se precisar ao redimensionar
});
