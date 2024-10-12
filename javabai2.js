let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let memory = 0; // Biến nhớ

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number.toString();
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number.toString() : displayValue + number.toString();
    }
    updateDisplay();
}

function appendDot() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

function appendOperator(nextOperator) {
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = parseFloat(displayValue);
    } else if (operator) {
        const result = calculateResult(firstOperand, parseFloat(displayValue), operator);
        displayValue = String(result);
        firstOperand = result;
    }

    operator = nextOperator;
    waitingForSecondOperand = true;
    updateDisplay();
}

function calculate() {
    if (operator === null || waitingForSecondOperand) return;

    secondOperand = parseFloat(displayValue);
    const result = calculateResult(firstOperand, secondOperand, operator);
    displayValue = String(result);
    firstOperand = result;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function calculateResult(first, second, operator) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return first / second;
        default:
            return second;
    }
}

// Chức năng M+ (cộng vào bộ nhớ)
function memoryAdd() {
    memory += parseFloat(displayValue);
    console.log("Memory:", memory); // Kiểm tra giá trị trong bộ nhớ
}

// Chức năng M- (trừ vào bộ nhớ)
function memorySubtract() {
    memory -= parseFloat(displayValue);
    console.log("Memory:", memory); // Kiểm tra giá trị trong bộ nhớ
}

// Chức năng RM (gọi lại giá trị trong bộ nhớ)
//Người dùng nhấn nút M+ để cộng giá trị hiện tại trên màn hình vào bộ nhớ.
//Người dùng nhấn nút M- để trừ giá trị hiện tại trên màn hình khỏi bộ nhớ.
//Khi người dùng nhấn nút RM, giá trị hiện tại trong bộ nhớ sẽ được hiển thị lên màn hình máy tính.
function recallMemory() {
    displayValue = memory.toString();
    updateDisplay();
}

// Chức năng tính bình phương (x²)
function square() {
    let number = parseFloat(displayValue);
    displayValue = (number * number).toString();
    updateDisplay();
}

// Chức năng tính căn bậc 2 (√)
function squareRoot() {
    let number = parseFloat(displayValue);
    displayValue = Math.sqrt(number).toString();
    updateDisplay();
}
