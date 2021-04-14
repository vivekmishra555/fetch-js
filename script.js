let timer
let deletefirstphotodelay
async function start(){
    try{
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        createBreadList(data.message)
    }catch(e){
        console.log("something went wrong in App 1")
    }
}
start()
function createBreadList(breedlist){
    document.getElementById("breed").innerHTML = `
    <select onchange="loadbybreed(this.value)">
        <option>choose a dog breed</option>
        ${Object.keys(breedlist).map(function(breed){
            return `<option>${breed}</option>`
        }).join('')}
    </select>
    `
}
async function loadbybreed(breed){
    if(breed!="choose a dog breed"){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createslideshow(data.message)
    }
}
function createslideshow(images){
    console.log(images)
    let currentposition = 0
    clearInterval(timer)
    clearTimeout(deletefirstphotodelay)
    if(images.length > 1){
        document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide" style="background-image: url('${images[1]}');"></div>
    `
    currentposition += 2
    if(images.length == 2) currentposition = 0
    timer = setInterval(() => {
       document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentposition]}');"></div>`)
       deletefirstphotodelay = setTimeout(() => {
           document.querySelector(".slide").remove()
       }, 1000);
       if(currentposition + 1 >= images.length){
        currentposition = 0
       } else{
        currentposition +=1
       }
    }, 3000);
    }else{
        document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide"></div>
    `
    }
    
}