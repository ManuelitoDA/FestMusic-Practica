document.addEventListener('DOMContentLoaded', () => {
    iniciarAPP()
})

function iniciarAPP() {
    navegacionFija()
    crearGaleria()
    scrollNav()
}

const navegacionFija = () => {
    const barra = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')
    const body = document.querySelector('body')

    window.addEventListener('scroll', function() {
        if(sobreFestival.getBoundingClientRect().top < 0) {
            barra.classList.add('fijo')
            body.classList.add('body-scroll')
        } else {
            barra.classList.remove('fijo')
            body.classList.remove('body-scroll')
        }
    })
}

const scrollNav = () => {
    const enlaces = document.querySelectorAll('.navegacion-principal a')
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault()
            const seccionScroll = e.target.attributes.href.value
            const seccion = document.querySelector(seccionScroll)
            seccion.scrollIntoView({ behavior: "smooth"})
        })
    })

    const header = document.querySelector('.to-top-header')
    header.addEventListener('click', (e) => {
        e.preventDefault()
        const seccion = document.querySelector('body')
        seccion.scrollIntoView({ behavior: "smooth"})
    })
}

const crearGaleria = () => {
    const galeria = document.querySelector('.galeria-imagenes')
    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture')
        imagen.innerHTML = `
        <source srcset="./build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="./build/img/thumb/${i}.webp" type="image/webp">
        <img width="200" height="300" src="./build/img/thumb/${i}.jpg" alt="imagen galeria">
        `
        imagen.onclick = function () {
            mostrarImagen(i)
        }
        galeria.appendChild(imagen)
    }
}

const mostrarImagen = (id) => {
    console.log('mostrando ', id)
    const imagen = document.createElement('picture')
    imagen.innerHTML = `
        <source srcset="./build/img/grande/${id}.avif" type="image/avif">
        <source srcset="./build/img/grande/${id}.webp" type="image/webp">
        <img width="200" height="300" src="./build/img/grande/${id}.jpg" alt="imagen galeria">
        `
    //Creacion del overlay
    const overlay = document.createElement('div')
    overlay.classList.add('overlay')
    // overlay.onclick = () => {
    //     overlay.remove()
    // }

    //Boton para cerrar el modal
    const cerrarFoto = document.createElement('p')
    cerrarFoto.textContent = 'X'
    cerrarFoto.classList.add('btn-cerrar')
    cerrarFoto.onclick = () => {
        const body = document.querySelector('body')
        body.classList.remove('static-body')
        overlay.remove()
    }

    //uniendo todo
    overlay.appendChild(imagen)
    overlay.appendChild(cerrarFoto)

    const body = document.querySelector('body')
    body.classList.add('static-body')
    body.appendChild(overlay)
}

