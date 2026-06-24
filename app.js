const calculatorContainer = document.querySelector(".calculator");

const buttonsContainer = document.querySelector(".buttons-container");

const screen = document.querySelector(".screen");

let firstOperand = "";
let secondOperand = "";
let currentOperation = "";

let clearOnNextNumber = false;

const operators = ["+", "-", "*", "/"];

const actions = {
  clear,
  removeLastDigit,
  evaluate,
  operator,
};

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

function operator(value) {

   if (currentOperation !== "" && secondOperand != "") {
      actions.evaluate();
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
    actions.clear();
    return;
  }

  if (target.matches(".btn.delete-btn")) {
    actions.removeLastDigit();
    return;
  }

  if (value === "=") {
    actions.evaluate();
    return;
  }

  if (value === ".") {
    if (firstOperand === "") return;

    if (
      (currentOperation === "" && firstOperand.includes(".")) ||
      (currentOperation !== "" && secondOperand.includes("."))
    ) {
      return;
    }
  }

  if (operators.includes(value)) {

    actions.operator(value);
   
    return;
  }

  if (currentOperation === "") {
    if (clearOnNextNumber) {
      firstOperand = value;
      clearOnNextNumber = false;
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
  console.log("equal");

  if (firstOperand !== "" && secondOperand !== "") {
    const result = operate(currentOperation, firstOperand, secondOperand);
    if (!Number.isFinite(result)) {
      updateDisplay("NaN");
      firstOperand = "";
      secondOperand = "";
      currentOperation = "";
      return "NaN";
    }
    firstOperand = result.toString();
    secondOperand = "";
    currentOperation = "";
    clearOnNextNumber = true;
    updateDisplay(result);
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
