// Store all the information using Class
class Calculator {
  constructor(previousOperandTxtEl, currentOperandTxtEl) {
    this.previousOperandTxtEl = previousOperandTxtEl;
    this.currentOperandTxtEl = currentOperandTxtEl;
    this.clear();
  }
  // clear all operation
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  //delete
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1); //chopping
  }

  // append => add to screen
  appendNumber(number) {
    // ensuring that only single "." is used
    if (number === "." && this.currentOperand.includes(".")) {
      return;
    }

    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  //choose operation
  chooseOperation(operation) {
    if (this.currentOperand === "") {
      return;
    }

    //if previousoperand is not empty and holds some value, compute and update
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    //we are done opearting so,
    this.previousOperand = this.currentOperand;
    //clearing value
    this.currentOperand = "";
  }

  //compute the operation
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand); //converting string to number
    const current = parseFloat(this.currentOperand);

    //if there is empty value, we dont want to compute
    if (isNaN(prev) || isNaN(current)) {
      return;
    }

    //using switch case to do bunch of operations
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;

      case "-":
        computation = prev - current;
        break;

      case "*":
        computation = prev * current;
        break;

      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    //resets
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  //update the display
  updateDisplay() {
    this.currentOperandTxtEl.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTxtEl.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTxtEl.innerText = "";
    }
  }
}

//Dom

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTxtEl = document.querySelector("[data-previous-operand]");
const currentOperandTxtEl = document.querySelector("[data-current-operand]");

//creating object
const calculator = new Calculator(previousOperandTxtEl, currentOperandTxtEl);

//number Buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
//operation Buttons

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

//equals Button

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

//clear Button

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

//delete Button

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
