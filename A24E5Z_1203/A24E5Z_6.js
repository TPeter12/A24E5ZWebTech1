$(document).ready(function() {

    // 1. Doboz eltávolítása gombra kattintva eltünteti a dobozt
    $("#eltavolit").click(function() {
        $("#doboz").remove();  // teljesen eltávolítja az elemet a DOM-ból
        // Alternatíva: $("#doboz").hide();  // csak elrejti
    });

    // 2. A DIV elemek kiürítése gombra kattintva eltünteti a dobozba írt szöveget
    $("#kiurit").click(function() {
        $("#doboz").empty();   // csak a tartalmat törli, maga a div marad
        // Alternatíva: $("#doboz").html(""); vagy .text("")
    });

});