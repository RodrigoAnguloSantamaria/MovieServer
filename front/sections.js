//const { JsonWebTokenError } = require("jsonwebtoken");

const allmovies$$ = document.querySelector(".allmovies");
const allcinemas$$ = document.querySelector(".allcinemas");
const addmovie$$ = document.querySelector(".addmovie");
const moviebytittle$$ = document.querySelector(".moviebytitle");
const container$$ = document.createElement("div")

document.body.appendChild(container$$);



const loadMoviesTitles = async ()=>{
    let token = localStorage.getItem ("token");
    //console.log("token a enviar"+ token)
    await fetch("http://localhost:5800/movies", {
        method: "GET",
        headers: { 'Authorization': 'Bearer '+ token}
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        moviebytittle$$.innerHTML=`<option value="" selected disabled hidden>Movies titles</option>`
        response.forEach(movie =>{
            const item$$=document.createElement("option")
            item$$.value=movie.title
            item$$.textContent=movie.title
            moviebytittle$$.appendChild(item$$)
      }); 
    })
       
}


const getallmovies = async ()=>{
    container$$.innerHTML="";
    let token = localStorage.getItem ("token");
    const call = await fetch("http://127.0.0.1:5800/movies", {
        method: 'GET', // or 'PUT'
        body: JSON.stringify(), // data can be `string` or {object}!
        
        headers: { 'Authorization': 'Bearer '+ token}
      });
    const allMoviesJson = await call.json();
    
    allMoviesJson.forEach(movie => {
        
            const item$$=document.createElement("section");
            item$$.className="item"
            //console.log(item$$)
            item$$.innerHTML=`<span style="width:20%;border:1px solid black">Id: ${movie._id}</span>
            <span style="width:20%;border:1px solid black"> Title: ${movie.title}</span>
            <span style="width:20%;border:1px solid black"> Director: ${movie.director}</span>
            <span style="width:20%;border:1px solid black">Genre: ${movie.genre} </span>
            <span style="width:20%;border:1px solid black"> Year: ${movie.year}</span>`
            //console.log(screen$$)
            container$$.appendChild(item$$)
            
            });
    printresults();

}

const getallcinemas = async ()=>{
    container$$.innerHTML="";
    const call = await fetch("http://127.0.0.1:5800/cinemas");
    const allCinemasJson = await call.json();
    
    allCinemasJson.forEach(cinema => {
            let arrayMovies=[];
            
            cinema.allMovies.forEach(movie => {
            
                arrayMovies.push(movie.title)
            });
            
            const item$$=document.createElement("section");
            item$$.className="item"
            item$$.innerHTML=`<span style="width:20%;border:1px solid black">Id: ${cinema._id}</span>
            <span style="width:20%;border:1px solid black">Name: ${cinema.name}</span>
            <span style="width:60%;border:1px solid black">Movies: [ ${arrayMovies} ]</span>`
            container$$.appendChild(item$$)
            
            });
    printresults();

}
const printresults = ()=>{
    document.body.appendChild(container$$);
}

const addMovie = ()=>{
    container$$.innerHTML="";
    const form$$=document.createElement("form");
    form$$.className="addform";
    
    form$$.innerHTML=`Title: <input type="text" class="movietitle" placeholder="add title"><br>
    Director:  <input type="text" class="moviedirector" placeholder="add director"><br>
    Year: <input type="number" class="movieyear" placeholder="add year"><br>
    Genre: <input type="text" class="moviegenre" placeholder="add genre"><br>
    <input type="submit" class="submitMovie">`
    container$$.appendChild(form$$);
    const sendMovieButton$$=document.querySelector(".submitMovie");
    sendMovieButton$$.addEventListener("click",sendNewMovie)
}

const sendNewMovie = async ()=>{
    const movieTitle$$=document.querySelector(".movietitle")
    const movieDirector$$=document.querySelector(".moviedirector")
    const movieGenre$$=document.querySelector(".moviegenre")
    const movieYear$$=document.querySelector(".movieyear")
    event.preventDefault();
    let newMovie ={
        title: (movieTitle$$.value),
        director: (movieDirector$$.value),
        year: (movieYear$$.value),
        genre: (movieGenre$$.value)
    }
    console.log(newMovie)
    let token = localStorage.getItem ("token");
    await fetch("http://localhost:5800/movies", {
        method: 'POST',
        headers: { 
            'Authorization': 'Bearer '+ token,
            'Content-Type': 'application/json',
            'Accept-Encoding':'gzip, deflate, br',
            'Connection':'keep-alive'
            
        },
         body: JSON.stringify(newMovie)
      })
      then(res => res.json())
      .catch(error => console.log('Error:', error))
      .then(response => {
        //alert('Success:')
        
      });
      container$$.innerHTML=`Movie created: ${newMovie.title}`;
      printresults();
}

const getmoviesbyid = async (title) =>{
    let token = localStorage.getItem ("token");
    const call = await fetch("http://localhost:5800/movies/title/"+title, {
        method: 'GET', // or 'PUT'
        body: JSON.stringify(), // data can be `string` or {object}!
        
        headers: { 'Authorization': 'Bearer '+ token}
      })
    const moviebytitle = await call.json();
    
    container$$.innerHTML="";
    const item$$=document.createElement("section");
            item$$.className="item"
          
            item$$.innerHTML=`<span style="width:20%;border:1px solid black">Id: ${moviebytitle[0]._id}</span>
            <span style="width:20%;border:1px solid black"> Title: ${moviebytitle[0].title}</span>
            <span style="width:20%;border:1px solid black"> Director: ${moviebytitle[0].director}</span>
            <span style="width:20%;border:1px solid black">Genre: ${moviebytitle[0].genre} </span>
            <span style="width:20%;border:1px solid black"> Year: ${moviebytitle[0].year}</span>`
           
            container$$.appendChild(item$$)
    printresults();
}


loadMoviesTitles();

allmovies$$.addEventListener("click",getallmovies);
allcinemas$$.addEventListener("click",getallcinemas);
addmovie$$.addEventListener("click",addMovie);
moviebytittle$$.addEventListener("change",function(){getmoviesbyid(moviebytittle$$.value)});





