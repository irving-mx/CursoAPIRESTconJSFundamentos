const urlApi_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_EAiOhGE3wh3dcvwYQxxwZ7X5N3zYG286hEFBNu5jjFYnwYNxYNA07tCpg9XTOGGT';

const urlApi_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_EAiOhGE3wh3dcvwYQxxwZ7X5N3zYG286hEFBNu5jjFYnwYNxYNA07tCpg9XTOGGT';

const spanError = document.getElementById('error')

async function loadRandomMichis(){
    const response = await fetch(urlApi_RANDOM);
    const data = await response.json();
    console.log("Random")
    console.log(data)

    if(response.status !== 200){
        spanError.innerHTML = "Hubo un error: "+ response.status + " / " + data.message;
    }else{
        const img1 = document.getElementById('img1')
        const img2 = document.getElementById('img2')
    
        img1.src = data[0].url;
        img2.src = data[1].url;
    }
}
async function loadFavoritesMichis(){
    const response = await fetch(urlApi_FAVORITES);
    const data = await response.json();

    console.log("Favorites")
    console.log(data)

    if(response.status !== 200){
        spanError.innerHTML = "Hubo un error : "+ response.status + " / " + data.message;
    }
}
const button = document.querySelector('button')
// document.addEventListener('DOMContentLoaded',fetchData(urlApi))

button.addEventListener('click',()=>{
    loadRandomMichis();
    window.location.reload();
})

// Se manda a llamar la función cuando recien se carga la página
loadRandomMichis();
loadFavoritesMichis()
