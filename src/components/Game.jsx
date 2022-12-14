import React from 'react'
import Description from './Description.jsx'
import {useState, useEffect} from 'react';
import Die from './Die.jsx'
import '../style.css'
import Popup from './Popup.jsx'
import Confetti from 'react-confetti'


export default function Game() {
    
    const [dice, setDice] = useState(() => createArrayOfDieObjects())
    const [lockedNumber, setLockedNumber] = useState(0)
    const [victory, setVictory] = useState(false)
    const [rolls, setRolls] = useState(0)
    const [time, setTime] = useState(() => {Date.now()})
    const start = Date.now();
    setTimeout(() => {
        const millis = Date.now() - start
        console.log(Math.floor(millis/1000))

    }, 5000)
    const dieElements = dice.map(die => (
         <Die key={die.id} clicked={die.clicked} num={die.num} lockNumber={() => lockNumber(die.id, die.num)}/>
    )
    )
    
    // Helper function to create an array of 10 random numbers
    function randomizeTenNumbers() {
        const randomNumbers = []
        
        for(let i = 0; i < 10; i++){
            var ran = Math.floor(Math.random() * 6) + 1;
              randomNumbers[i] = ran;
        }
        return randomNumbers;
    }
    
    // Helper function to initialise the squares state with 10 square objects containing 10 random     numbers
     function createArrayOfDieObjects() {
      let myId = 0;
      return randomizeTenNumbers().map(n => {
          return {
              id : myId++,
              clicked : false,
              num : n
          }
      })
  } 
  
  // Randomizes all non-frozen numbers
  function rollDice(){
      setRolls(oldRolls => oldRolls+1)
      const randomNums = randomizeTenNumbers()
      setDice(oldDice => {
          return oldDice.map((oldDie, index) => {
              return oldDie.clicked
              ? oldDie
              : {...oldDie, num : randomNums[index]} 
          })
      })
  }
  
  
  useEffect(() => {
      if(dice.filter(d => d.clicked).length == 0){
          setLockedNumber(0);
      }
      if(checkVictory()){
          setVictory(true);
      }
  }, [dice])
  // Locks the number either when it's the first number clicked or when it's equal to the locked-in number
  function lockNumber(id, num){
      

      if(lockedNumber === 0 || num === lockedNumber){
          setLockedNumber(num);
          setDice(oldDice => {
              return oldDice.map(oldDie => {
                     return oldDie.id === id ? { ...oldDie, clicked: !oldDie.clicked } : oldDie
              })
          })
      }
      
      console.log(checkVictory());
  }
  
  function checkVictory(){
      return dice.filter(die => !die.clicked).length === 0;
  }
  
  function newGame(){
      setRolls(0)
      setVictory(false);
      setDice(createArrayOfDieObjects());
  }
  
    return (
        <div className="game_container">
            {victory ? <Confetti className="conf"/>: ""}
            <Popup victory={victory}/>
            <Description />
            <div className="squares_container">
                {dieElements}
            </div>
           {victory ? 
           <button onClick={newGame} className="roll">Start New Game</button>
                    : 
           <button onClick={rollDice} className="roll">Roll</button>
           }
           <div className="info_container">
            <p className="roll_counter">Rolls: {rolls}</p>
        
            </div>
        </div>
    )
}