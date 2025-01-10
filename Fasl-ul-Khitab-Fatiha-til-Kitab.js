let pages = [];

let currentPage = 1;

async function loadPages() {
    try {
        const response = await fetch('Fasl-ul-Khitab-Fatiha-til-Kitab.json'); // Replace with your JSON file path
        const data = await response.json();
        pages = data; // Store the JSON objects in the `pages` array
        renderPage(currentPage);
    } catch (error) {
        console.error("Error loading pages:", error);
    }
}

// Go to the first page
function goToFirstPage() {
    currentPage = 1; // Set the current page to 1 (first page)
    renderPage(currentPage); // Render the first page
}

// Go to the last page
function goToLastPage() {
    currentPage = pages.length; // Set the current page to the last page
    renderPage(currentPage); // Render the last page
}

function renderPage(pageNumber) {
    const textContainer = document.getElementById('text-container');
    const page = pages.find(p => p.pageNo === pageNumber);
    textContainer.innerHTML = `<p>${page ? page.pageText : 'Page not found'}</p>`;
    //textContainer.innerHTML = `<p>${pages[pageNumber - 1]}</p>`;
    //document.getElementById('page-info').textContent = `Page ${pageNumber}`;

    // Update the page number input field
    document.getElementById('page-number-search').value = pageNumber;

    // Enable/disable pagination buttons
    document.getElementById('prev').classList.toggle('disabled', pageNumber === 1);
    document.getElementById('next').classList.toggle('disabled', pageNumber === pages.length);
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
}

function nextPage() {
    if (currentPage < pages.length) {
        currentPage++;
        renderPage(currentPage);
    }
}

function handleEnterKey(event) {
    if (event.key === "Enter") {
        handlePageNumberSearch();
    }
}

function handlePageNumberSearch() {
    const pageNo = parseInt(document.getElementById('page-number-search').value, 10); // Get page number
    if (!isNaN(pageNo)) {
        currentPage = pageNo; // Update the current page
        renderPage(pageNo);
    }
}

//function handleSearch() {
  //  const query = document.getElementById('search').value;
    //const textContainer = document.getElementById('text-container');
//
  //  let found = false;
    //pages.forEach((page) => {
      //  if (page.pageText.includes(query)) {
        //    currentPage = page.pageNo;
          //  renderPage(currentPage);
            //found = true;
        //}
    //});

    function handleSearch() {
        const query = document.getElementById('search').value.trim(); // Get the search query from input field
        const textContainer = document.getElementById('text-container'); // Reference to where the pages or text are displayed
    
        let found = false; // Flag to track if any match is found
        let results = []; // Store all the matching pages
    
        // Clear the page number input field
        document.getElementById('page-number-search').value = "";

        // Loop through all pages to find matches
        pages.forEach((page) => {
            if (page.pageText.includes(query)) {
                // Highlight the query in the page text
            const highlightedText = page.pageText.replace(
                new RegExp(query, 'g'), // Match all occurrences of the query
                `<span class="highlight">${query}</span>` // Wrap with a span for highlighting
            );

            results.push({ pageNo: page.pageNo, pageText: highlightedText }); // Store the modified page text
                //results.push(page); // Store the matching page
                found = true; // Mark that a match has been found
            }
        });
    
        // If matches are found, render all results
        if (found) {
            textContainer.innerHTML = ''; // Clear previous results
            results.forEach((page) => {
                // You can render each matching page's content or information here
                const pageElement = document.createElement('div');
                pageElement.classList.add('matching-page');
                pageElement.innerHTML = `<h3>Page ${page.pageNo}</h3><p>${page.pageText}</p>`;
                textContainer.appendChild(pageElement); // Add the page to the container
            });
        } 

    if (!found && query !== "") {
        textContainer.innerHTML = '<p>کوئی نتیجہ نہیں ملا۔</p>';
    } else if (query === "") {
        renderPage(currentPage);
    }
}

// Initialize the first page
loadPages();