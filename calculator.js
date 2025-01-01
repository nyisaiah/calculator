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

let firstNumber = {
    value: "0",
    active: true,
    decimal: false,
    negative: false
}

let secondNumber = {
    value: "0",
    active: false,
    decimal: false,
    negative: false
}

let currentOperator = ""
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
            display.textContent += target.value;
            currentNumber.decimal = true
        }
        else {
            currentNumber.value = target.value;
            display.textContent = target.value;
        }
    }
    else if (target.value == "." && currentNumber.decimal){
        return
    }
    else if (target.value == "." && !currentNumber.decimal){
        display.textContent += target.value;
        currentNumber.value += target.value;
        currentNumber.decimal = true;
    }
    else if(target.value != undefined && target){
        display.textContent += target.value;
        currentNumber.value += target.value;
    }
    console.table(currentNumber)
})
