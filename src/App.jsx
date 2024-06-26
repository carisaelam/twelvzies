import React from "react";
import Dice from "./Dice.jsx";
import Confetti from "react-confetti";
import { nanoid, random } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice);
  const [twelvzies, setTwelvzies] = React.useState(false);

  const diceElements = dice.map((die) => {
    const randomNumber = Math.ceil(Math.random() * 6);

    return (
      <Dice
        holdDie={() => holdDie(die.id)}
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
      />
    );
  });

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSame = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allSame) {
      setTwelvzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDiceArray = [];
    for (let i = 0; i < 12; i++) {
      newDiceArray.push(generateNewDie());
    }
    return newDiceArray;
  }

  function rollDice() {
    twelvzies
      ? (setDice(allNewDice), setTwelvzies(false))
      : setDice((prevDice) =>
          prevDice.map((die) => {
            return die.isHeld ? die : generateNewDie();
          })
        );
  }

  function holdDie(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main style={{ backgroundColor: twelvzies && "cornflowerblue" }}>
      {twelvzies && <Confetti />}
      <h1 className="title">{twelvzies ? "YOU WIN" : "Twelvzies"}</h1>
      <h2 className="description">
        {twelvzies
          ? ""
          : "Click the numbers to freeze. Roll until all are the same!"}
      </h2>
      <div className="dice__container">{diceElements}</div>
      <button onClick={rollDice} className="roll__dice__button">
        {twelvzies ? "RESET" : "Roll!"}
      </button>
    </main>
  );
}

