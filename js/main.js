
let buscar = document.getElementById("buscar")
const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'de53e0acb3mshab6c2cb5538caedp12434cjsnf4745b5cb3c8',
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
buscar.addEventListener(("click"),(el)=>{
  el.preventDefault()
let search = document.getElementById("search").value

const url = `https://youtube138.p.rapidapi.com/search/?q=${search}`;
 
// Realizar la solicitud GET utilizando Fetch
fetch(url,options)
.then(function (response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Error en la solicitud. Código de estado: ' + response.status);
    }
})
.then(function (data) {
    // Procesar la respuesta
    // Aquí puedes acceder a los datos devueltos por la API y realizar las acciones necesarias
    console.log(data);
    obtenerId(data);
})
.catch(function (error) {
    // Ha ocurrido un error durante la solicitud
    console.log('Error en la solicitud:', error.message);
});

document.getElementById("search").value = ""
})

function obtenerId(datos) {

  const ID = datos.contents[0].video.videoId;
  console.log(ID);
  document.getElementById("videoYoutube").src = `https://www.youtube-nocookie.com/embed/${ID}`;

  const ID1 = datos.contents[2].video.videoId;
  console.log(ID1);
  document.getElementById("relacion1").src = `https://www.youtube-nocookie.com/embed/${ID1}`;

  const ID2 = datos.contents[5].video.videoId;
  console.log(ID2);
  document.getElementById("relacion2").src = `https://www.youtube-nocookie.com/embed/${ID2}`;

  const ID3 = datos.contents[6].video.videoId;
  console.log(ID3);
  document.getElementById("relacion3").src = `https://www.youtube-nocookie.com/embed/${ID3}`;




  const user = datos.contents[0].video.author.avatar[0].url;
  document.getElementById("user").src = user;

  const nombreCanal = datos.contents[0].video.author.title;
  document.getElementById("nombreCanal").innerHTML = nombreCanal;

  const titulo = datos.contents[0].video.title;
  document.getElementById("tituloVideo").innerText = titulo;
// -------------
  const url2 = `https://youtube138.p.rapidapi.com/video/details/?id=${ID}&hl=en&gl=US`;

  fetch(url2, options)
    .then((respon) => respon.json())
    .then((datos) => mostrardescripcion(datos, ID))
    .catch(function (error) {
      console.log('Error en la solicitud:', error.message);
    });
}


function mostrardescripcion(datos, ID) {

  console.log(datos);
  const description = datos.description;
  console.log(description);
  document.getElementById("descripcion").innerHTML = description;

  const url3 = `https://youtube138.p.rapidapi.com/video/comments/?id=${ID}&hl=en&gl=US`;

  fetch(url3, options)
    .then((respon) => respon.json())
    .then((datos) => mostrarComentarios(datos, ID))
    .catch(function (error) {
      console.log('Error en la solicitud:', error.message);
    });
}

function mostrarComentarios(datos) {
  console.log(datos);
  let coment = ""
  for (const valor of datos.comments) {
    coment += `<p>${valor.content}</p><hr>` 
  }
  console.log(coment);
  document.getElementById("comentarios").innerHTML = coment


}
