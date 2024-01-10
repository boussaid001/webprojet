
function playGame(gameName) {
  const modal = document.getElementById('gameModal');
  const iframe = document.getElementById('gameIframe');

  switch (gameName) {
    case 'Tetris':
      iframe.src = 'Tetris/404.html';
      break;
    case 'Snake':
      iframe.src = 'Snake/index.html';
      break;
    // Add cases for other games
    case 'MemoryCard':
      iframe.src = 'MemoryCard/index.html';
      break;
    case 'XO':
      iframe.src = 'XO/index.html';
      break;
    case 'RockPaperScissors':
      iframe.src = 'RockPaperScissors/index.html';
      break;
    case 'TwoThousandFortyEight':
      iframe.src = '2048/index.html';
      break;
    case 'space-invaders':
      iframe.src = 'space-invaders/index.html';
      break;
    default:
      iframe.src = '404.html';
      break;
  }

  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
}

function closeModal() {
  const modal = document.getElementById('gameModal');
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}

  
  function closeModal() {
    const modal = document.getElementById('gameModal');
    modal.style.display ='none';
    document.body.classList.remove('modal-open');
  }
  
  function openLoginModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.style.display = 'flex';
  }
  
  function closeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.style.display = 'none';
  }
  
  function authenticate(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (username === 'admin' && password === 'admin') {
      alert('Login successful!');
      closeLoginModal();
      updateWelcomeMessage(username);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }
  
  function updateWelcomeMessage(username) {
    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.textContent = 'Welcome, ' + username + '!';
  }
  
  function searchGames() {
    const searchBar = document.getElementById('searchBar');
    const searchQuery = searchBar.value.toLowerCase();
    const games = document.querySelectorAll('.game');
    let hasMatches = false;
  
    games.forEach(game => {
      const gameName = game.textContent.toLowerCase();
      const gameImageAlt = game.querySelector('img').alt.toLowerCase();
  
      if (gameName.includes(searchQuery) || gameImageAlt.includes(searchQuery)) {
        game.style.display = 'block';
        hasMatches = true;
      } else {
        game.style.display = 'none';
      }
    });
  
    const noResultsMessage = document.getElementById('noResultsMessage');
  
    if (!hasMatches) {
      if (!noResultsMessage) {
        const messageElement = document.createElement('p');
        messageElement.id = 'noResultsMessage';
        messageElement.textContent = 'No matching games found.';
        document.querySelector('main').appendChild(messageElement);
      }
    } else      if (noResultsMessage) {
        noResultsMessage.remove();
      }
    }
  
  