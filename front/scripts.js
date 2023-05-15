let listaProductos=[];
let carrito=[];
let total=0;
let vistaCarrito=[];


//funcion del boton del elemento
function Add(producto, precio) {
    
    let prod = listaProductos.find(p => p.id == producto);
    prod.stock--;
    carrito.push(producto);
    vistaCarrito.push(prod);
    total= total + precio;
    document.getElementById('total').innerHTML = 'Total:'+total+'€';
}





    //funcion de pago
async function Pay() {
  try{
       listaProductos = await(await fetch("/api/pay",{
        method: "post",
        body: JSON.stringify(carrito),
        headers: {
            "Content-Type": "application/json"
        }
    })).json();

     
    
  }
   catch (error) {
    console.log(error)
  }
const contadorNombres = {};//declaramos fuera del scope por que sino despues no nos dejarar acceder a el
for (let i = 0; i < vistaCarrito.length; i++) { //hacemos el for para que solo nos añada una posicion al contadorNombre por cada nombre que encuentre
  const objeto = vistaCarrito[i];
  const nombre = objeto.nombre;

  if (contadorNombres[nombre]) {//si encuentra otro nombre que lo sume
    contadorNombres[nombre] += 1;
  } else {
    contadorNombres[nombre] = 1;//si no se quede en 1
  }
}

let mensaje = '';//lo dejamos vacio para que cuando se vuelva a ejecutar no se amontonen el texto
for (const nombre in contadorNombres) { //hacemos un for in para contar la veces que se repite nombre dentro de contadorNombres
  const cantidad = contadorNombres[nombre];
  mensaje += `Has comprado el vuelo a: ${nombre}. \nCantidad: ${cantidad}\n`; //pintamos el mensaje por cada contadorNombre que hay
}
window.alert(mensaje);//lo pintamos en un windows alert

vistaCarrito=[];//vaciamos los carritos para que no se acumulen a medida que se use la funcion
carrito=[];
total=0;//
await fetchProductos();//actualizamos el stock
document.getElementById("total").innerHTML = `Pagar ${total}`//acuatlizamos total a 0  pasandole al variable que hemos creado antes.

}






function generateProducts(){
    let productosHTML='';
    listaProductos.forEach(producto => {
    let buttonHTML='<button onclick="Add(\''+ producto.id+ '\', ' + producto.precio + ')">Comprar</button>'
    if(producto.stock<=0){
       buttonHTML='<button disabled class="button disabled" onclick="Add(\''+ producto.id+')">Sin Stock</button>'
    }
    
      productosHTML += '<div  class="page-content">' +
            '<h3>' + producto.nombre + '</h3>' +
            '<img src='+producto.imagen+' alt="">' +
            '<h1>' + producto.precio + '€/h</h1>' +
              buttonHTML +
        '</div>';
    
    });
    document.getElementById('producto').innerHTML = productosHTML;
}


async function fetchProductos(){
  listaProductos=await (await fetch("/api/productos")).json();
  generateProducts();
}

window.onload = async() =>{
   await fetchProductos();

}
