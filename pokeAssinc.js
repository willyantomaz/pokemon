const fs = require('fs/promises');
const { url } = require('inspector');

async function escreverArquivoAsync(nomeArquivo, dados) {
    console.log(`Escrevendo dados no arquivo ${nomeArquivo}...`)
    try {
        await fs.writeFile(nomeArquivo, dados);
        console.log(`Dados escritos no arquivo ${nomeArquivo} com sucesso.`);
    } catch (error) {
        console.error(`Erro ao escrever dados no arquivo ${nomeArquivo}:`, error);
    }
}

async function lerArquivoAsync(nomeArquivo) {
    console.log(`Lendo dados do arquivo: ${nomeArquivo}`)
    try {
        const data = await fs.readFile(nomeArquivo, 'utf-8');
        console.log(`Dados lidos do arquivo ${nomeArquivo}`);
        return data;
    } catch (error) {
        console.error(`Erro ao ler dados do arquivo ${nomeArquivo}`, error);
        return null;
    }
}
async function getPokemonUrl() {
try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const pokemonTudo = data.results.map(result => ({
        nome: result.name,
        url: result.url
    }));
    const pokemonData = JSON.stringify(pokemonTudo, null, 2);
    await escreverArquivoAsync('pokemon.json', pokemonData);

    console.log("Pokemons cadastrados");

    const dadosArquivoLocal = await lerArquivoAsync('dados.txt');
    console.log(`Conteúdo do arquivo dados.txt`, dadosArquivoLocal);

    const dadosPokemonSalvo = await lerArquivoAsync('pokemon.json');
    console.log("Conteúdo do arquivo pokemon", dadosPokemonSalvo);

} catch (error) {
    console.error("Erro ao obter dados do pokemon", error);
}
}

async function getPokemonDataWithAsync() {
    console.log("Aguardando retorno da Poke API");
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await response.json();
        console.log(data);

        const pokemonInfoArray = data.results.map(result => ({
            nome: data.name,
            tipo: data.types[0].type.name,
            peso: data.weight,
            altura: data.height,
            numero_dex: data.id,
            sprite_link: data.sprites.front_default
        }));


        

        const pokemonData = JSON.stringify(pokemonTudo, null, 2);
        await escreverArquivoAsync('pokemon.json', pokemonData);

        console.log("Pokemons cadastrados");

        const dadosArquivoLocal = await lerArquivoAsync('dados.txt');
        console.log(`Conteúdo do arquivo dados.txt`, dadosArquivoLocal);

        const dadosPokemonSalvo = await lerArquivoAsync('pokemon.json');
        console.log("Conteúdo do arquivo pokemon", dadosPokemonSalvo);

    } catch (error) {
        console.error("Erro ao obter dados do pokemon", error);
    }
}

getPokemonDataWithAsync();
