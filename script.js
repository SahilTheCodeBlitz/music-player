console.log('heelo');

async function getSongs (){

    // trying to get song from client side // ideally not advisable will do this through apis

    let data = await fetch("http://127.0.0.1:5500/MusicPlayer/songs/") // time is re

    let response = await data.text() // puri html document is returned which contains music links also

    let div  = document.createElement("div")

    div.innerHTML = response // full html aa gyi  plus music links

  
    
    let songs = [] // songs array

    let as = div.getElementsByTagName("a") // all anchor tags got 


    for(let i=0 ; i<as.length ; i++){

        const element = as[i]

        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split('/songs/')[1])//in order to get just song name
        }
    }
    

    return songs
} 

function playSong(track){
    let song  = new Audio(`./songs/${track}`)
    song.play()
}

async function main() {
    let songss = await getSongs();
    console.log(songss); // all songs list received

    // code for adding this recevied song to the list

    let songsList = document.querySelector(".songlist").getElementsByTagName("ol")[0];

    for (const song of songss) {

        songsList.innerHTML += `<li>
        <div class="songcard flex">

        <div class="songname flex">
            <img src="./svg/musicicon.svg" alt="musicicon">
            <h2>${song}</h2>
        </div> 

        <div class="playsong flex">
            <h3>Play Song</h3>
            <img src="./svg/playsong.svg">
        </div>

    </div>
    </li>`;
    }

    // code for playing song when music list item is selected

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(element => {
        console.log(element);
        element.addEventListener("click",()=>{
            //action to be performed on selection
            const song = element.querySelector(".songname").lastElementChild.innerHTML

            playSong(song)
            console.log(song);
            
        })
    })
}

main();

