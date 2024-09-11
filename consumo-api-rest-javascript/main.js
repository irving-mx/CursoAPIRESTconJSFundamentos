const urlApi_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_EAiOhGE3wh3dcvwYQxxwZ7X5N3zYG286hEFBNu5jjFYnwYNxYNA07tCpg9XTOGGT';

const urlApi_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_EAiOhGE3wh3dcvwYQxxwZ7X5N3zYG286hEFBNu5jjFYnwYNxYNA07tCpg9XTOGGT';

const spanError = document.getElementById('error')

async function loadRandomMichis(){
    const response = await fetch(urlApi_RANDOM);
    const data = await response.json();
    console.log("Random")
    console.log(data)

    if(response.status !== 200){
        spanError.innerHTML = "Hubo un error : "+ response.status + " / " + data.message;
    }else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        img1.src = data[0].url;
        img2.src = data[1].url;


        btn1.onclick = () => saveFavouriteMichi(data[0].id)
        btn2.onclick = () => saveFavouriteMichi(data[1].id)
    }
}
async function loadFavouriteMichis(){
    const response = await fetch(urlApi_FAVORITES);
    const data = await response.json();

    console.log("Favorites")
    console.log(data)

    if(response.status !== 200){
        spanError.innerHTML = "Hubo un error : "+ response.status + " / " + data.message;
    }else{
        data.forEach(michi => {
            const section = document.getElementById('favoriteMichis');
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al michi de favoritos');

            img.src = michi.image.url;
            img.width = 150;
            btn.appendChild(btnText);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);

        })
    }
}


async function saveFavouriteMichi(id){
    const res = await fetch(urlApi_FAVORITES,
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image_id: id 

            }),
        }
    );
    const data = await res.json();
    
    console.log('Save')
    console.log(data)

    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error : "+ res.status + " / " + data.message;
    }
}





// Se manda a llamar la función cuando recien se carga la página
loadRandomMichis();
loadFavouriteMichis()




