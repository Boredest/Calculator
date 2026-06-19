const calculatorContainer = document.querySelector(".calculator");

const buttonsContainer = document.querySelector(".buttons-container");

const screen = document.querySelector(".screen");

let firstOperand = "";
let secondOperand = "";
let currentOperation = "";

let equalsPressed = false;

const operators = ["+", "-", "*", "/"];

const actions = {
  clear,
  removeLastDigit,
  evaluate,
  operator,
  number,
};

function clear() {
  console.log("Clear");
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

function evaluate() {
  console.log("equal");

  if (firstOperand !== "" && secondOperand !== "") {
    operate(currentOperation, firstOperand, secondOperand);
  }
}

function operator() {}

function number() {}

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
    actions.clear();
    return;
  }

  if (target.matches(".btn.delete-btn")) {
    console.log("DEL");
    actions.removeLastDigit();
    return;
  }

  if (value === "=") {
    actions.evaluate();
    return;
  }

  if (operators.includes(value)) {
    currentOperation = value;
    return;
  }

  if (currentOperation === "") {
    firstOperand += value;
    updateDisplay(firstOperand);
  } else {
    secondOperand += value;
    updateDisplay(secondOperand);
  }
});

generateCalculatorGrid();

function add(x, y) {
  equalsPressed = true;
  x = Number(x);
  y = Number(y);

  const result = x + y;
  firstOperand = result.toString();
  updateDisplay(result);
}

function subtract() {}

function multiply() {}

function divide() {}

function operate(operator, x, y) {
  if (operator === "+") {
    add(x, y);
  }
}

function updateDisplay(result) {
  screen.innerText = result;
}
