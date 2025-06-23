import Button from "./My_Components/Button.js";
import Display from "./My_Components/Display.js";
import "./App.css";
import { useState, useRef } from "react";

function App() {
  //
  let numbers = [
    1,
    2,
    "+",
    3,
    4,
    "-",
    5,
    6,
    "/",
    7,
    8,
    "*",
    9,
    0,
    "=",
    "<",
    "C",
  ];
  let [input_display, set_input_display] = useState("");
  let [total_display, set_total_display] = useState(0);
  let [prevAnswer, set_prevAnswer] = useState(0);
  let answerRef = useRef(0);
  // if some changes are already made: git add . git commit -m "Your commit message"
  // git push
  // if lost track in changes: git pull origin main

  let handleClick = (num) => {
    let array_of_numbers = [];
    let array_of_operators = [];
    let element_number = "";

    if (
      input_display.length < 30 &&
      num !== "=" &&
      num !== "<" &&
      num !== "C"
    ) {
      if (prevAnswer) {
        set_input_display((input_display += prevAnswer.toString()));
        set_prevAnswer(0);
      }
      set_input_display((input_display += num.toString()));
    } //this is where the string is being made
    if (num === "<") {
      set_input_display(input_display.slice(0, -1));
    }
    if (num === "=") {
      for (let i = 0; i < input_display.length; i++) {
        if (isNaN(input_display[i])) {
          array_of_numbers.push(Number(element_number));
          element_number = "";
          array_of_operators.push(input_display[i]);
        }
        if (!isNaN(input_display[i])) {
          element_number += input_display[i];
        }
      } //done seggregation between numbers and non_numbers
      array_of_numbers.push(Number(element_number));

      console.log(array_of_numbers);
      console.log(array_of_operators);

      //Now proceed to perform the operations

      answerRef.current = array_of_numbers[0];

      for (let i = 0; i <= array_of_numbers.length; i++) {
        if (array_of_operators[i] === "+") {
          answerRef.current += array_of_numbers[i + 1];
        } else if (array_of_operators[i] === "-") {
          answerRef.current -= array_of_numbers[i + 1];
        } else if (array_of_operators[i] === "*") {
          answerRef.current *= array_of_numbers[i + 1];
        } else if (array_of_operators[i] === "/") {
          answerRef.current /= array_of_numbers[i + 1];
        }
      }

      console.log(answerRef.current);
      set_total_display(answerRef.current);
      set_prevAnswer(answerRef.current);
      answerRef.current = 0;
      set_input_display("");
    } else if (num === "C") {
      array_of_numbers = [];
      array_of_operators = [];
      answerRef.current = 0;
      set_input_display("");
      set_total_display(0);
      set_prevAnswer(0);
    }
  };

  return (
    <>
      <div className="calculator-container">
        <div className="display-container">
          <Display input={input_display} total={total_display} />
        </div>
        <div className="buttons-container">
          {numbers.map((e) => (
            <Button key={e} num={e} onPress={handleClick} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
