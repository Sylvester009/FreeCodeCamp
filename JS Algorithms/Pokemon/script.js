const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const image = document.getElementById("img-div");

const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const fetchData = async (pokemonNameInput) => {
  try {
    const res = await fetch(`${pokemonAPI}/${pokemonNameInput.toLowerCase()}`);
    const data = await res.json();

    const imageUrl = data.sprites.front_default;

    // Displaying the fetched data
    pokemonName.textContent = data.name;
    pokemonId.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    types.innerHTML = data.types
      .map(
        (obj) => `<span class="type ${obj.type.name}">${obj.type.name}</span>`
      )
      .join("");
    hp.textContent = data.stats.find(
      (stat) => stat.stat.name === "hp"
    ).base_stat;
    attack.textContent = data.stats.find(
      (stat) => stat.stat.name === "attack"
    ).base_stat;
    defense.textContent = data.stats.find(
      (stat) => stat.stat.name === "defense"
    ).base_stat;
    specialAttack.textContent = data.stats.find(
      (stat) => stat.stat.name === "special-attack"
    ).base_stat;
    specialDefense.textContent = data.stats.find(
      (stat) => stat.stat.name === "special-defense"
    ).base_stat;
    speed.textContent = data.stats.find(
      (stat) => stat.stat.name === "speed"
    ).base_stat;
    image.innerHTML = `<img src="${imageUrl}" alt="Image of ${data.name}" id = "sprite"/>`;
  } catch (err) {
    alert("Pokémon not found");
    resetDisplay();
    console.log(err);
  }
};

searchButton.addEventListener("click", () => {
  const pokemonNameInput = searchInput.value.trim();
  if (pokemonNameInput !== "") {
    fetchData(pokemonNameInput);
  }
});

const resetDisplay = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();

  // reset stats
  pokemonName.textContent = "";
  pokemonID.textContent = "";
  types.innerHTML = "";
  height.textContent = "";
  weight.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
};
