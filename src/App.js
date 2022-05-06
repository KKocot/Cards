import { Card } from "./elements/Card";
import { Button } from "./elements/Button";
import { useState } from "react";
import "./App.css";

const value = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const symbol = ["♠︎", "♥︎", "♣︎", "♦︎"];
const initialDeck = makeDeck();
function makeDeck() {
  let primaryDeck = [];
  for (let i = 0; i < symbol.length; i++) {
    for (let x = 0; x < value.length; x++) {
      let card = { total: x, value: value[x], symbol: symbol[i] };
      primaryDeck.push(card);
    }
  }
  return primaryDeck;
}
const shuffle = (array) => {
  let temp = [...array];
  let currentIndex = temp.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [temp[currentIndex], temp[randomIndex]] = [
      temp[randomIndex],
      temp[currentIndex],
    ];
  }
  return temp;
};
function App() {
  const [data, setData] = useState({
    deckNPC: undefined,
    deckP: undefined,
    cardNPC: undefined,
    cardP: undefined,
    wonNPC: [],
    wonP: [],
    draw: [],
    result: "Press deck to start",
  });
  // const [deckNPC, setDeckNPC] = useState(undefined);
  // const [deckP, setDeckP] = useState(undefined);
  // const [cardP, setCardP] = useState(undefined);
  // const [cardNPC, setCardNPC] = useState(undefined);
  // const [wonP, setWonP] = useState([]);
  // const [wonNPC, setWonNPC] = useState([]);
  // const [draw, setDraw] = useState([]);
  // const [result, setResult] = useState("Press deck to start");

  function slpitDeck() {
    let deck = shuffle(initialDeck);
    const middleIndex = Math.ceil(deck.length / 2);

    // setDeckNPC(deck.slice(0, middleIndex));
    // setDeckP(deck.slice(-middleIndex));
    // setWonNPC([]);
    // setWonP([]);
    // setResult("Click your deckt to put card");
    // setCardNPC(undefined);
    // setCardP(undefined);
    setData((prev) => ({
      ...prev,
      deckNPC: deck.slice(0, middleIndex),
      deckP: deck.slice(-middleIndex),
      wonNPC: [],
      wonP: [],
      result: "Let's play",
      cardNPC: undefined,
      cardP: undefined,
    }));
  }

  function cardToTable(x, y) {
    if (!!x.length && !!y.length) {
      const cardPc = x.pop();
      const cardNPCc = y.pop();
      setData((prev) => ({ ...prev, cardP: cardPc, cardNPC: cardNPCc }));
      // setCardP(cardPc);
      // setCardNPC(cardNPCc);
      checkResults(cardPc, cardNPCc);
    } else if (!x.length || !y.length) {
      if (!x.length && !data.wonP.length) {
        console.log("you lose");
      }
      if (!y.length && !data.wonNPC.length) {
        console.log("NPC lose");
      }
      setData((prev) => ({
        ...prev,
        deckNPC: shuffle((prev) => [...prev, ...data.wonP]),
        deckP: shuffle((prev) => [...prev, ...data.wonNPC]),
        wonP: [],
        wonNPC: [],
      }));
      // setDeckNPC((prev) => shuffle([...prev, ...data.wonP]));
      // setDeckP((prev) => shuffle([...prev, ...data.wonNPC]));
      // setWonNPC([]);
      // setWonP([]);
    }
  }
  function checkResults(x, y) {
    if (x.total > y.total) {
      setData((prev) => ({
        ...prev,
        wonP: (prev) => [...prev, x, y, ...data.draw],
        draw: [],
        result: "You won",
      }));
      // setWonP((prev) => [...prev, x, y, ...data.draw]);
      // setDraw([]);
      // setResult("You won");
    }
    if (x.total < y.total) {
      setData((prev) => ({
        ...prev,
        wonNPC: (prev) => [...prev, x, y, ...data.draw],
        draw: [],
        result: "You lose",
      }));
      // setWonNPC((prev) => [...prev, x, y, ...data.draw]);
      // setDraw([]);
      // setResult("You lose");
    }
    if (x.total == y.total) {
      setData((prev) => ({
        ...prev,
        draw: (prev) => [...prev, x, y],
        result: "Draw! One more time",
      }));
      // setDraw((prev) => [...prev, x, y]);
      // setResult("Draw, pick next card");
    }
  }
  function emptySlot(card) {
    if (card) {
      return card.value + card.symbol;
    }
    return "Empty";
  }
  function noCards(countDeck) {
    if (countDeck) {
      return countDeck.length;
    }
    return "0";
  }

  return (
    <div className="container">
      <header>Card Game</header>
      <div className="card-container">
        <h1>{data.result}</h1>
        <div className="card play-card" onClick={() => slpitDeck()}>
          {data.deckP && "Reset"}
        </div>
      </div>
      <div className="card-container">
        <div>
          <h3>NPC won cards</h3>
          <div className="card"></div>
          <h5>{data.wonNPC.length}</h5>
        </div>
        <div>
          <h3>NPC deck</h3>
          <div className="card"></div>
          <h5>{noCards(data.deckNPC)}</h5>
        </div>
        <Card label={emptySlot(data.cardNPC)} />
        <Card label={emptySlot(data.cardP)} />
        <div>
          <h3>Player deck </h3>
          <div className="card"></div>
          <h5>{noCards(data.deckP)}</h5>
        </div>
        <div>
          <h3>Player won cards </h3>
          <div className="card"></div>
          <h5>{data.wonP.length}</h5>
        </div>
      </div>
      <Button onClick={() => cardToTable(data.deckP, data.deckNPC)} />
    </div>
  );
}

export default App;
