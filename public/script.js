var ShoppingCart = function () {

  // an array with all of our cart items
  const STORAGE_CART_ID = 'user_cart';

  const getFromCartStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_CART_ID) || '[]');
  }

  let cart = getFromCartStorage();

  const saveCartToStorage = function () {
    localStorage.setItem(STORAGE_CART_ID, JSON.stringify(cart))
  }

  const getFromHandleCartStorage = function () {
    let storedCart = {
      cartItems: cart
    }
    return storedCart;
  }

  const updateCart = function () {
    $('.cart-list').empty()
    var source = $('#cart-template').html()
    var template = Handlebars.compile(source)
    var newHTML = template(getFromHandleCartStorage())
    $('.cart-list').append(newHTML)
    // TODO: Write this function. In this function we render the page.
    // Meaning we make sure that all our cart items are displayed in the browser.
    // Remember to empty the "cart div" before you re-add all the item elements.
  }

  const addItem = function (item) {
    var price = item.data().price;
    var name = item.data().name;
    var id = item.data().id;
    let newItem = {
      name: name,
      price: price,
      id: id,
      count: 1
    }
    for (let item of cart) {
      if (newItem.id === item.id) {
        item.count++;
        return saveCartToStorage()
      }
    } 
    cart.push(newItem)
    return saveCartToStorage()
  }

  const calculateCartTotal = function () {
    let total = 0
    let price = 0
    for (let item of cart) {
        price = item.count * item.price
        total += price
    }
    $('.total').html(total)
  }



  const clearCart = function () {
    cart.length = 0;
    saveCartToStorage()
    // TODO: Write a function that clears the cart ;-)
  }

  const removeItem = function (item) {
    itemId = item.data().id;
    for (let i in cart) {
      if (itemId === cart[i].id) {
        cart.splice(i, 1)
      }
    }
    saveCartToStorage()
  }

  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart,
    calculateCartTotal: calculateCartTotal,
    removeItem: removeItem
  }
};

var app = ShoppingCart();

// update the cart as soon as the page loads!
app.updateCart();
app.calculateCartTotal()


//--------EVENTS---------

$('.view-cart').on('click', function () {
  $('.shopping-cart').toggle()
});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page
  const $item = $(this).closest('.item')
  app.addItem($item);
  app.updateCart();
  app.calculateCartTotal();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
  app.updateCart();
  app.calculateCartTotal()
});

$('.cart-list').on('click', '.removeItem', function () {
  const $item = $(this).closest('.cart-item')
  app.removeItem($item);
  app.updateCart();
  app.calculateCartTotal();
});