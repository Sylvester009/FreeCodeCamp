const inputValue = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const resultValue = document.getElementById("result");

const checkValue = () => {
  const inputText = inputValue.value.trim();
  if (inputText === "") {
    alert("Please input a value");
    return;
  }
  const specialInput = inputText.toLowerCase().replace(/[^a-z0-9]/g, "");
  const newInputValue = specialInput.split("").reverse().join("");

  if (specialInput === newInputValue) {
    resultValue.innerHTML = `${inputText} is a palindrome.`;
  } else {
    resultValue.innerHTML = `${inputText} is not a palindrome.`;
  }

};

checkButton.addEventListener("click", checkValue);
