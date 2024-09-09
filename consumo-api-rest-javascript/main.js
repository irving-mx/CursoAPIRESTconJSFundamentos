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

const urlApi = 'https://api.thecatapi.com/v1/images/search'

async function fetchData(urlApi){
    const response = await fetch(urlApi);
    const data = await response.json();
    const img = document.querySelector('img')
    img.src = data[0].url
}

const button = document.querySelector('button')

document.addEventListener('DOMContentLoaded',fetchData(urlApi))

button.addEventListener('click',()=>{
    fetchData(urlApi);
    windows.location.reload();
})