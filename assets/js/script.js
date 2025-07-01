
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const dynamicText = document.getElementById('dynamicText');
const projectContainers = document.querySelectorAll('.project__container');


const projectImages = {
  1: 'https://raw.githubusercontent.com/ViniciusGCP94/validador_De_Cartao_de_Credito/main/assets/images/Valida%C3%A7%C3%A3o-de-Cart%C3%A3o-CAPA.png',
  2: 'https://raw.githubusercontent.com/ViniciusGCP94/piano-simulator/d379b70e323a8f18ca241f0dd1d48f3e0eb6374b/assets/image/Piano-Simulator-Capa-readme.png',
  3: 'https://raw.githubusercontent.com/ViniciusGCP94/jogo-da-memoria/main/assets/images/Jogo-da-Mem%C3%B3ria_finish.png'
};

const projectStates = {};

function initForm() {
  form.addEventListener('submit', handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();
  formStatus.textContent = 'Enviando...';

  setTimeout(() => {
    formStatus.textContent = 'Mensagem enviada com sucesso!';
    form.reset();
  }, 1500);
}


function initDynamicText() {
  const words = ['Web', 'Front-End', 'JavaScript'];
  let wordIndex = 0;

  setInterval(() => {
    wordIndex = (wordIndex + 1) % words.length;
    dynamicText.textContent = words[wordIndex];
  }, 2000);
}


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


function initProjectAnimation(container, wrapper, id, state) {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    wrapper.addEventListener('click', () => handleTouchAnimation(state));
    document.addEventListener('click', (e) => handleOutsideClick(e, container, state));
  } else {
    wrapper.addEventListener('mouseenter', () => handleHoverAnimation(state));
    container.addEventListener('mouseleave', () => handleMouseLeaveAnimation(container, state));
  }
}

function handleTouchAnimation(state) {
  if (state.typed || state.typing) return;
  clearTimeout(state.resetTimeout);
  typeText(state);
}

function handleHoverAnimation(state) {
  if (state.typed || state.typing) return;
  clearTimeout(state.resetTimeout);
  typeText(state);
}

function handleOutsideClick(e, container, state) {
  if (!container.contains(e.target)) {
    resetAnimation(state);
  }
}

function handleMouseLeaveAnimation(container, state) {
  if (container.contains(event.relatedTarget)) return;
  state.resetTimeout = setTimeout(() => resetAnimation(state), 1000);
}

function typeText(state) {
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
      revealImagesAndButtons(state);
    }
  }, 20);
}

function resetAnimation(state) {
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

function revealImagesAndButtons(state) {
  state.stackImages.forEach((img, i) => {
    setTimeout(() => {
      img.style.opacity = '1';
      img.style.transform = 'rotateY(0deg)';
      if (i === state.stackImages.length - 1) {
        setTimeout(() => revealButtons(state), 300);
      }
    }, i * 150);
  });
}

function revealButtons(state) {
  state.buttons.forEach((btn, j) => {
    setTimeout(() => {
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
    }, j * 150);
  });
}


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


function init() {
  initForm();
  initDynamicText();
  initProjectImages();
  initProjects();
  initScrollHeader();
  initMenuToggle();
  initDownload();
}

function initScrollHeader() {
  document.addEventListener('scroll', () => {
    const header = document.querySelector('.mobile__header');
    header.style.background = window.scrollY > 50 ? 'linear-gradient(to right, #000000, #1a1a1a)' : 'transparent';
  });
}

function initMenuToggle() {
  const menuIcon = document.querySelector('.menu-icon');
  const nav = document.querySelector('.mobile__header nav');
  menuIcon.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuIcon.classList.toggle('hidden');
  });

  const closeIcon = document.querySelector('.close__menu');
  closeIcon.addEventListener('click', () => {
    nav.classList.remove('active');
    menuIcon.classList.remove('hidden');
  });
}

function initDownload() {
  document.getElementById("download").addEventListener("click", function (e) {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "/assets/downloads/curriculo-Vinicius_Pereira.pdf";
    link.download = "curriculo-Vinicius_Pereira.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

window.addEventListener('load', init);
window.addEventListener('resize', () => {
  
});
