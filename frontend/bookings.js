function loadBookings() {
  fetch("http://localhost:3000/bookings")
    .then((response) => response.json())
    .then((data) => {
      const bookingsList = document.querySelector("#bookings-list");
      const footerBookings = document.querySelector("#footerBookings");

      if (!data.result || data.bookings.length === 0) {
        bookingsList.innerHTML = `
          <div class="empty-msg">
            <p>No booking yet.</p>
            <p>Why not plan a trip?</p>
          </div>`;

        return;
      }

      bookingsList.innerHTML = "";
      footerBookings.innerHTML = "";

      for (let item of data.bookings) {
        const tripDate = new Date(item.trip.date);
        const time = tripDate.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const now = new Date();
        const diffInMs = tripDate - now;
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

        let departureText = "";
        if (diffInHours > 0) {
          departureText = `Departure in ${diffInHours} hours`;
        } else if (diffInHours === 0) {
          departureText = "Departure in less than an hour";
        } else {
          departureText = "Train already departed";
        }

        bookingsList.innerHTML += `
          <div class="bookings-item">
            <span class="col-route">${item.trip.departure} > ${item.trip.arrival}</span>
            <span class="col-time">${time}</span>
            <span class="col-price">${item.trip.price}€</span>
            <span class="departure-text">${departureText}</span>
          </div>
          `;
      }
      footerBookings.innerHTML += `
          <hr id="separator3">
          <div id="footer_texte">Enjoy your travels with Tickethack!
          </div>
          `;
    });
}

loadBookings();
