import Button from "./My_Components/Button.js";
import Display from "./My_Components/Display.js";
import "./App.css";
import { useState, useRef } from "react";

function App() {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  let symbols = ["+", "-", "/", "*", "=", "C"];
  let [input_display, set_input_display] = useState("");
  let [total_display, set_total_display] = useState(0);
  let [operator, setOperator] = useState("");
  let first_value = useRef("");
  let second_value = useRef("");
  let answerRef = useRef(0);
  let [first_batch, set_batch_status] = useState(true);
  function reset() {
    set_input_display("");
    set_total_display(0);
    setOperator("");
    first_value.current = "";
    second_value.current = "";
    answerRef = 0;
    set_batch_status(true);
  }
  let handleClick = (num) => {
    if (
      first_batch &&
      numbers.includes(num) &&
      first_value.current.length <= 9
    ) {
      set_input_display((input_display) => (input_display += num.toString()));
      first_value.current += num.toString();
      console.log(first_value.current);
    } else if (
      !first_batch &&
      numbers.includes(num) &&
      second_value.current.length <= 9
    ) {
      set_input_display((input_display) => (input_display += num.toString()));
      second_value.current += num.toString();
      console.log(second_value.current);
    }
    if (symbols.includes(num) && num !== "=") {
      set_batch_status(false);
      setOperator(num);
      set_input_display((input_display) => (input_display += num.toString()));
      if (num === "C") {
        reset();
      }
    }
    if (num === "=") {
      if (operator === "+") {
        set_batch_status(false);
        answerRef.current =
          Number(first_value.current) + Number(second_value.current);
        set_total_display(answerRef.current);
        setOperator("");
        set_input_display("");
        first_value.current = answerRef.current;
        second_value.current = "";
        answerRef.current = 0;
      } else if (operator === "-") {
        set_batch_status(false);
        answerRef.current =
          Number(first_value.current) - Number(second_value.current);
        set_total_display(answerRef.current);
        set_input_display("");
        setOperator("");
        first_value.current = answerRef.current;
        second_value.current = "";
        answerRef.current = 0;
      } else if (operator === "*") {
        set_batch_status(false);
        answerRef.current =
          Number(first_value.current) * Number(second_value.current);
        set_total_display(answerRef.current);
        set_input_display("");
        setOperator("");
        first_value.current = answerRef.current;
        second_value.current = "";
        answerRef.current = 0;
      } else if (operator === "/") {
        set_batch_status(false);
        answerRef.current =
          Number(first_value.current) / Number(second_value.current);
        set_total_display(answerRef.current);
        set_input_display("");
        setOperator("");
        first_value.current = answerRef.current;
        second_value.current = "";
        answerRef.current = 0;
      }
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
          {symbols.map((e) => (
            <Button key={e} num={e} onPress={handleClick} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
