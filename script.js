// STEP 1: Cleaned up JS for new streak bar
const coin = document.getElementById('coin3d');
const startText = document.getElementById('startText');
const choicesDiv = document.getElementById('choices');
const choiceButtons = choicesDiv.querySelectorAll('button');
const dingSound = new Audio('ding_converted.mp3');
dingSound.volume = 0.8;
const streakSlots = document.querySelectorAll('.coin-slot');
let streakIndex = 0;
const scoreboard = document.getElementById('scoreboard');
const scoreValue = document.getElementById('scoreValue');
const loseSound = new Audio('losed.mp3');
loseSound.volume = 0.8; // Adjust volume if needed


let gameActive = false;
let isFlipping = false;
let currentStreak = 0;

startText.addEventListener('click', () => {
  const currentScore = parseInt(scoreValue.textContent, 10);

  const startGame = () => {
    gameActive = true;
    isFlipping = false;

    scoreboard.classList.remove('hidden');
    choicesDiv.classList.remove('hidden');
    document.getElementById('streakContainer').classList.remove('hidden');
    startText.classList.add('cursor-not-allowed', 'text-gray-500');
    startText.classList.remove('hover:text-blue-500');
    startText.style.pointerEvents = 'none';
  };

  if (currentScore >= 1) {
    setTimeout(startGame, 500); // 0.5s delay only if score ≥ 1
  } else {
    startGame(); // no delay if first-time or after a failed first guess
  }
});


choiceButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (!gameActive || isFlipping) return;
    isFlipping = true;

    const userChoice = button.getAttribute('data-choice');
    const result = Math.random() < 0.5 ? 'heads' : 'tails';

    const endRotation = result === 'heads' ? 0 : 180;
    const baseSpin = 3 * 360;
    coin.style.transition = 'transform 2s ease-in-out';
    coin.style.transform = `rotateY(${baseSpin + endRotation}deg)`;

    setTimeout(() => {
      if (userChoice === result) {
        dingSound.currentTime = 0;
        dingSound.play();

        if (streakIndex < 10) {
          streakSlots[streakIndex].classList.remove('bg-gray-300');
          streakSlots[streakIndex].classList.add(result === 'heads' ? 'bg-yellow-400' : 'bg-blue-500');
          streakIndex++;
        }

        const dot = document.createElement('div');
        dot.classList.add(result === 'heads' ? 'correct-heads' : 'correct-tails');
        streakBar.appendChild(dot);

        currentStreak++;
scoreValue.textContent = currentStreak;
} else {
  loseSound.currentTime = 0;
  loseSound.play();
  
  gameActive = false;
  choicesDiv.classList.add('hidden');

  

  const shouldDelay = currentStreak >= 1;

  const resetGameUI = () => {
    startText.classList.remove('cursor-not-allowed', 'text-gray-500');
    startText.classList.add('hover:text-blue-500');
    startText.style.pointerEvents = 'auto';

    streakSlots.forEach(slot => {
      slot.classList.remove('bg-yellow-400', 'bg-blue-500');
      slot.classList.add('bg-gray-300');
    });
    streakIndex = 0;
    currentStreak = 0;
    scoreValue.textContent = 0;
  };

  if (shouldDelay) {
    setTimeout(resetGameUI, 500); // delay only if score >= 1
  } else {
    resetGameUI(); // reset instantly if score was 0
  }


      

gameActive = false;
      }

      setTimeout(() => {
        coin.style.transition = 'none';
        coin.style.transform = `rotateY(${endRotation}deg)`;
        isFlipping = false;
        // Add red bounce animation to visible coin face

        
        

        document.querySelector('.coin-wobbler').style.animation = 'none';
        setTimeout(() => {
          document.querySelector('.coin-wobbler').style.animation = 'coinWobble 3s ease-in-out infinite';
        }, 100);
      }, 100);
    }, 2000);
  });
});

