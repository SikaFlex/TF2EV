let totalproductos=[];
let total=0;

function Add(producto, precio) {
    console.log(producto, precio);
    totalproductos.push(producto);
    total= total + precio;
    document.getElementById('total').innerHTML = 'Total:'+total+'€';
}

async function Pay() {
    const listaProductos = await (await fetch("/api/pay", {
      method: "post",
      body: JSON.stringify(totalproductos),
      headers: {
        "Content-type": "application/json"
      }
    })).json();
  }

function vistaProductos(listaProductos){
    let productosHTML='';
    listaProductos.forEach(element => {
        productosHTML += '<div  class="page-content">' +
            '<h3>' + element.nombre + '</h3>' +
            '<img src='+element.imagen+' alt="">' +
            '<h3>' + element.precio + '€/h</h3>' +
            '<button onclick="Add(\''+ element.id+ '\', ' + element.precio + ')">Comprar</button>' +
        '</div>';
    
    });
    document.getElementById('producto').innerHTML = productosHTML;
}


window.onload = async() =>{
   const listaProductos = await (await fetch("/api/productos")).json();
   console.log(listaProductos);
   vistaProductos(listaProductos);
}
