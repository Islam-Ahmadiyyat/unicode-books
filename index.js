function filterBooks() {
    const query = document.getElementById('book-search').value; // Get the search query
    const bookCards = document.querySelectorAll('.book-div'); // Get all book cards

    bookCards.forEach((card) => {
        const title = card.querySelector('p').textContent; // Get the title of the book
        if (title.includes(query)) {
            card.classList.remove('hidden'); // Show matching books
        } else {
            card.classList.add('hidden'); // Hide non-matching books
        }
    });
}