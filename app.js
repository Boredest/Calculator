const calculatorContainer = document.querySelector(".calculator");

const buttonsContainer = document.querySelector(".buttons-container");

const screen = document.querySelector(".screen");

let defaultValue = "0";

let firstOperand = "";
let secondOperand = "";
let currentOperation = "";

let clearOnNextNumber = false;

const operators = ["+", "-", "*", "/"];

function init() {
  screen.innerText = defaultValue;
}

init();

function clear() {
  firstOperand = "";
  secondOperand = "";
  currentOperation = "";
  updateDisplay("0");
}

function removeLastDigit() {
  if (currentOperation === "") {
    firstOperand = firstOperand.slice(0, -1);
    updateDisplay(firstOperand || "0");
  } else {
    secondOperand = secondOperand.slice(0, -1);
    updateDisplay(secondOperand || "0");
  }
}

function handleOperator(value) {
  if (currentOperation !== "" && secondOperand !== "") {
    evaluate();
  }

  currentOperation = value;
}

const buttonArray = [
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
  "+",
];

function generateCalculatorGrid() {
  buttonArray.forEach(function (button) {
    const buttonElement = document.createElement("button");
    buttonElement.innerText = button;
    buttonElement.classList.add("btn");
    buttonsContainer.appendChild(buttonElement);
  });
}

calculatorContainer.addEventListener("mousedown", (event) => {
  let target = event.target;

  if (!target.matches(".btn")) return;

  const value = target.innerText;

  if (target.matches(".btn.clear-btn")) {
    clear();
    return;
  }

  if (target.matches(".btn.delete-btn")) {
    removeLastDigit();
    return;
  }

  if (value === "=") {
    evaluate();
    return;
  }

  if (value === ".") {
    if (currentOperation === "") {
      if (firstOperand.includes(".")) return;
      if (firstOperand === "") {
        firstOperand = "0";
      }
    } else {
      if (secondOperand.includes(".")) return;
      if (secondOperand === "") {
        secondOperand = "0";
      }
    }
  }

  if (operators.includes(value)) {
    if (firstOperand === "") {
      firstOperand = "0";
    }
    handleOperator(value);

    return;
  }

  if (currentOperation === "") {
    if (clearOnNextNumber) {
      firstOperand = value === "." ? "0." : value;
      clearOnNextNumber = false;
    } else if (firstOperand === "0" && value !== ".") {
      firstOperand = value;
    } else {
      firstOperand += value;
    }
    updateDisplay(firstOperand);
  } else {
    secondOperand += value;
    updateDisplay(secondOperand);
  }
});

generateCalculatorGrid();

function evaluate() {
  if (firstOperand !== "" && secondOperand !== "") {
    const result = operate(currentOperation, firstOperand, secondOperand);
    if (handleInvalidNumber(result) === "NaN") return;
    firstOperand = result.toString();
    secondOperand = "";
    currentOperation = "";
    clearOnNextNumber = true;
    if (Number.isInteger(result)) {
      updateDisplay(result.toString());
    } else {
      updateDisplay(result.toFixed(1));
    }
  }
}

function handleInvalidNumber(num) {
  if (!Number.isFinite(num)) {
    updateDisplay("NaN");
    firstOperand = "";
    secondOperand = "";
    currentOperation = "";
    return "NaN";
  }
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(operator, x, y) {
  x = Number(x);
  y = Number(y);
  if (operator === "+") {
    return add(x, y);
  }
  if (operator === "-") {
    return subtract(x, y);
  }

  if (operator === "*") {
    return multiply(x, y);
  }

  if (operator === "/") {
    return divide(x, y);
  }
}

function updateDisplay(result) {
  screen.innerText = result;
}
