import React, { useState } from "react";
import "./App.css";
import Buttons from "./Buttons";

function App() {
  const initialState = {
    prevNumber: "",
    currNumber: "0",
    operations: "",
    isComplete: false,
    expression: "",
  };
  const [state, setstate] = useState(initialState);

  const numbers = [
    { id: "seven", value: 7 },
    { id: "eight", value: 8 },
    { id: "nine", value: 9 },
    { id: "delete", value: "DEL" },
    { id: "four", value: 4 },
    { id: "five", value: 5 },
    { id: "six", value: 6 },
    { id: "add", value: "+" },
    { id: "one", value: 1 },
    { id: "two", value: 2 },
    { id: "three", value: 3 },
    { id: "subtract", value: "-" },
    { id: "zero", value: 0 },
    { id: "decimal", value: "." },
    { id: "divide", value: "/" },
    { id: "multiply", value: "*" },
    { id: "equals", value: "=" },
    { id: "clear", value: "AC" },
  ];

  const handleClick = (e) => {
    const btnValue = e.target.dataset.value;
    let newNumber = "";

    if (state.isComplete) {
      setstate((prevState) => {
        return { ...prevState, currNumber: "" };
      });
    }

    if (!isNaN(Number(btnValue))) {
      setstate((prevState) => {
        let newExp = "";
        
        // Checking the Last operations is EQUALS
        if (lastOperandEquals(prevState)) {
          newExp = "";
        } else {
          newExp = prevState.expression;
        }

        if (
          prevState.currNumber.length === 1 &&
          prevState.currNumber[0] === "0"
        ) {
          newNumber = btnValue;
        } else {
          newNumber = prevState.currNumber + btnValue;
        }

        return {
          ...prevState,
          currNumber: newNumber,
          prevNumber: btnValue,
          isComplete: false,
          expression: newExp,
        };
      });
    }

    if (btnValue === "." && !state.currNumber.split("").includes(btnValue)) {
      setstate((prevState) => {
        return {
          ...prevState,
          currNumber: prevState.currNumber + btnValue,
        };
      });
    }
    if (btnValue === "AC") {
      setstate((prevState) => {
        return {
          ...prevState,
          currNumber: "0",
          prevNumber: "",
          isComplete: true,
          expression: "",
        };
      });
    }

    // OPERATIONS
    if (["+", "-", "*", "/"].includes(btnValue)) {
      setstate((prev) => {
        let newExp = "";
        let operands = "";

        if (lastOperandEquals(prev)) {
          newExp = prev.currNumber;
        } else {
          newExp = prev.expression;
        }

        if (["+", "-", "*", "/"].includes(prev.prevNumber)) {
          const isOperands = (el) => ["+", "-", "*", "/"].includes(el);

          let operandsAlone = prev.expression
            .replace(/\s/g, "")
            .slice(-2)
            .split("");

          if (operandsAlone.every(isOperands)) {
            console.log(`operandsAlone is True`, operandsAlone);

            let newOperand = prev.expression
              .trim()
              .split("")
              .filter((el) => {
                return !["+", "-", "*", "/"].includes(el) && /\S/.test(el);
              });
            console.log(`newOperans`, newOperand);
            newExp = newOperand.join("");

            console.log(`newOperans`, newExp);
          }

          operands = operands + prev.prevNumber;
          console.log(`operands`, operands);
        } else {
          operands = btnValue;
        }

        let expression = "";

        expression =
          prev.expression.length === 0
            ? `${state.currNumber} ${btnValue}`
            : `${newExp} ${state.currNumber} ${btnValue}`;

        return {
          ...prev,
          currNumber: "",
          expression: expression,
          prevNumber: operands,
        };
      });
    }

    // OUTPUT WHEN EQUALS
    if (btnValue === "=") {
      let newExp = `${state.expression} ${state.currNumber}`;
      let calc = eval(newExp).toFixed(4);

      setstate((prev) => {
        return {
          ...prev,
          expression: newExp + btnValue,
          currNumber: +calc,
          isComplete: true,
        };
      });
    }
    console.log(`state`, state);
  };

  const lastOperandEquals = (obj) =>
    obj.isComplete && obj.expression.slice(-1) === "=";

  return (
    <div className="section-center">
      <div className="expression">{state.expression}</div>
      <div className="displayCalc" id="display">
        {state.currNumber}
      </div>
      <div className="container">
        {numbers.map((item, index) => {
          return <Buttons key={index} item={item} handleClick={handleClick} />;
        })}
      </div>
    </div>
  );
}

export default App;
