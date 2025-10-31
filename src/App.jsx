import React, { useState } from "react";
import Input from "./Components/Input";
import Buttons from "./Components/Buttons";
import { GlobalStyle } from "./Components/global";
import { Container, Content, Row, Column } from "./styles";

const App = () => {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [operationHistory, setOperationHistory] = useState(""); // guarda toda a operação
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);

  // Adiciona dígitos
  const handAddNumber = (number) => {
    setCurrentNumber((prev) => (prev === "0" ? number : prev + number));
    setOperationHistory((prev) => (prev === "" ? number : prev + number));
  };

  // Limpa tudo
  const handDoClear = () => {
    setCurrentNumber("0");
    setOperationHistory("");
    setFirstNumber(null);
    setOperation(null);
  };

  // Define operação (+, -, *, /)
  const handOperation = (op) => {
    if (!firstNumber) {
      setFirstNumber(currentNumber);
      setCurrentNumber("0");
      setOperation(op);
      setOperationHistory((prev) => prev + " " + op + " ");
    } else {
      // Se já existe operação, calcula antes de definir nova
      handEquals();
      setOperation(op);
      setOperationHistory((prev) => prev + " " + op + " ");
    }
  };

  // Calcula resultado
  const handEquals = () => {
    if (firstNumber && operation) {
      const num1 = Number(firstNumber);
      const num2 = Number(currentNumber);
      let result = 0;

      switch (operation) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "*":
          result = num1 * num2;
          break;
        case "/":
          result = num2 !== 0 ? num1 / num2 : "Erro";
          break;
        default:
          break;
      }

      setCurrentNumber(String(result));
      setFirstNumber(null);
      setOperation(null);
      setOperationHistory((prev) => prev + " = " + result);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Content>
          {/* Mostra operação completa */}
          <Input value={operationHistory || currentNumber} />

          <Row>
            <Buttons label="C" onClick={handDoClear} />
            <Buttons label="/" onClick={() => handOperation("/")} />
            <Buttons label="*" onClick={() => handOperation("*")} />
          </Row>

          <Row>
            <Buttons label="7" onClick={() => handAddNumber("7")} />
            <Buttons label="8" onClick={() => handAddNumber("8")} />
            <Buttons label="9" onClick={() => handAddNumber("9")} />
            <Buttons label="-" onClick={() => handOperation("-")} />
          </Row>

          <Row>
            <Buttons label="4" onClick={() => handAddNumber("4")} />
            <Buttons label="5" onClick={() => handAddNumber("5")} />
            <Buttons label="6" onClick={() => handAddNumber("6")} />
            <Buttons label="+" onClick={() => handOperation("+")} />
          </Row>

          <Row>
            <Buttons label="1" onClick={() => handAddNumber("1")} />
            <Buttons label="2" onClick={() => handAddNumber("2")} />
            <Buttons label="3" onClick={() => handAddNumber("3")} />
            <Buttons label="." onClick={() => handAddNumber(".")} />
          </Row>

          <Row>
            <Buttons label="0" onClick={() => handAddNumber("0")} />
            <Buttons label="=" onClick={handEquals} />
          </Row>

          <Column />
        </Content>
      </Container>
    </>
  );
};

export default App;
