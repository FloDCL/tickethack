document.querySelector("#btn-src").addEventListener("click", function () {
  const departure = document.querySelector("#departure").value;
  const arrival = document.querySelector("#arrival").value;
  const date = document.querySelector("#dateValue").value;

  fetch("http://localhost:3000/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ departure, arrival, date }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data reçue :", data);
      if (data.result) {
        const contentRight = document.querySelector("#content-right");
        contentRight.style.alignContent = "start";
        contentRight.innerHTML = "";

        for (let trip of data.trips) {
          //console.log(trip);
          const time = new Date(trip.date).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          });
          document.querySelector("#content-right").innerHTML += `
			    <div class="cityContainer">
                    <span class="trip-route">${trip.departure} > ${trip.arrival}</span>
                    <span class="trip-time">${time}</span>
                    <span class="trip-price">${trip.price}€</span>
                    <button class="addbook" id="${trip._id}">Book</button>
                </div>
					`;
          document.querySelector("#departure").value = "";
          document.querySelector("#arrival").value = "";
        }
      } else {
        document.querySelector("#content-right").innerHTML =
          "<p>No trip found.</p>";
      }
    });
});
