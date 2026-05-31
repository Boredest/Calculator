const container = document.querySelector(".container");

const buttonsContainer= document.querySelector(".buttons-container");

const buttonArray = ["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"];

console.log(buttonsContainer);

buttonArray.forEach(function(button) {
    const buttonElement = document.createElement("button");
    buttonElement.innerText = button;
    buttonElement.classList.add("btn");
    buttonsContainer.appendChild(buttonElement);
});