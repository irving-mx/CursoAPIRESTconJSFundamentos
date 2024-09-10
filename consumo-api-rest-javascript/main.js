// console.log('Hello, world')

// const URL = 'https://api.thecatapi.com/v1/images/search'
// const buttonR = document.querySelector("button")

// fetch(URL)
// .then(res => res.json())
// .then(data =>{
//     const img = document.querySelector("img")
//     img.src = data[0].url
// })

// buttonR.addEventListener("click",()=>{
//     window.location.reload()
// })

const urlApi = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_EAiOhGE3wh3dcvwYQxxwZ7X5N3zYG286hEFBNu5jjFYnwYNxYNA07tCpg9XTOGGT';

async function reload(urlApi){
    const response = await fetch(urlApi);
    const data = await response.json();
    const img1 = document.getElementById('img1')
    const img2 = document.getElementById('img2')
    const img3 = document.getElementById('img3')

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    console.log(data)
    // img.src = data[0].url
}

const button = document.querySelector('button')
// document.addEventListener('DOMContentLoaded',fetchData(urlApi))

button.addEventListener('click',()=>{
    reload(urlApi);
    window.location.reload();
})

// Se manda a llamar la función cuando recien se carga la página
reload(urlApi);
