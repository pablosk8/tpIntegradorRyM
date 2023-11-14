const root = document.getElementById("root")
const totalPersonajes= document.getElementById("totalPersonajes")
let pagina= 1
let total= 0







const getData= async()=>{
    const URL = `https://rickandmortyapi.com/api/character?page=${pagina}`
    const response = await fetch(URL)
    const json = await response.json()
    total = json.info.pages
    paginaActual.innerHTML = pagina
    totalPaginas.innerHTML = total
    printData(json.results)
     
    updatePagination()
    data = json
    return json
}
getData(pagina)
let data = {}

const printData = (arr)=>{
    let card = ""
    totalPersonajes.innerHTML = arr.length
    arr.forEach((personaje) => {
        console.log(personaje)
        card = 
            card + 
            `
            <div >
                <div class="card">
                        <div class="card-image">
                            <img src=${personaje.image} alt="">
                        </div>
                        <div class="card-content">
                            <p>Nombre: <span class="card-info">${personaje.name}</span></p>
                            <p>Genero: <span class="card-info">${personaje.gender === "Female"?"Mujer":""||personaje.gender === "Male"?"Hombre":""||personaje.gender === "Genderless"?"Sin Genero":""||personaje.gender === "unknown"?"No se Sabe":""}</span></p>
                            <p>Especie: <span class="card-info">${personaje.species ==="Human"?"Humano":""||personaje.species ==="Humanoid"?"Humanoide":""||personaje.species ==="Alien"?"Alien":""||personaje.species ==="Animal"?"Animal":""||personaje.species ==="unknown"?"Desconocida":""||personaje.species ==="Poopybutthole"?"Poopybutthole":""||personaje.species ==="Mythological Creature"?"Criatura Mitologica":""||personaje.species ==="Robot"?"Robot":""||personaje.species ==="Cronenberg"?"Cronenberg":""||personaje.species ==="Disease"?"Enfermedad":""}</span></p>
                            <p>Estado: <span class="card-info">${personaje.status === "Dead"?"Muerto":""||personaje.status === "Alive"?"Vivo":""||personaje.status === "unknown"?"Desconocido":""}</span></p>
                            <p>Origen: <span class="card-info">${personaje.origin.name}</span></p>
                            <p>Locacion: <span class="card-info">${personaje.location.name}</span></p>
                    </div>
                    <div class="card-vermas">
                    <a href="https://rickandmortyapi.com/api/character/${personaje.id}" target="_blank">Ver mas</a>
                    </div>
                </div>
            </div>
            `
    
    });
    root.innerHTML = card
}
//Paginado
const paginaActual = document.getElementById("pagina-actual")
const nextPage = document.getElementById("next-page")
const prevPage = document.getElementById("prev-page")
const totalPaginas = document.getElementById("total-paginas")
const firstPage = document.getElementById("first-page")
const lastPage = document.getElementById("last-page")

const updatePagination = ()=>{
    if (pagina<=1){
        prevPage.disabled = true
        firstPage.disabled = true
    }else{
        prevPage.disabled = false
        firstPage.disabled = false
    }
    if(pagina === totalPaginas){
        lastPage.disabled = true
        nextPage.disabled = true
    }else{
        lastPage.disabled = false
        nextPage.disabled = false
    }
}


const Pagination = async(prom) =>{
    const result = await prom

    nextPage.addEventListener("click",()=>{
        pagina += 1
        getData()
    })
    prevPage.addEventListener("click", ()=>{
        pagina -= 1
        getData()
    })
    firstPage.addEventListener("click", ()=>{
        if(pagina>=2){
            pagina=1
            getData()
        }
    })
    lastPage.addEventListener("click",()=>{
        if(pagina< result.info.pages){
            pagina = result.info.pages
            getData()
        }
    })

}
Pagination(getData())

//FILTROS

const todos = document.getElementById("todos")
const mujeres = document.getElementById("mujeres")
const hombre = document.getElementById("hombre")
const sinGenero = document.getElementById("sin-genero")
const noSeSabe = document.getElementById("no-se-sabe")

mujeres.addEventListener ("click", ()=>{
    const arr = data.results
    const arrMujeres =[]
    for( let i = 0; i < arr.length ; i++){
        if(arr[i].gender ==="Female"){
            arrMujeres.push(arr[i])
        }
    }
    printData(arrMujeres)
})

hombres.addEventListener ("click", ()=>{
    const arr= data.results
    const arrHombres =[]
    for( let i = 0; i < arr.length ; i++){
        if(arr[i].gender ==="Male"){
            arrHombres.push(arr[i])
        }
    }
    printData(arrHombres)
})

sinGenero.addEventListener ("click", ()=>{
    const arr= data.results
    const arrSinGenero =[]
    for( let i = 0; i < arr.length ; i++){
        if(arr[i].gender ==="Genderless"){
            arrSinGenero.push(arr[i])
        }
    }
    printData(arrSinGenero)
})

noSeSabe.addEventListener ("click", ()=>{
    const arr= data.results
    const arrNoSeSabe =[]
    for( let i = 0; i < arr.length ; i++){
        if(arr[i].gender ==="unknown"){
            arrNoSeSabe.push(arr[i])
        }
    }
    printData(arrNoSeSabe)
})

todos.addEventListener("click",()=>{
    const arr = data.results
    printData (arr)
})


//MENU FILTROS
const filter = document.getElementById("filter")
const menuFilter= document.getElementById("menu-filter")


filter.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 482px)").matches) {
        menuFilter.style.display = (menuFilter.style.display === "none") ? "block" : "none";
    }
});

menuFilter.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 482px)").matches) {
        menuFilter.style.display = (menuFilter.style.display === "block") ? "none" : "block";
    }
});
