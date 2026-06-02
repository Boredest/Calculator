const calculatorContainer = document.querySelector(".calculator");

const buttonsContainer = document.querySelector(".buttons-container");

const screen = document.querySelector(".screen");

let input = "";

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
  console.log(event.target);
  if (target.matches(".btn.clear-btn")) {
    console.log("CLEAR");
    screen.innerText = "0";
    input = "";
  } else {
    input += event.target.innerText;
    screen.innerText = input;
  }
});

generateCalculatorGrid();

function add(x, y) {
  console.log(x + y);
  return x + y;
}

function subtract() {}

function multiply() {}

function divide() {}

function operate(operator, x, y) {}

function updateDisplay(result) {
  screen.innerText = result;
}
