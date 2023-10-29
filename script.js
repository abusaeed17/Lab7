document.addEventListener('DOMContentLoaded', () => {
    const btnXHR = document.getElementById('xhrSearch');
    const btnFetch = document.getElementById('fetchSearch');
    const btnFetchAsyncAwait = document.getElementById('fetchAsyncAwait');
    const searchQueryElem = document.getElementById('query');
    const searchResults = document.getElementById('searchResults');
    
  
    API_KEY = "cArprEO37f-l6EUM8rkYat6SbPiLDjH7vFre0B0Z7qo";
    const API_URL = "https://api.unsplash.com/search/photos";
    
    btnXHR.addEventListener('click', function () {
      performSearch('xhr');
    });
  
    btnFetch.addEventListener('click', function () {
      performSearch('fetch');
    });
  
    btnFetchAsyncAwait.addEventListener('click', function () {
      performSearch('fetchAsyncAwait');
    });
    
    async function performSearch(method) {
      const query = searchQueryElem.value;
      if (!query) return;
  
      searchResults.innerHTML = '';
      const url = `${API_URL}?query=${query}`;
  
      if (method === 'xhr') {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.setRequestHeader('Authorization', `Client-ID ${API_KEY}`);
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 400) {
            const data = JSON.parse(xhr.responseText);
            displayResults(data);
          }
        };
        xhr.send();
      } else if (method === 'fetch') {
        fetch(url, {
          headers: {
            'Authorization': `Client-ID ${API_KEY}`
          }
        })
        .then(response => response.json())
        .then(data => displayResults(data));
      } else if (method === 'fetchAsyncAwait') {
        try {
          const response = await fetch(url, {
            headers: {
              'Authorization': `Client-ID ${API_KEY}`
            }
          });
          const data = await response.json();
          displayResults(data);
        } catch (error) {
          console.error('Fetch failed:', error);
        }
      }
    }
    
    function displayResults(data) {
        if (!data || !data.results || data.results.length === 0) {
            searchResults.innerHTML = 'No results found';
            return;
          }
        
          const images = data.results.map(result => {
            return `<img src="${result.urls.small}" alt="${result.description || 'Unsplash Image'}" />`;
          }).join('');
        
          searchResults.innerHTML = images;
    }
  });
  