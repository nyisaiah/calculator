function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if(b === 0) return "ERROR";
    else return a/b;
}
function getCurrentNumber(){
    if(firstNumber.active){
        return firstNumber
    }
    else return secondNumber
}

function switchNumber(){
    if (firstNumber.active){
        secondNumber.active = true
        firstNumber.active = false
    }
    else {
        secondNumber.active = false
        firstNumber.active = true
    }
}
function displayCalculation(number) {
    const num = Number(number);

    // Check if the number is an integer or fits within 11 characters as a decimal
    if (
        number.length <= 11 &&
        (Math.abs(num) < 1e11 && Math.abs(num) > 1e-11 || num === 0)
    ) {
        display.textContent = number; // Display as is
    } else if (num % 1 !== 0) {
        // Handle repeating decimals by converting them to fixed-point notation
        const fixedNumber = num.toFixed(11); // Ensure up to 11 decimal places
        if (fixedNumber.length <= 11) {
            display.textContent = fixedNumber; // Display if it fits within 11 characters
        } else {
            display.textContent = fixedNumber.substring(0, 11); // Trim to fit
        }
    } else {
        // Default to scientific notation for very large/small numbers
        display.textContent = num.toExponential(2).substring(0, 11);
    }
}
function operate(a, b, operand){
    switch (operand){
        case "+":
            return String(add(a,b));
        case "-":
            return String(subtract(a,b));
        case "*":
            return String(multiply(a,b));
        case "/":
            return String(divide(a,b));
    }
    
}

function getState(number){
    const num = Number(number.value);
    if (num < 0){
        number.negative = true;
    }
    else number.negative = false;

    if (num % 1 === 0){
        number.decimal = false;
    }
    else number.decimal = true;
}

let firstNumber = {
    name: "first",
    value: "0",
    active: true,
    decimal: false,
    negative: false
}

let secondNumber = {
    name: "second",
    value: "0",
    active: false,
    decimal: false,
    negative: false
}

let currentOperator = ""
let lastButtonNumber = false
const numberPad = document.querySelector(`#number-pad`)
const display = document.querySelector("#display")
const operators = document.querySelectorAll(".operator")
const clearButton = document.querySelector("#clear")
const signButton = document.querySelector("#sign")
console.log(Array.from(operators))
numberPad.addEventListener('click', (event) => {
    
    let target = event.target
    let currentNumber = getCurrentNumber()
    if (currentNumber.value == "0" && target.value != undefined) {
        if(target.value == "."){
            currentNumber.value += target.value;
            displayCalculation(currentNumber.value)
            currentNumber.decimal = true
        }
        else {
            currentNumber.value = target.value;
            displayCalculation(currentNumber.value)
        }
    }
    else if (target.value == "." && currentNumber.decimal){
        return
    }
    else if (target.value == "." && !currentNumber.decimal){
        currentNumber.value += target.value;
        displayCalculation(currentNumber.value)
        currentNumber.decimal = true;
    }
    else if(target.value != undefined && target){
        currentNumber.value += target.value;
        displayCalculation(currentNumber.value)
    }
    console.table(currentNumber)
    lastButtonNumber = true;
    console.log(lastButtonNumber)
})

operators.forEach(function(operator) {
    operator.addEventListener("click", ()=> {
        let currentNumber = getCurrentNumber()
        
        if (currentNumber == firstNumber){
            console.log("working with the first number")
            if(operator.value == "="){
                console.log(operator.value + " was clicked");
            }
            else {
                currentOperator = operator.value;
                switchNumber()
                console.log(currentOperator)
                
            }
        }
        else {
            console.log("working with the second number")
            if(!lastButtonNumber && operator.value != "="){
                currentOperator = operator.value;
                console.log("this case reached")
            }
            else if(operator.value == "="){
                let result = operate(Number(firstNumber.value), Number(secondNumber.value), currentOperator)
                console.log(result)
                displayCalculation(result)
                firstNumber.value = result;
                secondNumber.value = "0";
                getState(firstNumber)
                getState(secondNumber)
                switchNumber();
            }
            else {
                let result = operate(Number(firstNumber.value), Number(secondNumber.value), currentOperator)
                console.log(result)
                displayCalculation(result)
                firstNumber.value = result;
                secondNumber.value = "0";
                getState(firstNumber)
                getState(secondNumber)
                currentOperator = operator.value;

            }
        }

    
        if(operator.value == "="){
            console.log(operator.value + " was clicked");
        }
        else {
            console.log(currentNumber.value)
        }
        lastButtonNumber = false;
        console.table(getCurrentNumber())
    })
})

clearButton.addEventListener('click', () => {
      firstNumber.name = "first";
      firstNumber.value = "0";
      firstNumber.active = true;
      firstNumber.decimal = false;
      firstNumber.negative = false;
  
      secondNumber.name = "second";
      secondNumber.value = "0";
      secondNumber.active = false;
      secondNumber.decimal = false;
      secondNumber.negative = false;

    displayCalculation(firstNumber.value)
})

signButton.addEventListener('click',() => {
    let currentNumber = getCurrentNumber()
    
    if (currentNumber.value == 0) return;

    else if(currentNumber.negative){
        currentNumber.negative = false
        currentNumber.value = currentNumber.value.substring(1)
        displayCalculation(currentNumber.value)
    }

    else {
        currentNumber.negative = true
        currentNumber.value = "-" + currentNumber.value
        displayCalculation(currentNumber.value)
    }
    console.table(currentNumber)
}) 