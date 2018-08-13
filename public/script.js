var ShoppingCart = function () {

  // an array with all of our cart items
  let cart = [];
  let cartObj = {
    cartItems: cart
  }

  var updateCart = function () { 
    $('.cart-list').empty()
    var source = $('#cart-template').html()
    var template = Handlebars.compile(source)
    var newHTML = template(cartObj)
    $('.cart-list').append(newHTML)
    
    // TODO: Write this function. In this function we render the page.
    // Meaning we make sure that all our cart items are displayed in the browser.
    // Remember to empty the "cart div" before you re-add all the item elements.
  }


  var addItem = function (item) {
    var price = item.data().price;
    var name = item.data().name;
    let newItem = {
      name: name,
      price: price
    }
    cart.push(newItem);
    
    // TODO: Write this function. Remember this function has nothing to do with display. 
    // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
  }
  var cartTotal = function () {
    var total = 0
    for (i in cart) {
      let price = cart[i].price;
      total += price
    }
    $('.total').html(total)
  }

      

  var clearCart = function () {
    cart.length = 0;
    // TODO: Write a function that clears the cart ;-)
  }
  
  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart,
    cartTotal: cartTotal
  }
};

var app = ShoppingCart();

// update the cart as soon as the page loads!
app.updateCart();


//--------EVENTS---------

$('.view-cart').on('click', function () {
    $('.shopping-cart').toggle()
  });

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page
  var $item = $(this).closest('.item')
  app.addItem($item);
  app.updateCart();
  app.cartTotal();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
  app.updateCart();
  app.cartTotal();
});