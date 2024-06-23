// STEP 1: Grabbing data from the form:

async function handleSubmit(event) {
    event.preventDefault();
    
    // Grabbing our search terms from the form:
    const search = event.target.search.value;
    console.log(search);
    
    const pokemonData = await fetchPokemonData(search);
    console.log(pokemonData);
    
    displayPokemon(pokemonData);
}

// STEP 2: Making a GET Request to our API:

async function fetchPokemonData(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const result = await response.json();
    return result;
}

// STEP 3: Making Cards to display Pokémon:

function displayPokemon(pokemonData) {
    const pokemonHeight = pokemonData.height / 10;
    const pokemonWeight = pokemonData.weight / 10;
    const html = `
        <div class="d-flex flex-row col-12 justify-content-center p-3 card">
            <div class="d-flex flex-column align-content-center col-5 card-pokemon-image">
                <h5 class="card-title">${pokemonData.name.toUpperCase()}</h5>
                <img src="${pokemonData.sprites.other['dream_world']['front_default']}" alt="${pokemonData.name}">
            </div>
            <div class="d-flex flex-column col-7 card-pokemon-stat">
                <p><strong>ID:</strong> ${pokemonData.id}</p>
                <p><strong>Type:</strong> ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
                <p><strong>Height:</strong> ${pokemonHeight} cm</p>
                <p><strong>Weight:</strong> ${pokemonWeight} kg</p>
                <p><strong>Abilities:</strong> ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</p>
                <p><strong>Stats:</strong></p>
                <ul>
                    ${pokemonData.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                </ul>
                <button class="btn btn-success" onclick="addToTeam(${pokemonData.id}, '${pokemonData.name.toUpperCase()}', '${pokemonData.sprites.other['dream_world']['front_default']}')">Add to Team</button>
            </div>
        </div>`;
    
    const card = document.createElement('div');
    card.innerHTML = html;
    
    const display = document.getElementById("pokemon-display");
    display.appendChild(card);
}

// STEP 4: Adding Pokémon to the team:

function addToTeam(id, name, sprite) {
    const teamDisplay = document.getElementById("team");
    const teamMember = document.createElement('div');
    teamMember.classList.add('card', 'team-card');
    teamMember.innerHTML = `
        <div class="d-flex flex-column card-body">
            <h5 class="card-title">${name}</h5>
            <img src="${sprite}" alt="${name}">
            <button class="btn btn-danger mt-2" onclick="removeFromTeam(${id})">Remove</button>
        </div>`;
    teamMember.id = `team-${id}`;
    teamDisplay.appendChild(teamMember);
}

// STEP 5: Removing Pokémon from the team:

function removeFromTeam(id) {
    const teamMember = document.getElementById(`team-${id}`);
    if (teamMember) {
        teamMember.remove();
    }
}
