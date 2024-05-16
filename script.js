document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');
    const scorePanel = document.getElementById('score-panel');
    const timerPanel = document.getElementById('timer');
    let level = 1;
    let timeLeft = 30; // Kezdő idő 30 másodperc
    let timer;
    let posArrayLength = 20;
    const emojis = ['🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'];

    function populateGame() {
        gameContainer.innerHTML = ''; // Törli az előző állatokat
        let positions = Array.from({ length: posArrayLength }, (_, index) => index).sort(() => Math.random() - 0.5);
        let dogPosition = Math.floor(Math.random() * positions.length); // Véletlenszerű hely a kutyának
        positions.forEach(pos => {
            const pet = document.createElement('div');
            pet.classList.add('pet');
            if (pos === dogPosition) {
                pet.textContent = '🐶';
                pet.dataset.type = 'dog';
            } else {
                let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                pet.textContent = randomEmoji;
                pet.dataset.type = 'other';
            }
            pet.addEventListener('click', function() {
                if (this.dataset.type === 'dog') {
                    if (level === 5) {
                        posArrayLength = 25;
                    }
                    if (level === 10) {
                        window.location.href = "winpage.html"; 
                        
                    } else {
                        level++;
                        scorePanel.textContent = `Szint: ${level}`;
                        timeLeft = Math.max(timeLeft - 5, 5); // Csökkenti az időt minden szintnél, minimum 5 másodperc
                        populateGame();
                    }
                } else {
                    alert('Veszítettél! Próbáld újra.');
                    resetGame();
                }
            });
            gameContainer.appendChild(pet);
        });
        resetTimer();
    }

    function resetGame() {
        posArrayLength = 20;
        level = 1;
        timeLeft = 30;
        scorePanel.textContent = 'Szint: 1';
        populateGame();
    }

    function resetTimer() {
        clearInterval(timer);
        timerPanel.textContent = `Idő: ${timeLeft} másodperc`;
        timer = setInterval(() => {
            timeLeft--;
            timerPanel.textContent = `Idő: ${timeLeft} másodperc`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert('Lejárt az idő! Próbáld újra.');
                resetGame();
            }
        }, 1000);
    }

    populateGame(); // Játék indítása
});
