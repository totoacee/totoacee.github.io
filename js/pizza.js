// Define the menu and prices
const menu = {
  muzza: 1500,
  muzzahuevo: 1900,
  muzzaanchoa: 1900,
  muzzamorrones: 1900,
  mixta: 1800,
  anchoas: 1800,
  jamon: 1900,
  jamonmorrones: 2000,
  jamonpalmitos: 2400,
  jamonanana: 2400,
  jamonhuevo: 2400,
  napo: 1900,
  napohuevo: 2300,
  napojamon: 2300,
  napocompleta: 2400,
  primavera: 2400,
  mediterranea: 2100,
  fugazza: 1500,
  fugazzetta: 1900,
  fugazzettajamon: 2300,
  fugazzettacompleta: 2500,
  fugazzettarellena: 2600,
  calabresa: 2000,
  provolone: 2100,
  provolonejamon: 2300,
  roquefort: 2100,
  roquefortjamon: 2300,
  roqueforthuevo: 2300,
  palmitos: 2100,
  superpalmitos: 2600,
  supercity: 2600,
  cuatroquesos: 2300,
  cuatroest: 2100,
  colesterol: 2400,
  faina: 200,
  unaemp: 200,
  dosemp: 400,
  tresemp: 600,
  cuatroemp: 800,
  mediadocemp: 1200,
  docemp: 2200,
  docymediaemp: 3400,
  dosdocemp: 4400,
  mila: 1600,
  milanapo: 2300,
  milafuga: 2400,
  milajamonmorron: 2500,
  sandwichmila: 1300,
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
