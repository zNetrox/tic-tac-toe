const allCases = document.querySelectorAll('.container button')
const text = document.querySelector('#text')
let lastTry = []
let winner = null

// remplir les cases
const clickCase = function(button) {
    if(button.innerText === '') { // verifie si la case ne contient rien
        // permet de changer entre X et O en fonction du dernier a avoir joué
        if(lastTry[lastTry.length-1] === 'X') {
            text.innerText = "player 1 it's your turn"
            button.innerText = 'O'
            lastTry.push('O')
        } else if(lastTry[lastTry.length-1] === 'O') {
            text.innerText = "player 2 it's your turn"
            button.innerText = 'X'
            lastTry.push('X')
        } else { // premier coup
            text.innerText = "player 2 it's your turn"
            button.innerText = 'X'
            lastTry.push('X')
        }
    }
}

const checkWinner = function() {
    const winConditions = [
        ['a1', 'a2', 'a3'],
        ['b1', 'b2', 'b3'],
        ['c1', 'c2', 'c3'],
        ['a1', 'b1', 'c1'],
        ['a2', 'b2', 'c2'],
        ['a3', 'b3', 'c3'],
        ['a1', 'b2', 'c3'],
        ['a3', 'b2', 'c1'],
    ]

    for(let i = 0; i < winConditions.length; i++) {
        const [cell1, cell2, cell3] = winConditions[i] // recupère chaque combinaison possible et la met dans des variables
        // verifie si un des joueur a une combinaison gagnante
        if(document.getElementById(cell1).innerText === 'X' &&
        document.getElementById(cell2).innerText === 'X' &&
        document.getElementById(cell3).innerText === 'X') {
            winner = 'player 1'
        } else if(document.getElementById(cell1).innerText === 'O' &&
        document.getElementById(cell2).innerText === 'O' &&
        document.getElementById(cell3).innerText === 'O') {
            winner = 'player 2'
        }
    }
    // verifie si il y a un gagnant
    if(winner !== null) {
        text.innerText = `${winner} won the game!`
    } else if( [...document.querySelectorAll('button')].every(cell => cell.innerText !== '') ) { // verifie si toute les cases on etait cocher
        text.innerText = 'no one won'
    }
}

// a chaque bouton cliquer on met a jour les cases et la logique
allCases.forEach((button) => {
    button.addEventListener('click', () => {
        if(winner === null) { // permet de ne peut plus pouvoir cliquer si il y a un vainqueur
            clickCase(button)
            checkWinner()
        }
    })
})

// restart 
document.querySelector('#restart').addEventListener('click', () => {
    winner = null
    lastTry = []
    text.innerText = "player 1 it's your turn"
    allCases.forEach((button) => {
        button.innerText = ''
    })
})