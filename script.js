const container = document.getElementById("playlist-card-container");

const likedPlaylists = {};  // Object to keep track of liked playlists


// Function to fetch and display playlists
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
  let likes = document.createElement('p');
   likes.id = `likes-${playlist.playlistID}`;
  
  let numLikes = likedPlaylists[playlist.id] ? likedPlaylists[playlist.id] : 0;
  likes.textContent = 'Likes: ' + numLikes;

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
  card.appendChild(likes)
  card.appendChild(description);

  return card;
}
// JavaScript for Opening and Closing the Modal
var modal = document.getElementById("playlistModal");
var span = document.getElementsByClassName("close")[0];

function openModal(playlist) {
  document.getElementById('playlistName').innerText = playlist.playlist_name;
  document.getElementById('playlistImage').src = playlist.playlist_art;
  document.getElementById('playlistLikes').innerHTML = ` <p> <button id="likeId-${playlist.playlistID}" data-liked="false" ><i class="fa fa-heart" style="font-size:40px;color:black; opacity: 0.25;"></i></button> </p>`;
  document.getElementById('playlistCreator').innerText = `Location: ${playlist.playlist_creator}`;
  createSongList(playlist.songs)

  if (likedPlaylists[playlist.playlistID]) {
    document.querySelector(`#likeId-${playlist.playlistID} i`).style.color = 'red';
    document.querySelector(`#likeId-${playlist.playlistID} i`).style.opacity = '1';
    document.querySelector(`#likeId-${playlist.playlistID}`).setAttribute('data-liked', 'true');
  }

  document.querySelector(`#likeId-${playlist.playlistID}`).addEventListener('click', () => toggleLike(`likeId-${playlist.playlistID}`, playlist.playlistID));

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



function toggleLike(id, playlistID) {
  let liked = document.getElementById(id).getAttribute('data-liked');
  if (liked == "false") {
    document.getElementById(id).innerHTML = `<i class="fa fa-heart" style="font-size:40px;color:red;"></i>`;
    document.getElementById(id).setAttribute('data-liked', 'true');
    if (likedPlaylists[playlistID]) {
      likedPlaylists[playlistID]++;
    } else {
      likedPlaylists[playlistID] = 1;
    }
  } else {
    document.getElementById(id).innerHTML = `<i class="fa fa-heart" style="font-size:40px;color:black; opacity: 0.25;"></i>`;
    document.getElementById(id).setAttribute('data-liked', 'false');
    if (likedPlaylists[playlistID]) {
      likedPlaylists[playlistID]--;
    }
  }
  document.getElementById(`likes-${playlistID}`).textContent = 'Likes: ' + likedPlaylists[playlistID];
}