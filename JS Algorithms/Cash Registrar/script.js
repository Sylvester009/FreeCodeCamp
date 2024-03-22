let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const changeDue = document.getElementById("change-due");
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const priceScreen = document.getElementById("price-screen");
const cashDrawerDisplay = document.getElementById("cash-drawer-display");

purchaseBtn.addEventListener("click", cashRegister);

function cashRegister() {
  const cashProvided = parseFloat(cash.value);
  const change = cashProvided - price;

  if (change < 0) {
    alert("Customer does not have enough money to purchase the item");
  } else if (Math.abs(change) < 0.01) {
    changeDue.innerHTML = "No change due - customer paid with exact cash";
  } else {
    let finalChangeDue = cashProvided - price;
    let reversedCid = [...cid].reverse();
    let denomination = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
    let result = { status: "OPEN", change: [] };
    let totalCID = parseFloat(
      cid
        .map((total) => total[1])
        .reduce((prev, curr) => prev + curr)
        .toFixed(2)
    );

    if (totalCID < finalChangeDue) {
      return (changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>");
    }

    if (Math.abs(totalCID - finalChangeDue) < 0.01) {
      result.status = "CLOSED";
    }

    for (let i = 0; i < reversedCid.length; i++) {
      if (finalChangeDue > denomination[i] && finalChangeDue > 0) {
        let count = 0;
        let total = reversedCid[i][1];
        while (total > 0 && finalChangeDue >= denomination[i]) {
          total -= denomination[i];
          finalChangeDue = parseFloat((finalChangeDue - denomination[i]).toFixed(2));
          count++;
        }
        if (count > 0) {
          result.change.push([reversedCid[i][0], count * denomination[i]]);
        }
      }
    }
    if (finalChangeDue > 0) {
      return (changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>");
    }

    results(result.status, result.change);
    updateUI(result.change);
  }
}

const results = (status, change) => {
  changeDue.innerHTML = `<p>Status: ${status}</p>`;
  change.forEach((money) => {
    changeDue.innerHTML += `<p>${money[0]}: $${money[1].toFixed(2)}</p>`;
  });
};

const updateUI = (change) => {
  const currencyNameMap = {
    PENNY: "Pennies",
    NICKEL: "Nickels",
    DIME: "Dimes",
    QUARTER: "Quarters",
    ONE: "Ones",
    FIVE: "Fives",
    TEN: "Tens",
    TWENTY: "Twenties",
    "ONE HUNDRED": "Hundreds",
  };
  if (change) {
    change.forEach((changeArr) => {
      const targetArr = cid.find((cidArr) => cidArr[0] === changeArr[0]);
      targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
    });
  }

  cash.value = "";
  priceScreen.textContent = `Total: $${price}`;
  cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid
      .map((money) => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`)
      .join("")}  
  `;
};
