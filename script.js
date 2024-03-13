let passengers = [];

function addPassenger() {
  const name = document.getElementById("passengerName").value;
  const mass = parseFloat(document.getElementById("passengerMass").value);
  passengers.push({ name, mass });
  updateTotalMass();
  updateTotalPrice();
}

function updateTotalMass() {
  const totalMass = passengers.reduce((acc, passenger) => acc + passenger.mass, 0);
  const submitBtn = document.getElementById("submitBtn");
  const addBtn = document.querySelector("#passengerForm > div > button");
  const warningMessage = document.getElementById("warningMessage");

  if (totalMass > 300) {
    warningMessage.textContent = "Total mass exceeds 300 kg!";
    submitBtn.disabled = true;
    addBtn.disabled = true;
  } else if (totalMass > 250) {
    warningMessage.textContent = "Total mass exceeds 250 kg!";
    submitBtn.disabled = false;
    addBtn.disabled = true;
  } else {
    warningMessage.textContent = "";
    submitBtn.disabled = false;
    addBtn.disabled = false;
  }
}

function updateTotalPrice() {
  const baseTicketPrice = 20000;
  const basePerPassengerPrice = 8000;
  const perKgPrice = 100;

  let totalPrice = baseTicketPrice + (passengers.length - 1) * basePerPassengerPrice;

  for (const passenger of passengers) {
    const extraKg = Math.max(passenger.mass - 50, 0);
    totalPrice += extraKg * perKgPrice;
  }

  const totalPriceElement = document.getElementById("totalPrice");
  totalPriceElement.textContent = `Total Price: €${totalPrice.toFixed(2)}`;
}


function submitTicket() {
  updateTotalPrice();
}

const requestURL = 'https://v6.exchangerate-api.com/v6/8fdf1fccc692fc99120dfd54/latest/USD';



function sendRequest(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json'
    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response)
      } else {
        resolve(xhr.response)
      }
      console.log(xhr.response);
    }
    xhr.onerror = () => {
      reject(xhr.response)
    }
    
    xhr.send();
  })
}


sendRequest('GET', requestURL)
.then(data => console.log(data))
.catch(err => console.log(err))

