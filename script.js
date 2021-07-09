const lastOperationDisplay = document.querySelector('.previous-operation');
const currentOperationDisplay = document.querySelector('.current-operation');

const numberButtons = document.querySelectorAll('.calc-button.number');
const operatorButtons = document.querySelectorAll('.calc-button.operator');
const clearButton = document.querySelector('.calc-button.clear');
const equalButton = document.querySelector('.calc-button.equals');

const operations = {
    ADD: 'add',
    SUBTRACT: 'subtract',
    MULTIPLY: 'multiply',
    DIVIDE: 'divide',
}

let operData = {
    value1: 0,
    value2: null,
    operator: null
}

const compute = () => {
    switch (operData.operator) {
        case operations.ADD:      return operData.value1 + operData.value2;
        case operations.SUBTRACT: return operData.value1 - operData.value2;
        case operations.MULTIPLY: return operData.value1 * operData.value2;
        case operations.DIVIDE:   return operData.value1 / operData.value2; // maybe disable dividing by 0
        default:
            alert('undefined opertion type!');
    }
}

for (let button of numberButtons) {
    button.addEventListener('click', () => {
        
        const buttonValue = parseInt(button.textContent);
        if (operData.operator === null) {
            operData.value1 = operData.value1 * 10 + buttonValue;
            currentOperationDisplay.textContent = operData.value1;
        }
        if (operData.operator !== null) {
            operData.value2 = operData.value2 * 10 + buttonValue;
            currentOperationDisplay.textContent = operData.value2;
        }
        console.log(operData.value1, operData.value2);
    })
}

clearButton.addEventListener('click', () => {
    currentOperationDisplay.textContent = null;
    lastOperationDisplay.textContent = null;
    resetOperData();
})

equalButton.addEventListener('click', () => {
    currentOperationDisplay.textContent = compute()
})

const resetOperData = () => {
    operData.value1 = 0;
    operData.value2 = null;
    operData.operator = null;
}
