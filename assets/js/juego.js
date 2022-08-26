/**
 * 2C: Two Clubs (Trébol)
 * 2D: Two of Diamonds (Diamantes)
 * 2H: Two of Hearts (Corazones)
 * 2S: Tow of Spades (Espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');

const puntosHTML = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

//Esta función crea un nuevo deck y la revuelve
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let especial of especiales) {
      deck.push(especial + tipo);
    }
  }
  deck = _.shuffle(deck);
  return deck;
};

crearDeck();

//Esta función me permite tomar una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw 'No hay cartas en el deck';
  }
  const carta = deck.pop();
  return carta;
};

//Esta función calcula el valor de la carta sacada
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === 'A' ? 11 : 10) : Number(valor);
};

//Turno computadora
const turnoComputadora = (puntosMin) => {
  do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.alt = 'Carta Blackjack';
    imgCarta.classList.add('carta');

    divCartasComputadora.append(imgCarta);

    if (puntosMin > 21) {
      break;
    }
  } while (puntosComputadora <= puntosMin && puntosMin <= 21);

  setTimeout(() => {
    if (puntosComputadora === puntosMin) {
      alert('Nadie Gana!!');
    } else if (puntosMin > 21) {
      alert('Gano la computadora!');
    } else if (puntosComputadora > 21) {
      alert('Ganaste!');
    } else {
      alert('Computadora Gana!');
    }
  }, 100);
};
//Eventos
btnPedir.addEventListener('click', () => {
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador;

  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.alt = 'Carta Blackjack';
  imgCarta.classList.add('carta');

  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn('Lo siento mucho, perdiste!');
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn('21, genial');
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener('click', () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
  deck = [];
  deck = crearDeck();
  divCartasComputadora.innerHTML = '';
  divCartasJugador.innerHTML = '';
  puntosHTML[0].innerText = 0;
  puntosHTML[1].innerText = 0;
  puntosJugador = 0;
  puntosComputadora = 0;
  btnPedir.disabled = false;
  btnDetener.disabled = false;
});
