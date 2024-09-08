// index.js
const url = 'https://akabab.github.io/superhero-api/api/all.json';

const listaAlteregos = document.getElementById('alteregos');
const listaTamanhoMarvel = document.getElementById('tamanhoMarvel');
const listaDC = document.getElementById('heroisDC');
const listaHeroisTamanho = document.getElementById('heroisTamanho');

async function processSuperheroes() {
    try {
        const response = await fetch(url);
        const superheroes = await response.json();

        // 1. Usando map, crie uma lista com o alter_ego de todos os personagens
        const alterEgos = superheroes.map(hero => hero.biography.alterEgo);
        const alterEgosList = alterEgos.map(alterEgo => `<li>${alterEgo}</li>`).join('');
        listaAlteregos.innerHTML = alterEgosList;

        // 2. Usando reduce, retorne o tamanho total de caracteres de todos os first_appearance cujo o publisher é igual a "Marvel Comics"
        const totalFirstAppearanceLength = superheroes
            .filter(hero => hero.biography.publisher === 'Marvel Comics')
            .reduce((acc, hero) => acc + hero.biography.firstAppearance.length, 0);
        listaTamanhoMarvel.textContent = totalFirstAppearanceLength;

        // 3. Usando filter, imprima a lista apenas de personagens cujo o publisher é "DC Comics"
        const dcComicsHeroes = superheroes.filter(hero => hero.biography.publisher === 'DC Comics');
        const dcHeroesList = dcComicsHeroes.map(hero => `<li>${hero.name}</li>`).join('');
        listaDC.innerHTML = dcHeroesList;

        // 4. Usando sort, organize o vetor pelo tamanho do nome dos personagens (superhero)
        const sortedByNameLength = superheroes.sort((a, b) => a.name.length - b.name.length);
        const sortedHeroesList = sortedByNameLength.map(hero => `<li>${hero.name}</li>`).join('');
        listaHeroisTamanho.innerHTML = sortedHeroesList;
    } catch (error) {
        console.error('Erro ao processar os dados:', error);
    }
}

processSuperheroes();
