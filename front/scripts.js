let listaProductos=[];
let carrito=[];
let total=0;

function Add(producto, precio) {
  
    const prod = listaProductos.find(p => p.id == producto);
    prod.stock--;
    carrito.push(producto);
    total= total + precio;
    document.getElementById('total').innerHTML = 'Total:'+total+'€';
    vistaProductos();
}
    //funcion de pago
async function Pay() {
  try{
    const listaProductos = await (await fetch("/api/pay",{
        method: "post",
        body: JSON.stringify(carrito),
        headers: {
            "Content-Type": "application/json"
        }
    })).json();
}
   catch (error) {
    window.alert("No hay stock")
  }
carrito=[];
total=0;
await fetchProductos();
document.getElementById("total").innerHTML = `Pagar ${total}`
}
     
//visa de como s generar los elementos de la pagina
function vistaProductos(){
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
  vistaProductos();
}

window.onload = async() =>{
   await fetchProductos();

}
