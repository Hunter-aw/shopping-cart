var AddItem = function(){
    let items = [];
    let addThis = function(){
        let itemName = $('#item-name').val();
        let itemPrice = $('#item-price').val();
        let itemFile = $('#item-file').val();
        let itemObj = {
            name: itemName,
            price: itemPrice,
            file: itemFile
        }
        items.push(itemObj);
        console.log(items);
    }
    return{
        addThis: addThis
    }
}
let app = AddItem();
$('.btn').on('click', function(){
    app.addThis();
});