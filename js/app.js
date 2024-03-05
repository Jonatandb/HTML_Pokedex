const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
const listaPokemon = document.querySelector('#lista-pokemon')

for (let i = 1; i <=151; i++) {
  fetch(API_URL + i)
    .then(response => response.json())
    .then(data => mostrarPokemon(data))
}

function mostrarPokemon({
    name,
    weight,
    height,
    types,
    id,
    sprites: {
      other: {
        'official-artwork': {
          front_default
        }
      }
    }
  }) {

  const tipos = types.map(({ type: { name}}) => {
    return `<p class='tipo ${name}'>${name.toUpperCase()}</p>`
  })

  const div = document.createElement('div')
  div.classList.add('pokemon')

  const formatedID = id.toString().padStart(3, '0')

  div.innerHTML = `
    <p class="pokemon-id-back">#${formatedID}</p>
    <div class="pokemon-imagen">
      <img
        src="${front_default}"
        alt="${name} image"
      />
    </div>
    <div class="pokemon-info">
      <div class="nombre-contenedor">
        <p class="pokemon-id">#${formatedID}</p>
        <h2 class="pokemon-nombre">${name}</h2>
      </div>
      <div class="pokemon-tipos">
        ${tipos.join('')}
      </div>
      <div class="pokemon-stats">
        <p class="stat">${height}m</p>
        <p class="stat">${weight}kg</p>
      </div>
    </div>
  `

  listaPokemon.appendChild(div)
}