let a = "";
let b = "";
let op = "";
let override = false;
let decimal = false;

const display = document.querySelector("#display");
const numBtns = document.querySelectorAll(".numBtn");
const opBtns = document.querySelectorAll(".opBtn");
const decBtn = document.querySelector("#decBtn");
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



function updateDisplayOperator (c) {
    if (typeof c === "object") {
        c = this.textContent;
    }
    
    if (op) {
        if (b !== "") {
            a = "" + round(operate(a, op, b));

            // Prevent further computation if divided by zero error occurs
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
    override = false;
    decimal = false;
}

function updateDisplayEqual () {
    if (b !== "") {
        a = "" + round(operate(a, op, b));
        if (override) {
            return;
        }
        
        display.textContent = a;
        op = "";
        b = "";
        override = true;
        decimal = false;
    }
}

function updateDisplayDigit (c) {
    if (typeof c === "object") {
        c = this.textContent;
    }

    if (override) {
        updateDisplayClear();
    }

    display.textContent += c;
    if (a !== "") {
        b += c;
    }
}

function updateDisplayDecimal () {
    if (decimal) {
        return;
    }

    if (override) {
        updateDisplayClear();
    }

    display.textContent += ".";
    if (a !== "") {
        b += "."
    }
    decimal = true;
}

function updateDisplayClear () {
    a = "";
    b = "";
    op = "";
    display.textContent = "";
    override = false;
    decimal = false;
}

function updateDisplayBackspace () {
    if (display.textContent === "") {
        return;
    }

    const expression = display.textContent;
    const lastChar = expression.at(-1);
    display.textContent = expression.slice(0, -1);

    if (lastChar === op) {
        a = "";
        b = "";
        op = "";
        override = false;
        decimal = expression.split("").includes(".");
    }
    else if (a !== "") {
        if (lastChar === ".") {
            decimal = false;
        }
    }
    else {
        if (lastChar === ".") {
            decimal = false;
        }
        else {
            b = b.slice(0, -1);
        }
    }
}



for (let btn of numBtns) {
    btn.addEventListener("click", updateDisplayDigit);
}

for (let btn of opBtns) {
    btn.addEventListener("click", updateDisplayOperator);
}

decBtn.addEventListener("click", updateDisplayDecimal);
eqBtn.addEventListener("click", updateDisplayEqual);
clrBtn.addEventListener("click", updateDisplayClear);
bckBtn.addEventListener("click", updateDisplayBackspace);

document.addEventListener("keydown", function(event) {
    if (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) {
        updateDisplayDigit(event.keyCode - 48);
    }
    else if (event.keyCode === 190 && !event.shiftKey) {
        updateDisplayDecimal();
    }
    else if (event.keyCode === 61 && !event.shiftKey || event.keyCode === 13) {
        updateDisplayEqual();
    }
    else if (event.keyCode === 61 && event.shiftKey) {
        updateDisplayOperator("+");
    }
    else if (event.keyCode === 173 && !event.shiftKey) {
        updateDisplayOperator("-");
    }
    else if (event.keyCode === 56 && event.shiftKey) {
        updateDisplayOperator("*");
    }
    else if (event.keyCode === 191 && !event.shiftKey) {
        updateDisplayOperator("/");
    }
    else if (event.keyCode === 8) {
        updateDisplayBackspace();
    }
    else if (event.keyCode === 46) {
        updateDisplayClear();
    }
})
