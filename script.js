'use strict';

//two methods to select elements by id
let playing = true
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')
const score0 = document.querySelector('#score--0')
const p0CurrentScore = document.getElementById('current--0')
const score1 = document.getElementById('score--1') 
const p1CurrentScore = document.getElementById('current--1')
const dice= document.querySelector('.dice')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const btnNew = document.querySelector('.btn--new')
let currentScore = 0
let activePlayer = 0

const scores = [0,0]
score0.textContent = 0
score1.textContent = 0
dice.classList.add('hidden')

const switchPlayer = function(){
        currentScore = 0
        document.getElementById(`current--${activePlayer}`).textContent = 0
        activePlayer = activePlayer === 0 ? 1 :0
        
        player0.classList.toggle('player--active')
        player1.classList.toggle('player--active')
}

btnRoll.addEventListener('click', function(){
    if(playing){
        const diceNumber = Math.trunc(Math.random()*6) + 1
        dice.classList.remove('hidden')
        dice.src = `dice-${diceNumber}.png`
        
        if(diceNumber!==1){
            currentScore+= diceNumber
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        }else{
            switchPlayer()
        }
    }
})

btnHold.addEventListener('click',function(){
    if(playing){
        scores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        document.getElementById(`current--${activePlayer}`).textContent = 0
        if(scores[activePlayer] >= 100){
            
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            dice.classList.add('hidden')
            playing  = false
        }else{
            switchPlayer()
        }
    }
})

btnNew.addEventListener('click',function(){
    scores[0] = 0
    scores[1] = 0
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')
    document.querySelector(`.player--0`).classList.add('player--active')
    document.querySelector(`.player--1`).classList.remove('player--active')
    currentScore = 0
    activePlayer = 0

    document.getElementById(`score--0`).textContent = 0
    document.getElementById(`current--0`).textContent = 0
    document.getElementById(`score--1`).textContent = 0
    document.getElementById(`current--1`).textContent = 0
    playing = true
})