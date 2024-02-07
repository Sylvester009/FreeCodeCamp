const numberInput = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const outputResult = document.getElementById("output");

const alertCheck = () => {
  const inputValue = parseInt(numberInput.value);

  if (inputValue === "" || isNaN(inputValue)) {
    outputResult.innerHTML = "Please enter a valid number";
  } else if (inputValue < 0) {
    outputResult.innerHTML = "Please enter a number greater than or equal to 1";
  } else if (inputValue >= 4000) {
    outputResult.innerHTML = "Please enter a number less than or equal to 3999";
  } else {
    const romanAnswer = romanNumeral(inputValue);
    outputResult.innerHTML = romanAnswer;
  }
};

convertButton.addEventListener("click", alertCheck);

const romanNumeral = (value) => {
  const romanFigures = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"];
  const decimalValues = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
  let result = '';

  for (let i = decimalValues.length - 1; i >= 0; i--) {
    while (value >= decimalValues[i]) {
      result += romanFigures[i];
      value -= decimalValues[i];
    }
  }

  return result;
};


numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    alertCheck();
  }
});