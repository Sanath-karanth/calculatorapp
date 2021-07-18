import React, { useState, useEffect } from "react";
import CalculatorKey from "./CalculatorKey";
import "./Calculator.css";

function Calculator() {
  const [prevValue, setPrevValue] = useState(null);
  const [nextValue, setNextValue] = useState("0");
  const [op, setOp] = useState(null);

  useEffect(() => {}, [op, nextValue, prevValue]);

  const CalculatorOperations = {
    "\xf7": (firstValue, secondValue) => firstValue / secondValue,
    "\xd7": (firstValue, secondValue) => firstValue * secondValue,
    "+": (firstValue, secondValue) => firstValue + secondValue,
    "-": (firstValue, secondValue) => firstValue - secondValue,
    "=": (firstValue, secondValue) => secondValue,
  };

  const performOperation = () => {
    let temp = CalculatorOperations[op](
      parseFloat(prevValue),
      parseFloat(nextValue)
    );
    setOp(null);
    setNextValue(String(temp));
    setPrevValue(null);
  };

  const handleNum = (number) => {
    setNextValue(nextValue === "0" ? String(number) : nextValue + number);
  };

  const insertDot = () => {
    if (!/\./.test(nextValue)) {
      setNextValue(nextValue + ".");
    }
  };
  const percentage = () => {
    setNextValue(parseFloat(nextValue) / 100);
    if (prevValue && nextValue === "") {
      setPrevValue(parseFloat(prevValue) / 100);
    }
  };
  const changeSign = () => {
    setNextValue(parseFloat(nextValue) * -1);
  };
  const clearData = () => {
    setNextValue(null);
    setPrevValue(0);
    setOp(null);
  };

  const handleOperation = (value) => {
    console.log(typeof value);
    if (Number.isInteger(value)) {
      handleNum(parseInt(value, 10));
    } else if (value in CalculatorOperations) {
      if (op === null) {
        setOp(value);
        setPrevValue(nextValue);
        setNextValue("");
      }
      if (op) {
        setOp(value);
      }
      if (prevValue && op && nextValue) {
        performOperation();
      }
    } else if (value === "c") {
      clearData();
    } else if (value === "\xB1") {
      changeSign();
    } else if (value === ".") {
      insertDot();
    } else if (value === "%") {
      percentage();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
          <div className="container">
              <div className="Display">
                <p>{prevValue}{op}{nextValue}</p>
              </div>
              <div>
                    <CalculatorKey className="buttonwhite"
                            onClick={clearData}
                            label="c" 
                            keyValue={"c"}>
                    </CalculatorKey>
                    <CalculatorKey className="buttonwhite"
                            onClick={handleOperation} 
                            label="7" 
                            keyValue={"\xB1"}>
                    </CalculatorKey>
                    <CalculatorKey className="buttonwhite"
                            onClick={handleOperation} 
                            label="%" 
                            keyValue={"%"}>
                    </CalculatorKey>
                    <CalculatorKey className="buttonblue"
                            onClick={handleOperation} 
                            label="/" 
                            keyValue={"\xf7"}>
                    </CalculatorKey>
              </div>
              <div>
                    <CalculatorKey className="buttonwhite"
                            onClick={handleOperation}  
                            label="7" 
                            keyValue={7}>
                    </CalculatorKey>
                    <CalculatorKey className="buttonwhite"
                            onClick={handleOperation} 
                            label="8" 
                            keyValue={8}>
                    </CalculatorKey>
                    <CalculatorKey className="buttonwhite" 
                            onClick={handleOperation}
                            label="9" 
                            keyValue={9}>
                    </CalculatorKey>
                    <CalculatorKey className="buttonblue" 
                            onClick={handleOperation}
                            label="x" 
                            keyValue={"\xd7"}>
                    </CalculatorKey>
              </div>
              <div>
                    <CalculatorKey className="buttonwhite" 
                            onClick={handleOperation}
                            label="4" 
                            keyValue={4}>
                    </CalculatorKey>
                    <CalculatorKey className="buttonwhite" 
                            onClick={handleOperation}
                            label="5" 
                            keyValue={5}>
                    </CalculatorKey>
                    <CalculatorKey className="buttonwhite" 
                            onClick={handleOperation}
                            label="6" 
                            keyValue={6}>
                    </CalculatorKey>
                    <CalculatorKey className="buttonblue" 
                            onClick={handleOperation}
                            label="-" 
                            keyValue={"-"}>
                    </CalculatorKey>
              </div>
              <div>
                    <CalculatorKey className="buttonwhite" 
                            onClick={handleOperation}
                            label="1" 
                            keyValue={1}>
                    </CalculatorKey>
                    <CalculatorKey className="buttonwhite" 
                            onClick={handleOperation}
                            label="2" 
                            keyValue={2}>
                    </CalculatorKey>
                    <CalculatorKey className="buttonwhite" 
                            onClick={handleOperation}
                            label="3" 
                            keyValue={3}>
                    </CalculatorKey>
                    <CalculatorKey className="buttonblue" 
                            onClick={handleOperation}
                            label="+" 
                            keyValue={"+"}>
                    </CalculatorKey>
              </div>
              <div>
                    <CalculatorKey className="buttonwhite" 
                            onClick={handleOperation}
                            label="0" 
                            keyValue={0}>
                    </CalculatorKey>
                    <CalculatorKey className="buttonwhite" 
                            onClick={handleOperation}
                            label="." 
                            keyValue={"."}>
                    </CalculatorKey>
                    <CalculatorKey className="buttonbluelong" 
                            onClick={handleOperation}
                            label="=" 
                            keyValue={"="}>
                    </CalculatorKey>
              </div>
          </div>
      </header>
    </div>

    
  );
}

export default Calculator;
