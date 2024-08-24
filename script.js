let a = "";
let b = "";
let op = "";
const display = document.querySelector("#display");
const numBtns = document.querySelectorAll(".numBtn");
const opBtns = document.querySelectorAll(".opBtn");
const operators = ["+", "-", "*", "/"];

function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    if (b === 0) {
        return "Do you play Shippu Mahou Daisakusen too?";
    }
    return a / b;
}

function operate (a, op, b) {
    a = +a;
    b = +b;
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function updateDisplay() {
    const c = this.textContent;
    
    if (operators.includes(c)) {
        if (op) {
            a = "" + operate(a, op, b);
            display.textContent = a;
        }
        
        else {
            a = display.textContent;
        }

        op = c;
        b = "";
        display.textContent += c;
    }

    else if (c === "=") {
        if (b !== "") {
            display.textContent = "" + operate(a, op, b);
        }
    }

    else {
        if (display.textContent === "0") {
            display.textContent = "";
        }

        display.textContent += c;
        if (a !== "") {
            b += c;
        }
    }
}

for (let btn of numBtns) {
    btn.addEventListener("click", updateDisplay);
}

for (let btn of opBtns) {
    btn.addEventListener("click", updateDisplay);
}

display.textContent = "0";
