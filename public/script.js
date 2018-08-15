var ShoppingCart = function () {

  // an array with all of our cart items
  let cart = [];
  // let cartObj = {
  //   cartItems: cart
  // }
  const STORAGE_CART_ID = 'user_cart';
  const saveCartToStorage = function () {
    localStorage.setItem(STORAGE_CART_ID, JSON.stringify(cart))
  }

  const getFromHandleCartStorage = function () {
    let cart = JSON.parse(localStorage.getItem(STORAGE_CART_ID) || '[]');
    let storedCart = {
      cartItems: cart
    }
    return storedCart;
  }
  const getFromCartStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_CART_ID) || '[]');
  }

  var updateCart = function () {
    $('.cart-list').empty()
    var source = $('#cart-template').html()
    var template = Handlebars.compile(source)
    var newHTML = template(getFromHandleCartStorage())
    $('.cart-list').append(newHTML)
    cartTotal()

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
    cart = getFromCartStorage()
    if (!cart.length) {
      cart.push(newItem)
      saveCartToStorage()
    } else { //if cart.length is false
      for (let item of cart) {
        if (newItem.id === item.id) {
          item.idCount++;
          saveCartToStorage()
          return;
        }
      }
      cart.push(newItem)
      saveCartToStorage()
      return;
    }
  }

  var cartTotal = function () {
    let total = 0
    let price = 0
    for (let item of getFromCartStorage()) {
      if (item.idCount > 1) {
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
    saveCartToStorage()
    // TODO: Write a function that clears the cart ;-)
  }

  var removeItem = function (item) {
    itemId = item.data().id;
    for (let i in cart) {
      if (itemId === cart[i].id) {
        cart.splice(cart.indexOf(cart[i]), 1)
      }
    }
    saveCartToStorage()
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
  app.updateCart();
  // app.cartTotal();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
  app.updateCart();
  // app.cartTotal();
});

$('.cart-list').on('click', '.removeItem', function () {
  const $item = $(this).closest('.cart-item')
  app.removeItem($item);
  app.updateCart();
  // app.cartTotal();
});