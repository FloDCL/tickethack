// Exemple de récupération des trajets
fetch("http://localhost:3000/trips")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // Logique pour afficher les billets
  });
