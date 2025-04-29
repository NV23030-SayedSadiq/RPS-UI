// Initialize scores
let humanScore = 0;
let computerScore = 0;
const winningScore = 5;
let gameOver = false;

// DOM elements
const humanScoreDisplay = document.getElementById('human-score');
const computerScoreDisplay = document.getElementById('computer-score');
const roundResult = document.getElementById('round-result');
const message = document.getElementById('message');
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resetBtn = document.getElementById('reset-button');

// Add event listeners to buttons
rockBtn.addEventListener('click', () => playRound('rock'));
paperBtn.addEventListener('click', () => playRound('paper'));
scissorsBtn.addEventListener('click', () => playRound('scissors'));
resetBtn.addEventListener('click', resetGame);

// Generate computer's choice
function getComputerChoice() {
    const randomNum = Math.random();
    if (randomNum < 0.33) {
        return "rock";
    } else if (randomNum < 0.66) {
        return "paper";
    } else {
        return "scissors";
    }
}

// Play a single round
function playRound(humanChoice) {
    // Don't do anything if game is over
    if (gameOver) return;

    const computerChoice = getComputerChoice();
    
    // Display choices
    message.textContent = `You chose ${humanChoice}, Computer chose ${computerChoice}`;
    
    // Determine winner of round
    if (humanChoice === computerChoice) {
        roundResult.textContent = "It's a draw!";
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        roundResult.textContent = `You win this round! ${capitalize(humanChoice)} beats ${computerChoice}`;
        humanScore++;
        humanScoreDisplay.textContent = humanScore;
    } else {
        roundResult.textContent = `You lose this round! ${capitalize(computerChoice)} beats ${humanChoice}`;
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
    }
    
    // Check if game is over
    if (humanScore >= winningScore || computerScore >= winningScore) {
        endGame();
    }
}

// Helper function to capitalize first letter
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// End game and display final result
function endGame() {
    gameOver = true;
    
    if (humanScore > computerScore) {
        message.textContent = "Congratulations! You won the game!";
    } else {
        message.textContent = "Sorry, you lost the game. Better luck next time!";
    }
    
    // Disable choice buttons
    setButtonsEnabled(false);
    
    // Show reset button
    resetBtn.style.display = 'block';
}

// Reset the game
function resetGame() {
    humanScore = 0;
    computerScore = 0;
    gameOver = false;
    
    // Reset displays
    humanScoreDisplay.textContent = '0';
    computerScoreDisplay.textContent = '0';
    roundResult.textContent = '';
    message.textContent = 'Choose rock, paper, or scissors to start the game!';
    
    // Re-enable buttons
    setButtonsEnabled(true);
    
    // Hide reset button
    resetBtn.style.display = 'none';
}

// Helper to enable/disable buttons
function setButtonsEnabled(enabled) {
    rockBtn.disabled = !enabled;
    paperBtn.disabled = !enabled;
    scissorsBtn.disabled = !enabled;
    
    // Visual feedback for disabled buttons
    const buttons = [rockBtn, paperBtn, scissorsBtn];
    buttons.forEach(btn => {
        if (enabled) {
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        } else {
            btn.style.opacity = '0.5';
            btn.style.cursor = 'default';
        }
    });
}

// Initialize the game with a welcome message
message.textContent = 'Choose rock, paper, or scissors to start the game!';
