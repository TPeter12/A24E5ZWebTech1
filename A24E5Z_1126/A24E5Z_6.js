    $(function() {
        $("#calc").click(function() {
            let a = parseFloat($("#num1").val());
            let b = parseFloat($("#num2").val());
            let muvelet = $("input[name='op']:checked").val();

            if (isNaN(a) || isNaN(b)) {
                $("#eredmeny").html("<span style='color:red'>Mindkét mezőt ki kell tölteni számmal!</span>");
                return;
            }

            let eredmeny;
            switch(muvelet) {
                case "+": eredmeny = a + b; break;
                case "-": eredmeny = a - b; break;
                case "*": eredmeny = a * b; break;
                case "/":
                    if (b == 0) {
                        $("#eredmeny").html("<span style='color:red'>Nullával nem osztunk!</span>");
                        return;
                    }
                    eredmeny = a / b;
                    break;
            }

            $("#eredmeny").text("Eredmény: " + eredmeny).css("color", "green");
        });
    });