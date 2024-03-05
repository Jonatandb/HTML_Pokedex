const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
const listaPokemon = document.querySelector('#lista-pokemon')
const botonesHeader = document.querySelectorAll('.btn')
const allPokemon = []

for (let i = 1; i <= 151; i++) {
  fetch(API_URL + i)
    .then(response => response.json())
    .then(data => {
      allPokemon.push(data)
      mostrarPokemon(data)
    })
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

  const tipos = types.map(({ type: { name } }) => {
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

function mostrarPorTipo(btnID) {
  allPokemon.sort((p1, p2) => {
    return p1.id < p2.id ? -1 : 1
  })
  listaPokemon.innerHTML = ''
  if (btnID == 'ver-todos') {
    allPokemon.forEach(pokemon => mostrarPokemon(pokemon))
  } else {
    allPokemon.forEach(pokemon => {
      pokemon.types.forEach(({ type }) => {
        if (type.name.includes(btnID)) {
          mostrarPokemon(pokemon)
        }
      })
    })
  }
}

botonesHeader.forEach(btn => {
  btn.addEventListener('click', e => mostrarPorTipo(e.currentTarget.id))
})