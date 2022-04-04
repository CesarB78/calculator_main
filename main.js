const prevOperandText = document.querySelector("[data-prev-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");
const deleteBtn = document.querySelector("[data-delete]");
const resultBtn = document.querySelector("[data-output]");
const resetBtn = document.querySelector("[data-reset]");
const operands = document.querySelectorAll("[data-num]");
const operatorBtn = document.querySelectorAll("[data-operator]");
const links = document.querySelectorAll("link");
const inputs = document.querySelectorAll("input");
let prevOperand = prevOperandText.innerText;
let currentOperand = currentOperandText.innerText;
let operation;

function changeTheme(i) {
  if (i == 0) {
    links[1].setAttribute("href", "");
  } else {
    links[1].setAttribute("href", `theme${i}.css`);
  }
}

function reset() {
  prevOperand = "";
  currentOperand = "";
  operation = undefined;
}

function addNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
}

function displayNum() {
  currentOperandText.innerText = currentOperand.toLocaleString("en");
  if (operation !== undefined) {
    prevOperandText.innerText = `${prevOperand} ${operation.toString("en")}`;
  } else {
    prevOperandText.innerText = prevOperand;
  }
}

function deleteOp() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

function operator(op) {
  console.log(op);

  if (op === "") return;
  if (op !== "") {
    calculate();
  }
  operation = op;
  prevOperand = currentOperand;
  currentOperand = "";
}

function calculate() {
  let result;
  let prev = parseFloat(prevOperand);
  let current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;

    default:
      return;
  }
  currentOperand = result;
  operation = undefined;
  prevOperand = "";
  prevOperandText.innerText = "";
}

resetBtn.addEventListener("click", () => {
  reset();
  displayNum();
});

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    addNumber(operand.innerText);
    displayNum();
  });
});

deleteBtn.addEventListener("click", () => {
  deleteOp();
  displayNum();
});

operatorBtn.forEach((oper) => {
  oper.addEventListener("click", () => {
    operator(oper.innerText);
    displayNum();
  });
});

resultBtn.addEventListener("click", () => {
  calculate();
  displayNum();
});

inputs.forEach((btnInput) => {
  btnInput.addEventListener("click", () => {
    changeTheme(btnInput.value);
  });
});
