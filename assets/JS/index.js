

var productApi = 'http://localhost:3000/product';

function start() {
    getProducts(renderProducts);
    handleCreatProduct();
}

start();

function getProducts(callback) {
    fetch(productApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function creatProduct(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(productApi, options)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function deleteProduct(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(productApi + '/' + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            var ProductDel = document.querySelector('.container-product-item-' + id);
            if(ProductDel) {
                ProductDel.remove();
            }
        });
}


function renderProducts(products) {
    var listProducts = document.querySelector('.container-product');
    var htmls = products.map(function(product) {
        return `
            <div class="container-product-item container-product-item-${product.id} col l-2">
                <label for="" onclick="deleteProduct(${product.id})" class="container-product-item-delete"><i class="fa-solid fa-xmark"></i></label>
                <img class="container-product-item-image" src="${product.image}" alt="">
                <a href="/" class="container-product-item-name">${product.name}</a>
                <p class="container-product-item-price">${product.price}</p>
                <button class="container-product-item-buy">Mua ngay</button>
            </div>
        `;
    });

    listProducts.innerHTML = htmls.join('');

    getCart();
    
    
}

//shopping cart

function getCart() {
    var btnCart = document.querySelectorAll('.container-product-item-buy');
    btnCart.forEach(function (button) {
        button.addEventListener("click",function(e) {
            var cartItem = e.target
            var productCart = cartItem.parentElement
            var productImg = productCart.querySelector('img').src
            var productname = productCart.querySelector('a').innerText
            var productPrice = productCart.querySelector('p').innerText
            addCart(productImg,productname,productPrice)
        })
    });
    
}

function addCart(productImg,productname,productPrice) {
    var liCart = document.createElement('li');
    var productItemCart = `
        <li class="header-navbar-item-cart-product-li">
            <img class="header-navbar-item-cart-product-li-image" src="${productImg}" alt="">
            <span class="header-navbar-item-cart-product-li-content">
                <h4 class="header-navbar-item-cart-product-li-content-name">${productname}</h4>
                <p class="header-navbar-item-cart-product-li-content-price">${productPrice}</p>
            </span>
            <button class="header-navbar-item-cart-product-li-delete">Xóa</button>
        </li>
    `;
    liCart.innerHTML = productItemCart
    var ulCart = document.querySelector('.header-navbar-item-cart-product-ul');
    ulCart.append(liCart)
    cartCount();
    deleteCart();
}




function deleteCart() {
    var listCart = document.querySelectorAll('.header-navbar-item-cart-product-li')
    for (var i = 0; i < listCart.length; i++) {
        var delBtn = document.querySelectorAll('.header-navbar-item-cart-product-li-delete')
        delBtn[i].addEventListener("click",function(e) {
            var cartDel = e.target
            var CartItemDel = cartDel.parentElement
            CartItemDel.remove();
            cartCount();
        })
    }
}

function cartCount() {
    var listCart = document.querySelectorAll('.header-navbar-item-cart-product-li')
    var noticeCount = document.querySelector('.header-navbar-item-cart-notice')
    var numberCart = 0
    for (var i = 0; i < listCart.length; i++) {
        numberCart = listCart.length
    }
    noticeCount.innerText = numberCart
    
}

// add product

function handleCreatProduct() {
    var btnAddProduct = document.querySelector('.btn-add')

    btnAddProduct.addEventListener("click",function(e) {
        var btnAdd = e.target
        var productCartAdd = btnAdd.parentElement
        var image = productCartAdd.querySelector('input[name=image]').value
        var name = productCartAdd.querySelector('input[name=name]').value
        var price = productCartAdd.querySelector('input[name=price]').value
        
        var productData = {
            image: image,
            name: name,
            price: price
        }

        creatProduct(productData, function() {
            getProducts(renderProducts);
        })
    })
}
