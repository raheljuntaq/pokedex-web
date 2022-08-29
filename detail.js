const pokedex = document.getElementById("pokedex");

console.log(pokedex);

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types.map((type) => type.type.name).join(", "),
    }));
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) =>
        `

      <li class="card">
      <div class="pokemon" style="background-color: white;">

      <div class="img-container">
            <img class="card-image" src="${pokeman.image}"/>
            </div>
            <div class="info">
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
            </div>
            div

        </li>   
    `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

const detailPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  const res = await fetch(url);
  const pokeman = await res.json();
  displayPopup(pokeman);
};

const displayPopup = (pokeman) => {
  const type = pokeman.types.map((type) => type.type.name).join(", ");
  const htmlString = `
    `;
};

fetchPokemon();
