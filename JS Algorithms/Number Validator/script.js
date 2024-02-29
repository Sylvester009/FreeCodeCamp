const userInput = document.getElementById("user-input");
const result = document.getElementById("results-div");
const checkInputButton = document.getElementById("check-btn");
const clearInputButton = document.getElementById("clear-btn");

checkInputButton.addEventListener("click", () => {
  const userInputValue = userInput.value.trim();

  if (userInputValue === "") {
    alert("Please provide a phone number");
    return;
  }

  const regex =
    /^1?\s*[-\/.]?\s*(\(\d{3}\)|\d{3})[-\/.]?\s*\d{3}[-\/.]?\s*\d{4}$/;

  if (regex.test(userInputValue)) {
    result.textContent = `Valid US number: ${userInputValue}`;
    userInputValue = "";
  } else {
    result.textContent = `Invalid US number: ${userInputValue}`;
  }
});

clearInputButton.addEventListener("click", () => {
  userInput.value = "";
  result.textContent = "";
});
