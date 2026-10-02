//axios cdn within HTML. do not import axios into JS file!

// Global location to store data.
let allData = [];

// fetch API data.
async function fetchData() {
    try {
      const response = await axios.get('https://kitsu.io/api/edge/trending/anime');
      return response.data.data;
    }
    catch (error) {
    console.error('failed to fetch data:', error);
    return [];
}
}

// Clears then inputs data to the addCard function when called.
function displayData(data) {
    document.querySelector('#card-list').innerHTML = '';
    data.forEach(addCard);
}

// Call the fetch data function to populate allData.
fetchData().then(data => {
    allData = data;
    // Displays the cards on page on initial load (no filters).
    displayData(allData)
})

// Filters data without being case sensitive then calls displayData to pass fitered data to the addCard function.
function filterData(searchTerm) {
    const query = searchTerm.toLowerCase().trim();

    const filtered = allData.filter(anime => {
        const title = anime.attributes.canonicalTitle;
        return title.toLowerCase().includes(query);
    });
    displayData(filtered)
}

// Connects the HTML search input to JS and calls the filterData function to apply the filter.
document.getElementById('search-input')?.addEventListener('input', (e) => {
    filterData(e.target.value);
});

//Clone, populate and add card to HTML page.
function addCard(anime) {
    const template = document.getElementById('card-template').content.cloneNode(true);

    const attr = anime.attributes;

    template.querySelector('.img-fluid').src = attr.posterImage?.small;
    template.querySelector('.img-fluid').alt = attr.canonicalTitle;
    template.querySelector('.card-title').innerText = attr.canonicalTitle;
    template.querySelector('.card-text').innerText = attr.synopsis;

    document.querySelector('#card-list').appendChild(template);
}

