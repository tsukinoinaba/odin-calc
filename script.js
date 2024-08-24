let a = "";
let b = "";
let op = "";
let override = false;
const display = document.querySelector("#display");
const numBtns = document.querySelectorAll(".numBtn");
const opBtns = document.querySelectorAll(".opBtn");
const eqBtn = document.querySelector("#eqBtn");
const clrBtn = document.querySelector("#clrBtn");


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
        override = true;
        display.textContent = "Do you play Shippu Mahou Daisakusen too?";
    }
    return a / b;
}

function round (n) {
    return Math.round(n * 10**10) / 10**10;
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

function updateDisplayOperator () {
    const c = this.textContent;
    
    if (op) {
        if (b !== "") {
            a = "" + round(operate(a, op, b));
            if (override) {
                return;
            }
        }
        
        display.textContent = a;
    }
        
    else {
        if (display.textContent) {
            a = display.textContent;
        }
        else {
            a = "0";
        }
    }

    op = c;
    b = "";
    display.textContent += c;
}

function updateDisplayEqual () {
    if (b !== "") {
        a = "" + round(operate(a, op, b));
        if (override) {
            return;
        }
        
        display.textContent = a;
        override = true;
    }
}

function updateDisplayDigit () {
    const c = this.textContent;

    if (override) {
        updateDisplayClear();
    }

    display.textContent += c;
    if (a !== "") {
        b += c;
    }
}

function updateDisplayClear () {
    a = "";
    b = "";
    op = "";
    display.textContent = "";
    override = false;
}



for (let btn of numBtns) {
    btn.addEventListener("click", updateDisplayDigit);
}

for (let btn of opBtns) {
    btn.addEventListener("click", updateDisplayOperator);
}

eqBtn.addEventListener("click", updateDisplayEqual);
clrBtn.addEventListener("click", updateDisplayClear);
