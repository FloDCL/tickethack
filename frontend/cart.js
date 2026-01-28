function loadCart() {
  fetch("http://localhost:3000/cart")
    .then((response) => response.json())
    .then((data) => {
      const cartList = document.querySelector("#cart-list");
      const totalDisplay = document.querySelector("#total-amount");

      if (data.result && data.cart.length > 0) {
        cartList.innerHTML = "";
        let total = 0;

        for (let item of data.cart) {
          const time = new Date(item.trip.date).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          });

          cartList.innerHTML += `
            <div class="cart-item">
              <span>${item.trip.departure} > ${item.trip.arrival}</span>
              <span>${time}</span>
              <span>${item.trip.price}€</span>
              <button class="delete-btn" id="${item._id}">X</button>
            </div>`;

          total += item.trip.price;
        }
        totalDisplay.textContent = total;

        activateDeleteButtons();
      } else {
        cartList.innerHTML = "<p>No tickets in your cart.</p>";
        totalDisplay.textContent = "0";
      }
    });
}

function activateDeleteButtons() {
  const buttons = document.querySelectorAll(".delete-btn");
  for (let btn of buttons) {
    btn.addEventListener("click", function () {
      fetch(`http://localhost:3000/cart/${this.id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            loadCart();
          }
        });
    });
  }
}

loadCart();
