const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['X-API-KEY']= 'live_EAiOhGE3wh3dcvwYQxxwZ7X5N3zYG286hEFBNu5jjFYnwYNxYNA07tCpg9XTOGGT';

const urlApi_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';

const urlApi_FAVORITES = 'https://api.thecatapi.com/v1/favourites?';

const urlApi_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

const urlApi_FAVORITES_DELETE= (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

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

        btn1.onclick = () => saveFavouriteMichi(data[0].id);
        btn2.onclick = () => saveFavouriteMichi(data[1].id);
    }
}
async function loadFavouriteMichis(){
    const response = await fetch(urlApi_FAVORITES,{
        method: 'GET',
        headers: {
            'X-API-KEY' : 'live_EAiOhGE3wh3dcvwYQxxwZ7X5N3zYG286hEFBNu5jjFYnwYNxYNA07tCpg9XTOGGT',
        }
    });
    const data = await response.json();

    console.log("Favorites")
    console.log(data)

    if(response.status !== 200){
        spanError.innerHTML = "Hubo un error : "+ response.status + " / " + data.message;
    }else{
            const section = document.getElementById('favoriteMichis');
            section.innerHTML= "";
            const h2 = document.createElement('h2')
            const h2Text = document.createTextNode('Michis favoritos')
            h2.appendChild(h2Text)
            section.appendChild(h2)

            data.forEach(michi => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al michi de favoritos');
            btn.addEventListener("click",()=> deleteFaouvotireMichi(michi.id))
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
    const {data , status} = await api.post('/favourites',{
        image_id : id
    })

    // const res = await fetch(urlApi_FAVORITES,
    //     {
    //         method:'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-API-KEY': 'live_EAiOhGE3wh3dcvwYQxxwZ7X5N3zYG286hEFBNu5jjFYnwYNxYNA07tCpg9XTOGGT'
    //         },
    //         body: JSON.stringify({
    //             image_id: id 

    //         }),
    //     }
    // );
    // const data = await res.json();
    
    console.log('Save')
    console.log(data)

    if(status !== 200){
        spanError.innerHTML = "Hubo un error : "+ status + " / " + data;
    }else{
        console.log("Michi guardado en favoritos")
        loadFavouriteMichis();
    }
}


async function deleteFaouvotireMichi(id){
    const res = await fetch(urlApi_FAVORITES_DELETE(id),
        {
            method:'DELETE',
            headers:{
                'X-API-KEY': 'live_EAiOhGE3wh3dcvwYQxxwZ7X5N3zYG286hEFBNu5jjFYnwYNxYNA07tCpg9XTOGGT' 
            }
        }
    );
    const data = await res.json();    
    console.log('Delete')
    console.log(data)

    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error : "+ res.status + " / " + data.message;
    }else {
        console.log("Michi eliminado de favoritos")
        loadFavouriteMichis();
    }
}

async function uploadMichiPhoto(){
    const form = document.getElementById('upLoadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'))

    const res = await fetch(urlApi_UPLOAD,{
        method:'POST',
        headers:{
            // 'Content-type':'multipart/form-data',
            'X-API-KEY':'live_EAiOhGE3wh3dcvwYQxxwZ7X5N3zYG286hEFBNu5jjFYnwYNxYNA07tCpg9XTOGGT' 
        },
        body: formData,
    })
    const data = await res.json()
    if(res.status !== 201){
        spanError.innerHTML = "Hubo un error : "+ res.status + "/ " + data.message;
        console.log(data)
    }else {
        console.log("Imagen Subida !!!")
        console.log("el id es: "+ data.id)
        console.log(data)
        saveFavouriteMichi(data.id)
        loadFavouriteMichis();
    }
}

// Se manda a llamar la función cuando recien se carga la página
loadRandomMichis();
loadFavouriteMichis()




