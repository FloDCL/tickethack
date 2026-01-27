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
      if (data.result) {
        document.querySelector("#content-right").innerHTML += "";
        for (let trip of data.trips) {
          console.log(trip);
          const time = moment(trip.date).format("HH:mm");
          document.querySelector("#content-right").innerHTML += `
			<div class="cityContainer">
				<p class="name">${departure} > ${arrival} ${time} ${trip.price}€</p>
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
