const container = document.getElementById("playlist-card-container");

fetch('data/data.json')  // Ensure the URL matches the location of your JSON file
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    data.forEach(item => {
      let playlistCard = createPlaylistCard(item);
      container.appendChild(playlistCard);
    });
  })
  .catch(error => {
    console.error('There was a problem:', error);
  });

// Function to create playlist card elements
function createPlaylistCard(playlist) {
  // Create card elements
  let card = document.createElement('div');
  card.className = 'playlist-card';

  let img = document.createElement('img');
  img.src = playlist.playlist_art;
  img.alt = `${playlist.playlist_name} cover art`;

  let title = document.createElement('h3');
  title.textContent = playlist.playlist_name;

  let description = document.createElement('p');
  description.textContent = `Description of ${playlist.playlist_name}`;

  // Append elements to card
  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(description);

  return card;
}
