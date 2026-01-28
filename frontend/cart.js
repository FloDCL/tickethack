function loadCart() {
  fetch("http://localhost:3000/cart")
    .then((response) => response.json())
    .then((data) => {
      const cartList = document.querySelector("#cart-list");
      const cartFooter = document.querySelector("#cart-footer");

      if (!data.result || data.cart.length === 0) {
        cartList.innerHTML = `
          <div class="empty-msg">
            <p>No tickets in your cart.</p>
            <p>Why not plan a trip?</p>
          </div>`;

        cartFooter.style.display = "none";
        return;
      }

      cartFooter.style.display = "flex";
      cartList.innerHTML = "";
      let total = 0;

      for (let item of data.cart) {
        const time = new Date(item.trip.date).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        cartList.innerHTML += `
          <div class="cart-item">
            <span class="col-route">${item.trip.departure} > ${item.trip.arrival}</span>
            <span class="col-time">${time}</span>
            <span class="col-price">${item.trip.price}€</span>
            <button class="delete-btn" id="${item._id}">X</button>
          </div>`;

        total += item.trip.price;
      }

      document.querySelector("#total-amount").textContent = total;
      updateDeleteCityEventListener();
    });
}

function updateDeleteCityEventListener() {
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

document.querySelector("#btn-purchase").addEventListener("click", function () {
  fetch("http://localhost:3000/bookings", { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        window.location.assign("bookings.html");
      }
    });
});

loadCart();
