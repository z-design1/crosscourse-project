const consumerkey = "ck_7945f6bfb51e4274ae0d86d066a489d3e8591454";
const secret = "cs_1625e7567725832b7bec429eea074e5eccc0035b";
const apikey = `/?consumerkey=${consumerkey}&secret=${secret}`;
const api_Url = `https://jino.no/wordpress/wp-json/wc/store/products`;
const product_detail = document.querySelector(".product_detail");
const product_name = document.querySelector("#product_name");
async function getapi(url) {
  try {
    const response = await fetch(url);
    var data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (response) {
      hideloader();
    }
    renderProducts(data);
  } catch (error) {
    console.log(error);
  } finally {
    hideloader();
  }
}
function hideloader() {
  document.getElementById("loading").style.display = "none";
}
const renderProducts = (data) => {
  const productDiv = document.querySelector(".products");
  productDiv.innerHTML = "";
  for (let product of data) {
    productDiv.innerHTML += `
    <div class="col">
              <div class="card">
                <img src=${product.images[0]["thumbnail"]} class="bd-placeholder-img card-img-top" width="100%" height="225"/>    
                <div class="card-body">
                  <p class="card-text text-uppercase">${product.name}</p>
                  <p class="card-text"><strong>${product.prices["price"]} NOK</strong></p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary" id=${product.id} onclick="redirectDetail(this.id)">Product Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      `;
  }
};
getapi(`${api_Url}${apikey}`);
async function getProductDetail() {
  try {
    var getProductIdFromUrl = getParameterById("id");
    const response = await fetch(`${api_Url}/${getProductIdFromUrl}${apikey}`);
    var data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    product_name.innerHTML = data.name;
    product_detail.innerHTML = `
    <div class="card" ${data.id}>
    <div class="row g-0">
      <div class="col-md-6 border-end">
        <div class="d-flex flex-column justify-content-center">
          <div class="main_image">
            <img
              src=${data.images[0]["src"]}
              id="main_product_image"
              width="350"
            />
          </div>
          <div class="thumbnail_images">
            <ul id="thumbnail">
              <li>
                <img
                  onclick="changeImage(this)"
                  src=${data.images[0]["thumbnail"]}
                  width="70"
                />
              </li>
              <li>
                <img
                  onclick="changeImage(this)"
                  src=${data.images[0]["thumbnail"]}
                  width="70"
                />
              </li>
              <li>
                <img
                  onclick="changeImage(this)"
                  src=${data.images[0]["thumbnail"]}
                  width="70"
                />
              </li>
              <li>
                <img
                  onclick="changeImage(this)"
                  src=${data.images[0]["thumbnail"]}
                  width="70"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="p-3 right-side">
          <div class="d-flex justify-content-between align-items-center">
            <h3>${data.name}</h3>
            <div class="btn btn-dark" onclick="backToproductsPage()">Back to products list</div>
          </div>
          <div class="mt-2 pr-3">
            <p>
                ${data.short_description}
            </p>
          </div>
          <h3>${data.prices["price"]} NOK</h3>
          <div class="buttons d-flex flex-row mt-5 gap-3">
            <button class="btn btn-dark" id=${getProductIdFromUrl} onclick="addProduct(this.id);">Add to Basket</button>
            <button class="btn btn-dark" id=${getProductIdFromUrl} onclick="redirectBasket(this.id);">Show Basket</button>
          </div>
        </div>
      </div>
    </div>
  </div>
        `;
  } catch (error) {
    console.log(error);
  } finally {
    hideloader();
  }
}
function backToproductsPage() {
  window.location = "Products.html";
}
function redirectDetail(id) {
  window.location = "details.html?id=" + id;
}
function redirectBasket(id) {
  addProduct();
  window.location = "cart_basket.html?id=" + id;
}
function getParameterById(id, url = window.location.href) {
  id = id.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + id + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function changeImage(element) {
  var main_prodcut_image = document.getElementById("main_product_image");
  main_prodcut_image.src = element.src;
}
let products = [];
function getProducts() {
  const lstProducts = JSON.parse(localStorage.getItem("products")) || [];
  return lstProducts;
}
async function addProduct(id) {
  const response = await fetch(`${api_Url}/${id}${apikey}`);
  var data = await response.json();
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  let isProductInCart = false;
  const lstProducts = getProducts();
  if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
  }
  lstProducts.forEach(function (product) {
    if (product.id === parseInt(id)) {
      alert(`This product (${product.name}) is already in your cart.`);
      isProductInCart = true;
    }
  });
  if (!isProductInCart) {
    products.push({
      id: data.id,
      name: data.name,
      image: data.images[0]["src"],
      description: data.short_description,
      price: data.prices["price"],
      quantity: 1,
      subtotal: parseInt(data.prices["price"]),
      total: 0,
    });
    localStorage.setItem("products", JSON.stringify(products));
    alert(`Product (${data.name}) successfully added to your cart.`);
  }
}
async function removeProduct(id) {
  let storageProducts = JSON.parse(localStorage.getItem("products"));
  let products = storageProducts.filter(
    (product) => product.id !== parseInt(id)
  );
  localStorage.setItem("products", JSON.stringify(products));
  LoadBasket();
}
let totalres = "";
function LoadBasket() {
  let storageProducts = JSON.parse(localStorage.getItem("products"));
  if (storageProducts === undefined || storageProducts.length == 0) {
    document.querySelector(
      ".loadbasket"
    ).innerHTML = `<div class="alert alert-secondary" role="alert">
    There are no products in your cart
    </div>`;
    return;
  }
  var results = `
  <table class="table table-hover border bg-white">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th style="width: 10%">Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
  `;
  for (let item of storageProducts) {
    results += `
              <tr>
                <td>
                  <div class="row">
                    <div class="col-lg-2 Product-img">
                      <img
                        src=${item.image}
                        alt="..."
                        class="img-responsive"
                      />
                    </div>
                    <div class="col-lg-10">
                      <h4 class="nomargin">${item.name}</h4>
                      <p>
                      ${item.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td>${item.price} NOK</td>
                <td>
                  <input
                    type="number"
                    class="form-control text-center"
                    value=${parseInt(item.quantity)} onchange="basketUpdate(${item.id},this.value,${item.price})"
                  />
                </td>
                <td id="subtotal">${item.subtotal}</td>
                <td class="actions" data-th="" style="width: 10%">
                  <button class="btn btn-danger btn-sm" id=${
                    item.id
                  } onclick="removeProduct(this.id);"">
                    <i class="fa fa-trash-o"></i>
                  </button>
                </td>
              </tr>            
    `;
    // totalres = `Total: ${item.total}`;
  }
  var sum = 0;
  for (let itemRes of storageProducts) {
    sum += parseInt(itemRes.subtotal);
  }
  totalres = `Total: ${sum}`;
  results += `
    </tbody>
    <tfoot>
              <tr>
                <td>
                  <a href="Products.html" class="btn btn-warning text-white"
                    ><i class="fa fa-angle-left"></i> Continue Shopping</a
                  >
                </td>
                <td colspan="2" class="hidden-xs"></td>
                <td class="hidden-xs text-center" style="width: 10%">
                  <strong id="total">${totalres}</strong>
                </td>
                <td>
                  <a href="#" class="btn btn-success btn-block"
                    >Checkout <i class="fa fa-angle-right"></i
                  ></a>
                </td>
              </tr>
            </tfoot>
          </table>
    `;
  document.querySelector(".loadbasket").innerHTML = results;
}
function basketUpdate(id, quantity, price) {
  var subTotal = document.querySelector("#subtotal");
  var total = document.querySelector("#total");
  var items = JSON.parse(localStorage.getItem("products")) || [];
  var item = items.find((item) => item.id === parseInt(id));
  subTotal.innerHTML = parseInt(price) * parseInt(quantity);
  var subtotalres = parseInt(price) * parseInt(quantity);
  if (item) {
    item.quantity = parseInt(quantity);
    item.subtotal = subtotalres;
    item.total = total;
  } else {
    items.push({
      id,
      name,
      image,
      description,
      price,
      quantity,
      subtotal,
      total,
    });
  }
  var sum = 0;
  for (let itemRes of items) {
    sum += parseInt(itemRes.subtotal);
  }
  total.innerHTML = `Total: ${sum}`;
  localStorage.setItem("products", JSON.stringify(items));
}

