/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];
var Cart1 = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function findPizzaByTitleAndSize(array, propName, propValue, propName1, propValue1) {
    for (var i = 0; i < array.length; i++) {
        if ((array[i]["pizza"][propName] === propValue) && (array[i][propName1] === propValue1)) {
            return i;
        }
    }
    return -1;
}

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом
    var i = findPizzaByTitleAndSize(Cart, "title", pizza.title, "size", size);
    if (i == -1) {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1,
            price: pizza[size]
        });
    }
    else
        Cart[i].quantity++;
    //Оновити вміст кошика на сторінці
        updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити

    Cart.splice(findPizzaByTitleAndSize(Cart, "title", cart_item.pizza.title, "size", cart_item.size), 1);

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    if (Cart.length === 0)
        $(".btn-do-order").attr("class", "btn btn-warning btn-do-order disabled");
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    Cart = ((JSON.parse(localStorage.getItem('cart'))));
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    var order_sum = 0;
    if (Cart.length === 0)
        $(".btn-do-order").attr("class", "btn btn-warning btn-do-order disabled");
    else
        $(".btn-do-order").attr("class", "btn btn-warning btn-do-order active");

    //Очищаємо старі піци в кошику
    $cart.html("");

    ($(".orders-count-span")).text(Cart.length);

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function () {
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function () {
            if (cart_item.quantity > 1)
                cart_item.quantity -= 1;
            else removeFromCart(cart_item);

            updateCart();
        });

        $node.find(".count-clear").click(function () {
            removeFromCart(cart_item);
        });
        order_sum += cart_item.price.price *  cart_item.quantity;

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    $(".sum-number").text(order_sum + " грн.");


    localStorage.setItem('cart', JSON.stringify(Cart));
}

$('.clear-order-wrap').click(function () {
    Cart = [];
    updateCart();
})

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;