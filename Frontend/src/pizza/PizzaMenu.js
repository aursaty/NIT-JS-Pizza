/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

$(".btn-not-active").click(function () {
    $(".count-title").text($(this).attr("data-title-pizza"));
    $(".btn-active").attr("class", "btn btn-not-active");
    $(this).attr("class", "btn btn-active");
    filterPizza($(this).attr("data-type"));
});

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");
    $('.kek').trigger('click');

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function (pizza) {
        //Якщо піца відповідає фільтру

        if ((pizza.type === filter)||(pizza.content[filter])||("all" === filter))
            pizza_shown.push(pizza);

        //TODO: зробити фільтри

        $(".pizza-count").text(pizza_shown.length)
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;