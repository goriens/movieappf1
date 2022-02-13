//https://www.omdbapi.com/?s=avengers&page=1&apikey=42cb4622
//key - http://www.omdbapi.com/?i=tt3896198&apikey=42cb4622

let movieSearchBox = document.querySelector("#movie-search-box");
let searchList = document.querySelector("#search-list");
let resultGrid = document.querySelector("#result-grid");

//load movies form API
async function loadMovies(searchTerm){
    let url = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=42cb4622`;
    let res = await fetch(`${url}`);
    let data = await res.json();
    //console.log(data.Search);
    if(data.Response == "True"){
        displayMovieList(data.Search);
    }
}
function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove("hide-search-list");
        loadMovies(searchTerm);
    }
    else{
        searchList.classList.add("hide-search-list");
    }
    console.log(searchTerm);
}
function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let i=0; i<movies.length; i++){
        let moviesListItem = document.createElement("div");
        //console.log(moviesListItem)
        moviesListItem.dataset.id = movies[i].imdbID;
        //movie id in data id
        moviesListItem.classList.add("search-list-item");
        if(movies[i].Poster != "N/A"){
            moviePoster = movies[i].Poster;
        }
        else{
            moviePoster = "https://images-na.ssl-images-amazon.com/images/I/41bLP6NzvKL.jpg"
        }
        moviesListItem.innerHTML= `<div class="search-item-thumbnail">
        <img
          src="${moviePoster}"
          alt=""
        />
      </div>
      <div class="search-item-info">
        <h3>${movies[i].Title}</h3>
        <p>${movies[i].Year}</p>
      </div>`

      searchList.appendChild(moviesListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    let searchListMovies = searchList.querySelectorAll(".search-list-item");
    searchListMovies.forEach(function (movie){
        //console.log(movie);
        movie.addEventListener("click", async function (){
            //console.log(movie.dataset.id)
            searchList.classList.add("hide-search-list");
            movieSearchBox.value = "";
            let result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=42cb4622`);
            let movieDetails = await result.json();
            //console.log(movieDetails)
            displayMovieDetails(movieDetails)
        });
    });
}
function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class="movie-poster">
              <img
                src="${details.Poster != "N/A" ? details.Poster: "https://images-na.ssl-images-amazon.com/images/I/41bLP6NzvKL.jpg"}"
                alt=""
              />
            </div>
            <!-- movie info end -->
            <div class="movie-info">
              <h3 class="movie-title">${details.Title}</h3>
              <ul class="movie-misc-info">
                <li class="year">Year: ${details.Year}</li>
                <li class="rated">Ratings: ${details.imdbRating}/10</li>
                <li class="released">Released: ${details.Released}</li>
              </ul>
              <p class="genre"><b>Genre: </b> ${details.Genre}</p>
              <p class="writer">
                <b>Writer: </b>${details.Writer}
              </p>
              <p class="actors"><b>Actors: </b>${details.Actor}</p>
              <p class="Plot: ">
                <b>Plot: </b> ${details.Plot}
              </p>
              <p class="language"><b>Language: </b>${details.Language}</p>
              <p class="awards">
                <b>Awards: </b> ${details.Awards}
              </p>
              <p id="recommended"></p>
            </div>`
            //create a new term
              //const terms = document.createElement('p');
              //terms.setAttribute("id","recommended");

            let rec = document.querySelector("#recommended");
            if(details.imdbRating >=8){
              rec.textContent = "Recommended";
            }
            
}
async function printMovies(){
  let url = `https://omdbapi.com/?s=avengers&page=1&apikey=42cb4622`;
  let res = await fetch(`${url}`);
  let data = await res.json();
  //console.log(data.Search);
  printMovieData(data.Search);
}
printMovies();


function printMovieData (products){
  let container = document.querySelector("#trending");
  container.innerHTML = "";
  console.log(products);
  //console.log("hii")
  
  products.forEach(function (prod){
      let div = document.createElement("div");
      let div1 = document.createElement("div");

      let image = document.createElement("img");
      image.src = prod.Poster;

      let title = document.createElement("p");
      title.textContent = prod.Title;

      let year = document.createElement("p");
      year.textContent = `(Year : ${prod.Year})`;

      let ratings = document.createElement("p");
      ratings.textContent = `Rating : ${Math.floor(Math.random(3)*10)}/10`;
      div1.append(year,ratings);
      div.append(image, title, div1);
      container.append(div);
  });
}


