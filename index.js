const previousText = document.querySelector(".previous");
const currentText = document.querySelector(".current");
const numbers = document.querySelectorAll(".num");
const operator = document.querySelectorAll(".operator");
const deleteBtn = document.querySelector(".delete");
const outputBtn = document.querySelector(".output");
const resetBtn = document.querySelector(".reset");

let previous = previousText.innerText;
let current = currentText.innerText;
let operation;

const reset = () => {
  previous = "";
  current = "";
  operation = undefined;
};

const deleteNum = () => {
  current = current.toString().slice(0, -1);
};

const addNumber = (number) => {
  if (number === "." && current.includes(".")) return;
  current = current.toString() + number.toString();
};

const selectOperation = () => {
  let result;
  let prev = parseFloat(previous);
  let curr = parseFloat(current);
  if (isNaN(prev) || isNaN(curr)) return;

  switch (operation) {
    case "+":
      result = prev + curr;
      break;

    case "-":
      result = prev - curr;
      break;

    case "×":
      result = prev * curr;
      break;

    case "/":
      result = prev / curr;
      break;

    default:
      return;
  }
  current = result;
  operation = undefined;
  previous = "";
  previousText.innerText = "";
};

const operatorCheck = (operate) => {
  if (currentText === "") return;
  if (previousText !== "") {
    selectOperation();
  }
  operation = operate;
  previous = current;
  current = "";
};

const displayNum = () => {
  currentText.innerText = current.toLocaleString("en");
  if (operation !== undefined) {
    previousText.innerText = `${previous} ${operation.toString("en")}`;
  } else {
    previousText.innerText = previous;
  }
};

resetBtn.addEventListener("click", () => {
  reset();
  displayNum();
});

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    addNumber(number.innerText);
    displayNum();
  });
});

deleteBtn.addEventListener("click", () => {
  deleteNum();
  displayNum();
});

operator.forEach((btn) => {
  btn.addEventListener("click", () => {
    operatorCheck(btn.innerText);
    displayNum();
  });
});

outputBtn.addEventListener("click", () => {
  selectOperation();
  displayNum();
});
