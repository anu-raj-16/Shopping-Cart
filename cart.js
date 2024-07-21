if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartItem = document.getElementsByClassName('delete');
    for (var i = 0; i < removeCartItem.length; i++)
    {
        var button = removeCartItem[i];
        button.addEventListener('click', removeCartEvent);
    }

    var quantityInputs = document.getElementsByClassName('item_quantity');
    for (var i = 0; i < quantityInputs.length; i++)
    {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartbuttons = document.getElementsByClassName('add-to-cart');
    for(var i = 0; i < addToCartbuttons.length; i++) {
        var addToCartbutton = addToCartbuttons[i];
        addToCartbutton.addEventListener('click', addToCartClicked);
    }

    var purchaseButton = document.getElementsByClassName('purchase')[0];
    purchaseButton.addEventListener('click', purchaseItems);
}

function purchaseItems(){
    alert('Thank you for shopping at QuickCart!');
    var cartItemsToPurchase = document.getElementsByClassName('items-rows')[0];
    while(cartItemsToPurchase.hasChildNodes()){
        cartItemsToPurchase.removeChild(cartItemsToPurchase.firstChild);
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('title')[0].innerText;
    var price = shopItem.getElementsByClassName('item-price')[0].innerText.replace("Price: ", "");
    console.log(title, price);
    addItemtoCart(title, price);
}

function addItemtoCart(title, price) {
    var cartRow = document.createElement('div');
    cartRow.innerText = title;
    var cartList = document.getElementsByClassName('items-rows')[0];
    cartRow.classList.add('item-row');
    cartItemNames = document.getElementsByClassName('cart-items');
    for (var i = 0; i < cartItemNames.length; i++){
        item = cartItemNames[i].innerText;
        if (item == title) {
            alert('This item is already added to cart');
            return;
        }
     }
    cartRowContents = `<span class = "cart-items cart-column">${title}</span>
                        <span class = "cart-price cart-column">${price}</span>
                        <div class="cart-quantity cart-column">
                            <input class="item_quantity" type="number" value = "1">
                            <button class="delete">X</button>
                        </div>`
    cartRow.innerHTML = cartRowContents;
    cartList.append(cartRow);
    cartRow.getElementsByClassName('delete')[0].addEventListener('click', removeCartEvent);
    cartRow.getElementsByClassName('item_quantity')[0].addEventListener('change', quantityChanged);
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function removeCartEvent (event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    
}

function updateCartTotal() {
    var cartRows = document.getElementsByClassName('item-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('item_quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}