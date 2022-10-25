// Kinolar ro'yxatini DOM dan olib topib oldik
const elMoviesList = document.querySelector(".movies__list");

const elFormSearch = document.querySelector(".search-form");
const elFormSearchInput = elFormSearch.querySelector(".search-input");
let elBtnTogle = document.querySelector(".btns");
let elBtnAc = document.querySelector(".toglebtn")
let elBtnsAz = document.querySelector(".btnAz");
let elBtnsZa = document.querySelector(".btnZa");
let elBtnsBy = document.querySelector(".btnBy");
let elBtnsFy = document.querySelector(".btnFy");
const filterYearForm = document.querySelector(".filteryear");
const fromYear = document.querySelector(".from-year");
const toYear = document.querySelector(".to-year");

// MODAL elements

// Samandar aytgan yo'lida qilgan ma'qul 😎
const elModal = document.querySelector(".modal");
const elModalTitle = elModal.querySelector(".movie-info-modal__title");
const elModalRating = elModal.querySelector(".movie-info-modal__rating");
const elModalYear = elModal.querySelector(".movie-info-modal__year");
const elModalDuration = elModal.querySelector(".movie-info-modal__duration");
const elModalYouTubeIframe = elModal.querySelector(".movie-info-modal__iframe");
const elModalCotegory = elModal.querySelector(".movie-info-modal__categories");
const elModalSummary = elModal.querySelector(".movie-info-modal__summary");
const elModalImDbId = elModal.querySelector(".movie-info-modal__imdb-link");

const oneHundredMovies = movies.slice(0, 100);

// Template ya'ni Qolibni DOM dan topib oldik
const elMoviesListTemplate = document.querySelector("#movies-item-template").content;

// Soat va Minutni hisoblovchi funksiya yaratdik
function getHoursAndMinuts(minut) {

  let hours = Math.floor(minut / 60);
  let minuts = Math.floor(minut % 60);

  return `${hours} hrs ${minuts} min`;
}

// Kinolarni sahifaga chiqaruvchi funksiy yaratdik
function showMovies(movie) {

  elMoviesList.innerHTML = "";

  const moviesFragment = document.createDocumentFragment();


  for (const kino of movie) {

    // Qolibni ichidagi hamma elemnetlarni olib berish uchun yozilgan code
    const moviesCloneTemplate = elMoviesListTemplate.cloneNode(true);

    moviesCloneTemplate.querySelector(".movie__img").src = `http://i3.ytimg.com/vi/${kino.ytid}/mqdefault.jpg`;
    moviesCloneTemplate.querySelector(".movie__title").textContent = kino.Title;
    moviesCloneTemplate.querySelector(".movie__rating").textContent = kino.imdb_rating;
    moviesCloneTemplate.querySelector(".movie__year").textContent = kino.movie_year;
    moviesCloneTemplate.querySelector(".movie__duration").textContent = getHoursAndMinuts(kino.runtime);
    moviesCloneTemplate.querySelector(".movie__categories").textContent = kino.Categories.split("|").join(", ");
    moviesCloneTemplate.querySelector(".js-more-info-button").dataset.imdbId = kino.imdb_id;

    moviesFragment.appendChild(moviesCloneTemplate);
  }
  elMoviesList.appendChild(moviesFragment);
}


function showModalInfo(movieId) {
  let findMovie = oneHundredMovies.find(function (element) {
    return element.imdb_id === movieId;
  })

  elModalTitle.textContent = findMovie.Title;
  elModalRating.textContent = findMovie.imdb_rating;
  elModalYear.textContent = findMovie.movie_year;
  elModalDuration.textContent = getHoursAndMinuts(findMovie.runtime);
  elModalYouTubeIframe.src = `https://www.youtube-nocookie.com/embed/${findMovie.ytid}`;
  elModalCotegory.textContent = findMovie.Categories.split("|").join(", ");
  elModalSummary.textContent = findMovie.summary;
  elModalImDbId.href = `https://www.imdb.com/title/${findMovie.imdb_id}`

}

// Event Delegation
elMoviesList.addEventListener("click", function (evt) {
  if (evt.target.matches(".js-more-info-button")) {
    showModalInfo(evt.target.dataset.imdbId);
  }
})


elModal.addEventListener("hidden.bs.modal", function () {
  elModalYouTubeIframe.src = ``;
})

showMovies(oneHundredMovies);



function onSearchMovieSubmit(evt) {
  evt.preventDefault();

  const searchElement = new RegExp(elFormSearchInput.value, "gi");

  const searchMovieFilteredList = oneHundredMovies.filter(item => item.Title.match(searchElement));

  if (searchMovieFilteredList.length > 0) {
    showMovies(searchMovieFilteredList);
  } else {
    alert("Movie not found");
  }

  elFormSearchInput.value = "";
}

elFormSearch.addEventListener("submit", onSearchMovieSubmit);

// elBtnTogle.addEventListener("click", function (evt) {
//   elBtnAc.classList.toggle("toglebtnac")
// })

elBtnsAz.addEventListener("click", function (evt) {
  evt.preventDefault();

  const textAz = oneHundredMovies.sort((a, b) => {
    if (String(a.Title).toLowerCase() < String(b.Title).toLowerCase()) {
      return -1;
    } else if (String(a.Title).toLowerCase() > String(b.Title).toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });

  elMoviesList.innerHTML = "";
  showMovies(textAz);


})

elBtnsZa.addEventListener("click", function (evt) {
  evt.preventDefault();

  const textZa = oneHundredMovies.sort((a, b) => {
    if (String(a.Title).toLowerCase() < String(b.Title).toLowerCase()) {
      return 1;
    } else if (String(a.Title).toLowerCase() > String(b.Title).toLowerCase()) {
      return -1;
    } else {
      return 0;
    }
  });

  elMoviesList.innerHTML = "";
  showMovies(textZa);


})

elBtnsBy.addEventListener("click", function (evt) {
  evt.preventDefault();

  const textBy = oneHundredMovies.sort((a, b) => {
    if (Number(a.imdb_rating) < Number(b.imdb_rating)) {
      return -1;
    } else if (Number(a.imdb_rating) > Number(b.imdb_rating)) {
      return 1;
    } else {
      return 0;
    }
  });

  elMoviesList.innerHTML = "";
  showMovies(textBy);


})

elBtnsFy.addEventListener("click", function (evt) {
  evt.preventDefault();

  const textFy = oneHundredMovies.sort((a, b) => {
    if (Number(a.imdb_rating) < Number(b.imdb_rating)) {
      return 1;
    } else if (Number(a.imdb_rating) > Number(b.imdb_rating)) {
      return -1;
    } else {
      return 0;
    }
  });

  elMoviesList.innerHTML = "";
  showMovies(textFy);


})


filterYearForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  let fromYearValue = fromYear.value;
  let toYearValue = toYear.value;

  // console.log(fromYearValue);
  // console.log(toYearValue);

  const filteredMovieYear = oneHundredMovies.filter(item => {
    if (fromYearValue !== "" && toYearValue !== "") {
      return item.movie_year >= fromYearValue && item.movie_year <= toYearValue;
    } else if (fromYearValue !== "") {
      return item.movie_year >= fromYearValue;
    } else if (toYearValue !== "") {
      return item.movie_year <= toYearValue;
    }
  });
  console.log(filteredMovieYear);
  filteredMovieYear.sort((a, b) => a.movie_year - b.movie_year);
  showMovies(filteredMovieYear);

});



// yildan .... yilga
// A-Z , Z-A sort
// janrlar bo'yicha filter select
// rating bo'yicha filter