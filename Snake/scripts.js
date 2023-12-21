// Game Variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let highScore = 0;
let gameRunning = false;

// DOM Elements
const gameBoard = document.getElementById('game');
const startBtn = document.getElementById('startBtn');
const endBtn = document.getElementById('endBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');

// Game Functions
function drawSnake() {
    gameBoard.innerHTML = '';
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
}

function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1
    };
}

function checkCollision() {
    if (
        snake[0].x < 1 ||
        snake[0].x > gridSize ||
        snake[0].y < 1 ||
        snake[0].y > gridSize ||
        snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
    ) {
        endGame();
    }
}

function updateGame() {
    if (!gameRunning) return;
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
    setTimeout(updateGame, 200); // Adjust the speed of the game here
}

function startGame() {
    if (gameRunning) return;
    snake = [{ x: 10, y: 10 }];
    score = 0;
    scoreElement.textContent = score;
    generateFood();
    gameRunning = true;
    updateGame();
}

function endGame() {
    gameRunning = false;
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
    }
}

// Event Listeners for Buttons
startBtn.addEventListener('click', startGame);
endBtn.addEventListener('click', endGame);
pauseBtn.addEventListener('click', pauseGame);
restartBtn.addEventListener('click', restartGame);

// Keyboard Controls

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && dy !== 1) {
        e.preventDefault(); // Prevent the default action
        dx = 0; dy = -1; // Up arrow key
    } else if (e.key === 'ArrowDown' && dy !== -1) {
        e.preventDefault(); // Prevent the default action
        dx = 0; dy = 1; // Down arrow key
    } else if (e.key === 'ArrowLeft' && dx !== 1) {
        e.preventDefault(); // Prevent the default action
        dx = -1; dy = 0; // Left arrow key
    } else if (e.key === 'ArrowRight' && dx !== -1) {
        e.preventDefault(); // Prevent the default action
        dx = 1; dy = 0; // Right arrow key
    }
});


// Additional Functions
function pauseGame() {
    gameRunning = !gameRunning;
    pauseBtn.textContent = gameRunning ? 'Pause' : 'Resume';
    if (gameRunning) {
        updateGame();
    }
}

function restartGame() {
    if (!gameRunning) {
        startGame();
    }
}

// Call startGame() by default or any other initial setup you might need
startGame();
