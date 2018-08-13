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
    var id = item.data().id;
    let newItem = {
      name: name,
      price: price,
      id: id,
      idCount: 1
    }
    if (cart.length > 0) {
      for (let something of cart) {
        if (newItem.id === something.id){
          something.idCount ++;
          return;
        }
      } cart.push(newItem)
        return;
    } else {
      cart.push(newItem);
    } 
  }

  var cartTotal = function () {
    let total = 0
    let price = 0
    for (let item of cart) {
      if(item.idCount > 1){
        price = item.idCount * item.price
        total += price
      } else {
        price = item.price;
        total += price
      }
    }
    $('.total').html(total)
  }

      

  var clearCart = function () {
    cart.length = 0;
    // TODO: Write a function that clears the cart ;-)
  }

  var removeItem = function (item) {
    itemId = item.data().id;
    for (let i in cart) {
      if (itemId === cart[i].id) {
        cart.splice(cart.indexOf(cart[i]))
      }
    }
  }
  
  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart,
    cartTotal: cartTotal,
    removeItem: removeItem
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
  const $item = $(this).closest('.item')
  app.addItem($item);
  app.updateCart()
  app.cartTotal();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
  app.updateCart();
  app.cartTotal();
});

$('.cart-list').on('click', '.removeItem', function() {
  const $item = $(this).closest('.cart-item')
  app.removeItem($item);
  app.updateCart();
  app.cartTotal();
});