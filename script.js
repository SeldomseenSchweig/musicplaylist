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
  card.onclick = function() {
    openModal(playlist);
  }
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
// JavaScript for Opening and Closing the Modal
var modal = document.getElementById("playlistModal");
var span = document.getElementsByClassName("close")[0];

function openModal(playlist) {
  document.getElementById('playlistName').innerText = playlist.playlist_name;
  document.getElementById('playlistImage').src = playlist.playlist_art;
  document.getElementById('playlistLikes').innerText = `Likes: ${playlist.likeCount}`;
  document.getElementById('playlistCreator').innerText = `Location: ${playlist.playlist_creator}`;
  createSongList(playlist.songs)
  
  modal.style.display = "block";
}

function createSongList(songs) {
  let songListContainer = document.getElementById("songlist-container");
  songListContainer.innerHTML = ""; 

  songs.forEach(song => {
      // Create song item container
      let songItem = document.createElement('div');
      songItem.className = 'song-item';

      // Create and append cover art
      let coverArt = document.createElement('img');
      coverArt.src = song.cover_art;
      coverArt.alt = song.title + " cover art";
      songItem.appendChild(coverArt);

      // Create and append song details container
      let songDetails = document.createElement('div');
      songDetails.className = 'song-details';

      // Create and append song title
      let songTitle = document.createElement('p');
      songTitle.className = 'song-title';
      songTitle.textContent = song.title;
      songDetails.appendChild(songTitle);

      // Create and append artist name
      let artistName = document.createElement('p');
      artistName.className = 'artist-name';
      artistName.textContent = song.artist;
      songDetails.appendChild(artistName);

      // Create and append album name
      let albumName = document.createElement('p');
      albumName.className = 'album-name';
      albumName.textContent = song.album;
      songDetails.appendChild(albumName);

      songItem.appendChild(songDetails);

      // Create and append song duration
      let songDuration = document.createElement('p');
      songDuration.className = 'song-duration';
      songDuration.textContent = song.duration;
      songItem.appendChild(songDuration);

      // Append song item to the song list container
      songListContainer.appendChild(songItem);
  });

  return songListContainer;
}

span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}