

// Load the pre-trained JSON file
fetch('Data/books_engine.json')
  .then(response => response.json())
  .then(data => {
    const booksData = [data.bookID, data.Re_title]; // Adjust based on your JSON structure

    if (!Array.isArray(booksData)) {
      console.error('Invalid data structure. Expected an array of books.');
      return;
    }

    // Function to get similar books based on user input
    window.getSimilarBooks = function () {
      const userInput = document.getElementById('bookInput').value;
      const similarBooksList = document.getElementById('similarBooksList');

      // Clear previous recommendations
      similarBooksList.innerHTML = '';

      // Filter similar books
      const similarBooks = filterSimilarBooks(userInput, booksData);

      // Display similar books
      similarBooks.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.Re_title} by ${book.bookID}`;
        similarBooksList.appendChild(listItem);
      });
    };

    // Function to filter similar books
    function filterSimilarBooks(userInput, booksData) {
      // Log the data to understand its structure
      console.log('Books Data:', booksData);

      // Implement your filtering logic here
      // For simplicity, let's assume a basic filter based on book title
      return booksData.filter(book => book.title.includes(userInput));
    }
  })
  .catch(error => console.error('Error loading JSON file:', error));
