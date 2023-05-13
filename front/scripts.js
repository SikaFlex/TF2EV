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
  
  let mensaje = "Los productos disponibles son:\n\n";
for (let i = 0; i < carrito.length; i++) {
 
  mensaje += `Has comprado: ${vistaCarrito[i].nombre} Quedan: ${listaProductos[i].stock} disponibles  "\n"`;
}


alert(mensaje);

carrito=[];
total=0;
await fetchProductos();
document.getElementById("total").innerHTML = `Pagar ${total}`

}
function carritoRuta() {
  window.location.href = '/carrito';
}
//vista de como s generar los elementos de la pagina
function generateProducts(){
    let productosHTML='';
    listaProductos.forEach(producto => {
    let buttonHTML='<button onclick="Add(\''+ producto.id+ '\', ' + producto.precio + ')">Comprar</button>'
    if(producto.stock<=0){
       buttonHTML='<button disabled class="button disabled" onclick="Add(\''+ producto.id+ '\', ' + producto.precio + ')">Sin Stock</button>'
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
