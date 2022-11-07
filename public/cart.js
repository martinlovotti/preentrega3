/* Renderizar Carrito */
/* obtengo el Id del carrito alojada en el p de cartId */
const cartId = document.getElementById("cartId").innerHTML;
const cartContainer = document.getElementById("cartContainer");


/* funcion para renderizar el carrito */
const renderCart = async () => {
  
  const url = `/carrito/${cartId}/productos`
  const data = await fetch(url);
  const productos = await data.json(); 

  cartContainer.innerHTML = "";

  if (productos.length == 0) {
    cartContainer.innerHTML = `    
      <td colspan="4">No hay Productos</td>    
    `;
  } else {
    productos.forEach((el) => {
      cartContainer.innerHTML += `
      <tr>
        <td>${el.name}</td>
        <td>${el.price}</td>
        <td><img src="${el.thumbnail}" class="productImage"></td>
        <td><button class="deleteBtn" name="${cartId}" id="${el._id}">X</button></td>        
      </tr>   
      `;
    });

    const deleteBtn = document.getElementsByClassName("deleteBtn");
    for (let i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].addEventListener("click", (e) => {
        e.preventDefault();
        const idProduct = e.target.id;
        const idCart = e.target.name; 
        deleteProduct(idCart, idProduct);    
      });
    }
  }

};

renderCart();


/* Finalizar Compra */
const form = document.getElementById("finishBuy");
//capturar submit
form.addEventListener("submit", (e) => {

  e.preventDefault();
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  } );  

  finishBuy(data);

});


const finishBuy = (data) => {

  const url = '/carrito/buy';
  const method = "PUT";
  const headers = {
    "Content-Type": "application/json"
  };  
  const body = JSON.stringify(data); 

  fetch(url, {method, headers, body})
    .then(res => res.json())
    .then(res => {    
        alert("Compra Realizada con Exito");  
        //redireccionar
        window.location.href = "/";      
    } )
    .catch(err => console.log(err));

}


const deleteProduct = async (idCart, idProduct) => {

  const url = `/carrito/${idCart}/${idProduct}`;

  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    /* body: JSON.stringify(data)    */
  })

  .then((res) => res.json())
  .then((data) => {
    alert("Producto Eliminado");
    renderCart()
    //window.location.reload();
  });

}



