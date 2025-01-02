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
function checkCurrentNumber(){
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
function displayCalculation(number){
    if(number.length > 11 && (Number(number) >= 1e11 || Number(number) <=1e-11)) display.textContent = String(Number(number).toExponential(2)).substring(0,11);
    else display.textContent = number.substring(0,11);
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
console.log(Array.from(operators))
numberPad.addEventListener('click', (event) => {
    
    let target = event.target
    let currentNumber = checkCurrentNumber()
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
        let currentNumber = checkCurrentNumber()
        
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
                if(Number(firstNumber < 0)){
                    firstNumber.negative = true;
                }
                secondNumber.value = "0";
                switchNumber();
            }
            else {
                let result = operate(Number(firstNumber.value), Number(secondNumber.value), currentOperator)
                console.log(result)
                displayCalculation(result)
                firstNumber.value = result;
                if(Number(firstNumber < 0)){
                    firstNumber.negative = true;
                }
                secondNumber.value = "0";
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
        console.log(lastButtonNumber)
    })
})
