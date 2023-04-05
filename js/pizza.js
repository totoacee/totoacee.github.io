// Define the menu and prices
const menu = {
  muzza: 1600,
  muzzahuevo: 2000,
  muzzaanchoa: 2000,
  muzzamorrones: 2000,
  mixta: 1900,
  anchoas: 1900,
  jamon: 2000,
  jamonmorrones: 2100,
  jamonpalmitos: 2500,
  jamonanana: 2500,
  jamonhuevo: 2500,
  napo: 2000,
  napohuevo: 2400,
  napojamon: 2400,
  napocompleta: 2500,
  primavera: 2500,
  mediterranea: 2200,
  fugazza: 1600,
  fugazzetta: 2000,
  fugazzettajamon: 2400,
  fugazzettacompleta: 2600,
  fugazzettarellena: 2700,
  calabresa: 2100,
  provolone: 2200,
  provolonejamon: 2400,
  roquefort: 2200,
  roquefortjamon: 2400,
  roqueforthuevo: 2400,
  palmitos: 2200,
  superpalmitos: 2700,
  supercity: 2700,
  cuatroquesos: 2400,
  cuatroest: 2200,
  colesterol: 2500,
  faina: 250,
  unaemp: 240,
  dosemp: 480,
  tresemp: 720,
  cuatroemp: 960,
  mediadocemp: 1440,
  docemp: 2400,
  docymediaemp: 3840,
  dosdocemp: 4800,
  mila: 1600,
  milanapo: 2400,
  milafuga: 2600,
  milajamonmorron: 2700,
  sandwichmila: 1400,
};

// Keep track of the order
let order = {};

// Get references to the HTML elements
const menuEl = document.querySelector("div div .menu");
const orderEl = document.querySelector("div #order");
const totalEl = document.querySelector("#total");

// Add event listener to the Submit button
const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", submitOrder);

// Function to add a pizza to the order
function addToOrder(event) {
  const pizzaName = event.target.value;
  order[pizzaName] = (order[pizzaName] || 0) + 1;

  // Remove any existing li with the same pizzaName
  const existingLi = orderEl.querySelector(`li[data-pizza="${pizzaName}"]`);
  if (existingLi) {
    orderEl.removeChild(existingLi);
  }

  // Add the new li
  const li = document.createElement("li");
  li.dataset.pizza = pizzaName;
  li.textContent = `${order[pizzaName]} x ${pizzaName} - $${menu[pizzaName]}`;
  orderEl.appendChild(li);

  // Update the total
  const total = Object.entries(order).reduce(
    (acc, [pizzaName, qty]) => acc + qty * menu[pizzaName],
    0
  );
  totalEl.textContent = `$${total}`;
}

// Function to remove a pizza from the order
function removeFromOrder(event) {
    console.log("Removing");
    // Get the pizzaName of the clicked button
    const pizzaName = event.target.value;
  
    // Return if the pizzaName is not in the order
    if (!order[pizzaName]) {
      return;
    }
  
    // Remove the pizza from the order
    order[pizzaName]--;
  
    // Remove any existing li with the same pizzaName
    const existingLi = orderEl.querySelector(`li[data-pizza="${pizzaName}"]`);
    if (existingLi) {
      orderEl.removeChild(existingLi);
    }
  
    // Add the new li only if there's at least one pizza left in the order
    if (order[pizzaName] > 0) {
      const li = document.createElement("li");
      li.dataset.pizza = pizzaName;
      li.textContent = `${order[pizzaName]} x ${pizzaName} - $${menu[pizzaName]}`;
      orderEl.appendChild(li);
    }
  
    // Update the total
    const total = Object.entries(order).reduce(
      (acc, [pizzaName, qty]) => acc + qty * menu[pizzaName],
      0
    );
    totalEl.textContent = `$${total}`;
  }
  
  

// Add event listeners to the pizza input buttons
const pizzaInputs = menuEl.querySelectorAll('input[name="pizza"]');
Array.from(pizzaInputs).forEach((input) =>
  input.addEventListener("change", addToOrder)
);

// Add event listener to the Remove button
const removeButton = document.querySelector("#remove");
removeButton.addEventListener("click", function () {
    order = {};
    orderEl.innerHTML = "";
    totalEl.textContent = "$0";
    Array.from(pizzaInputs).forEach((input) =>
  input.checked = false);
  });
  

// Function to submit the order
function submitOrder() {
  // Get the name and address from the form
  const name = document.querySelector('input[name="name"]').value;
  const address = document.querySelector('input[name="address"]').value;

  // Display the confirmation message
  const pizzasOrdered = Object.entries(order)
    .map(([pizzaName, qty]) => `${qty} ${pizzaName}`)
    .join(", ");
  const total = Object.entries(order).reduce(
    (acc, [pizzaName, qty]) => acc + qty * menu[pizzaName],
    0
  );
  const totalMessage = `${pizzasOrdered} - Total: $${total}`;
  var messageEl = document.getElementById("totalM");
  messageEl.textContent = totalMessage;

  const nombreMessage = `Nombre: ${name}`;
  var messageEle = document.getElementById("nombre");
  messageEle.textContent = nombreMessage;

  const direccionMessage = `Direccion: ${address}`;
  var messageElem = document.getElementById("direccion");
  messageElem.textContent = direccionMessage;
  const mapUrl = `https://pizzacity.com.ar/mapa?direccion=${encodeURI(address)}`;
  var messageEleme = document.getElementById("mapa");
  messageEleme.href = mapUrl;
  messageEleme.target = "_blank";
  messageEleme.textContent = "Ver mapa";

  // Reset the order
  order = {};
  orderEl.innerHTML = "";
  totalEl.textContent = "$0";
  document.querySelector('input[name="name"]').value = "";
  document.querySelector('input[name="address"]').value = "";
  Array.from(pizzaInputs).forEach((input) =>
  input.checked = false);
}
