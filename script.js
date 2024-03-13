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


function submitTicket() {
    updateTotalPrice();
}


async function updateTotalPrice() {
    const baseTicketPrice = 20000;
    const basePerPassengerPrice = 8000;
    const perKgPrice = 100;

    let totalPrice = baseTicketPrice + (passengers.length - 1) * basePerPassengerPrice;

    for (const passenger of passengers) {
        const extraKg = Math.max(passenger.mass - 50, 0);
        totalPrice += extraKg * perKgPrice;
    }

    const currencySelect = document.getElementById("currency");
    const currency = currencySelect.value;
    const totalPriceElement = document.getElementById("totalPrice");

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/8fdf1fccc692fc99120dfd54/latest/${currency}`);
        const data = await response.json();
        const conversionRate = data.conversion_rates.USD; 
        const convertedPrice = totalPrice * conversionRate;
        totalPriceElement.textContent = `Total Price: ${currency === 'USD' ? '$' : '€'}${convertedPrice.toFixed(2)}`;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        totalPriceElement.textContent = `Total Price: Error`;
    }
}


