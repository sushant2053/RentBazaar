document.addEventListener("DOMContentLoaded", function () {
  // Your API endpoint URL
  const apiUrl = "https://marcconrad.com/uob/tomato/api.php";

  // Fetch data from the API
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          // Process and display the data on your web page
          const dataContainer = document.getElementById("data-container");
          dataContainer.innerHTML = JSON.stringify(data, null, 2);
      })
      .catch(error => {
          console.error("Error fetching data: ", error);
      });
});
