const pokedex = document.getElementById("pokedex");
const cachedPokemon = {};

console.log(pokedex);

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
  const res = await fetch(url);

  const data = await res.json();
  // pokemon array
  const pokemon = data.results.map((result, index) => ({ ...result, id: index + 1, image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png` }));
  displayPokemon(pokemon);
};

const getPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
  const res = await fetch(url);

  const data = await res.json();
  // pokemon array
  const pokemon = data.results.map((result, index) => ({ ...result, id: index + 1, image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png` }));
  displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);

  const pokemonHTMLString = pokemon
    .map(
      (pokeman) =>
        `
      <li class="card" onclick="detailPokemon(${pokeman.id})">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">#${pokeman.id} <br> <b>${pokeman.name}</b></h2>
        </li>   
    `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

const detailPokemon = async (id) => {
  if (!cachedPokemon[id]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    displayPopup(pokeman);
  } else {
    displayPokemanPopup(cachedPokemon[id]);
  }
};

const displayPopup = (pokeman) => {
  const type = pokeman.types.map((type) => type.type.name).join(", ");
  const image = pokeman.sprites["front_default"];

  const htmlString = `
  <div class="popup">
  <button id="closeBtn" onclick="closePopup()">Close</button>
  
  <div class="popup-card">
            <img class="card-image-popup" src="${image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="info"><small> Height : </small> ${pokeman.height} | <small>Weight : </small> ${pokeman.weight} | <small>Type: ${type}</small></p>

            </div> 
  </div>
  `;
  pokedex.innerHTML = pokedex.innerHTML + htmlString;
};

const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};

fetchPokemon();
