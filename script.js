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
    value1: null,
    value2: null,
    operator: null
}

for (let button of numberButtons) {
    button.addEventListener('click', () => {
        
        const buttonValue = parseInt(button.textContent);
        if (operData.operator === null) {
            operData.value1 = operData.value1 * 10 + buttonValue;
            updateCurrentDisplay(operData.value1);
        }
        if (operData.operator !== null) {
            operData.value2 = operData.value2 * 10 + buttonValue;
            updateCurrentDisplay(operData.value2);        
        }
        console.log(operData.value1, operData.value2);
    })
}

clearButton.addEventListener('click', () => {
    resetOperData();
    updateCurrentDisplay();
    updateLastOperationDisplay();
    console.log('clear');
})

equalButton.addEventListener('click', () => {
    if (operData.value1 === null) {
        updateCurrentDisplay(0);  
        return;
    }
    if (operData.value2 === null) {
        updateCurrentDisplay(operData.value1);
        operData.operator = null;
        return;
    }
    const computeValue = compute();
    updateCurrentDisplay(computeValue);
    resetOperData();
    updateLastOperationDisplay();
    operData.value1 = computeValue;
    console .log('equal');
})

for (let i = 0; i < 4; ++i) {
    operatorButtons[i].addEventListener('click', () => {
        let oper;
        switch (i) {
            case 0: oper = operations.ADD;      break;
            case 1: oper = operations.SUBTRACT; break;
            case 2: oper = operations.MULTIPLY; break;
            case 3: oper = operations.DIVIDE;   break;
        }
        
        if (operData.value1 === null) {
            alert('enter a number please');
            return;
        }

        if (operData.value2 === null ) {
            operData.operator = oper;
            updateLastOperationDisplay();
            updateCurrentDisplay();
            return;
        }

        if (operData.value2 !== null) {
            operData.value1 = compute();
            operData.operator = oper;
            operData.value2 = null;
            updateLastOperationDisplay();
            updateCurrentDisplay();
            return;
        }
        
    })
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

const resetOperData = () => {
    operData.value1 = null;
    operData.value2 = null;
    operData.operator = null;
}

const updateCurrentDisplay = (value) => {
    currentOperationDisplay.textContent = value;
}

const updateLastOperationDisplay = () => {
    let displayMsg = '';
    if (operData.value1 !== null)   displayMsg += operData.value1;
    if (operData.operator !== null) displayMsg += ' ' + operData.operator;
    if (operData.value2 !== null)   displayMsg += ' ' + operData.value2;
    lastOperationDisplay.textContent = displayMsg;
}