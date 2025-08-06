const display = document.getElementById('display');
const operationDisplay = document.getElementById('operation');
let currentInput = '';
let operator = null;
let firstOperand = null;
let shouldResetDisplay = false;

function appendNumber(number) {
    if (display.textContent === '0' || shouldResetDisplay) {
        display.textContent = number;
        shouldResetDisplay = false;
    } else {
        display.textContent += number;
    }
}

function chooseOperator(op) {
    if (operator !== null) evaluate();
    firstOperand = display.textContent;
    operator = op;
    shouldResetDisplay = true;
    operationDisplay.textContent = `${firstOperand} ${operator}`;
}

function evaluate() {
    if (operator === null || shouldResetDisplay) return;
    let secondOperand = display.textContent;
    let result = 0;
    switch (operator) {
        case '+':
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case '-':
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
        case '*':
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
        case '/':
            if (parseFloat(secondOperand) === 0) {
                display.textContent = 'Error';
                operator = null;
                operationDisplay.textContent = '';
                return;
            }
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
    }
    display.textContent = result;
    operator = null;
    operationDisplay.textContent = '';
}

function clearDisplay() {
    display.textContent = '0';
    currentInput = '';
    operator = null;
    firstOperand = null;
    shouldResetDisplay = false;
    operationDisplay.textContent = '';
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.hasAttribute('data-number')) {
            const num = btn.getAttribute('data-number');
            if (num === '.' && display.textContent.includes('.')) return;
            appendNumber(num);
        } else if (btn.hasAttribute('data-action')) {
            const action = btn.getAttribute('data-action');
            switch (action) {
                case 'add':
                    chooseOperator('+');
                    break;
                case 'subtract':
                    chooseOperator('-');
                    break;
                case 'multiply':
                    chooseOperator('*');
                    break;
                case 'divide':
                    chooseOperator('/');
                    break;
                case 'equals':
                    evaluate();
                    break;
                case 'clear':
                    clearDisplay();
                    break;
            }
        }
    });
}); 