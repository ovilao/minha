const carta = document.getElementById('carta');
const abrirBtn = document.getElementById('abrir-btn');
const textoCarta = document.getElementById('texto-carta');
const pergunta = document.getElementById('pergunta');
const simBtn = document.getElementById('sim-btn');
const naoBtn = document.getElementById('nao-btn');
const mensagemNao = document.getElementById('mensagem-nao');
const emojiContainer = document.getElementById('emoji-container');
const coracaoGigante = document.getElementById('coracao-gigante');
const mensagemFinal = document.getElementById('mensagem-final');

// Abrir carta e mostrar texto com digitação
abrirBtn.addEventListener('click', () => {
  carta.classList.add('open');
  abrirBtn.style.display = 'none';

  const texto = 'Te amo meu amor!';
  let i = 0;
  textoCarta.textContent = '';
  function digitar() {
    if (i < texto.length) {
      textoCarta.textContent += texto.charAt(i);
      i++;
      setTimeout(digitar, 80);
    } else {
      pergunta.classList.add('show');
    }
  }
  digitar();
});

// Botão NÃO pula para lugar aleatório dentro do container da pergunta
naoBtn.addEventListener('mouseenter', () => {
  const containerRect = pergunta.getBoundingClientRect();
  const btnWidth = naoBtn.offsetWidth;
  const btnHeight = naoBtn.offsetHeight;

  const maxX = pergunta.clientWidth - btnWidth - 10;
  const maxY = pergunta.clientHeight - btnHeight - 10;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  naoBtn.style.position = 'relative';
  naoBtn.style.left = randomX + 'px';
  naoBtn.style.top = randomY + 'px';
});

naoBtn.addEventListener('click', () => {
  mensagemNao.textContent = 'Ah, você vai me deixar na friendzone? 😢';
  mensagemNao.classList.add('show');
  setTimeout(() => {
    mensagemNao.classList.remove('show');
  }, 3000);
});

// Função que cria emojis subindo animados
function criarEmoji(emoji, delay=0) {
  const span = document.createElement('span');
  span.textContent = emoji;
  span.classList.add('emoji');
  const maxWidth = emojiContainer.clientWidth - 30;
  span.style.left = Math.random() * maxWidth + 'px';
  span.style.animationDuration = (3 + Math.random() * 2) + 's';
  span.style.animationDelay = delay + 's';
  emojiContainer.appendChild(span);

  span.addEventListener('animationend', () => {
    span.remove();
  });
}

// Ao clicar em SIM, iniciar animação dos emojis e coração gigante
simBtn.addEventListener('click', () => {
  pergunta.classList.remove('show');
  mensagemNao.classList.remove('show');

  const emojis = ['❤️','😍','🥰','😘','💖','💘','💕'];
  let delay = 0;
  const totalEmojis = 30;

  for(let i=0; i<totalEmojis; i++) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    criarEmoji(emoji, delay);
    delay += 0.12;
  }

  // Após 4s, mostrar coração gigante e mensagem final
  setTimeout(() => {
    emojiContainer.innerHTML = '';
    coracaoGigante.classList.add('show');

    setTimeout(() => {
      mensagemFinal.classList.add('show');
    }, 1500);

    // Se passar mouse perto do coração, esconde ele e a mensagem final
    coracaoGigante.addEventListener('mousemove', () => {
      coracaoGigante.classList.remove('show');
      mensagemFinal.classList.remove('show');
    });

  }, 4000);
});
