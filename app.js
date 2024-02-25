document.addEventListener('DOMContentLoaded', function () {
  const inputElement = document.getElementById('bookInput');
  const recommendButton = document.getElementById('recommendButton');
  const recommendationsContainer = document.getElementById('recommendations');

  recommendButton.addEventListener('click', function () {
    const bookName = inputElement.value;

    // Send a POST request to the Flask server
    fetch('http://127.0.0.1:5000/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ book_name: bookName }),
    })
      .then(response => response.json())
      .then(data => {
        // Display recommendations in the UI
        const recommended_books = data[0];
        const poster_url = data[1];

        recommendationsContainer.innerHTML = `<p>Recommended Books: ${recommended_books.join(', ')}</p>`;

        // Assuming there is more than one recommendation
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = poster_url[0]; // Adjust the index based on your data structure
        card.appendChild(img);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const productName = document.createElement('div');
        productName.classList.add('product-name');
        productName.textContent = recommended_books[0]; // Adjust the index based on your data structure

        cardContent.appendChild(productName);

        card.appendChild(cardContent);

        // Append the card to the recommendations container
        recommendationsContainer.appendChild(card);
      })
      .catch(error => console.error('Error:', error));
  });
});
