let totalproductos=[];
let total=0;

function Add(producto, precio) {
    console.log(producto, precio);
    totalproductos.push(producto);
    total= total + precio;
    document.getElementById('total').innerHTML = 'Total:'+total+'€';
}

function Pay(){
    window.alert(producto.join(", \n"));
}