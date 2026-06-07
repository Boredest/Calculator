const calculatorContainer = document.querySelector(".calculator");

const buttonsContainer = document.querySelector(".buttons-container");

const screen = document.querySelector(".screen");

let firstOperand = "";
let secondOperand = "";
let currentOperation = "";

const operators = ["+", "-", "*", "/"];

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

  if (target.matches(".btn.clear-btn")) {
    firstOperand = "";
    secondOperand = "";
    currentOperation = "";
    screen.innerText = "0";
  } else if (target.matches(".btn.delete-btn")) {
    if (currentOperation === "") {
      firstOperand = firstOperand.slice(0, -1);
      screen.innerText = firstOperand || "0";
    } else {
      secondOperand = secondOperand.slice(0, -1);
      screen.innerText = secondOperand || "0";
    }
  }

  else if(target.innerText === "=") {
     if(firstOperand !== "" && secondOperand !== ""){
      operate(currentOperation, firstOperand, secondOperand);
     }else{
      return;
     }
   
  }

  //check operator
  else if (operators.includes(target.innerText)) {
    currentOperation = target.innerText;
  } else {
    if (currentOperation === "") {
      firstOperand += target.innerText;
      screen.innerText = firstOperand;
      console.log(firstOperand);
    } else {
      secondOperand += target.innerText;
      screen.innerText = secondOperand;
      
    }
  }
});

generateCalculatorGrid();

function add(x, y) {
  console.log(x+y);
}

function subtract() {}

function multiply() {}

function divide() {}

function operate(operator, x, y) {
  add(x,y);
}

function updateDisplay(result) {
  screen.innerText = result;
}
