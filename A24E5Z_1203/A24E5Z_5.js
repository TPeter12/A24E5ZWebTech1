$(document).ready(function () {

    // 1. Szöveg hozzáadása → Programtervező informatikus!
    $("#szoveg").on("click", function () {
        $("#doboz").append("<br><strong>Programtervező informatikus!</strong>");
    });

    // 2. Gomb → hozzáad egy "PTI MI Gomb-ot!"
    $("#gomb").on("click", function () {
        $("#doboz").append('<br><button style="margin-top:10px;">PTI MI Gomb-ot!</button>');
    });

// 3. ÚJ GOMB FELVÉTELE → a "Forrás" UTÁN hozza létre a gombot (MŰKÖDIK!)
    $("#ujgomb").click(function () {
        $(".forras").after('<button style="margin:10px 0; padding:10px; font-size:14px;">ME GEIK-PTI</button>');
    });

    // 4. Fejléc felvétele → <h1>jQuery feladat</h1> az oldal elejére
    $("#fejlec").on("click", function () {
        if ($("h1").length === 0) {
            $("body").prepend('<h1 style="color:black; text-align:left;">jQuery feladat</h1>');
        }
    });

    // 5. Alcím felvétele → <h2>HTML metódusok</h2> a fejléc alá
    $("#alcim").on("click", function () {
        if ($("h1").next("h2").length === 0) {
            $("h1").after('<h2 style="text-align:left; color:black;">HTML metódusok</h2>');
        }
    });

    $("#urlapfej").click(function () {

        // Ha nincs, akkor beszúrjuk közvetlenül az űrlap elé
        $("form").before('<h2 style="color:black; margin:30px 0 10px; font-size:22px;">ŰRLAP-A24E5Z</h2>');
    });

});