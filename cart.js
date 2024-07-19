var removeCartItem = document.getElementsByClassName('delete');
for (var i = 0; i < removeCartItem.length; i++)
{
    var button = removeCartItem[i];
    button.addEventListener('click', function(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
    })
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
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}