    $(function() {
        let animacioFut = false;

        $("#animacio").click(function() {
            if (animacioFut) return;
            animacioFut = true;

            $("#doboz")
                .animate({ 
                    left: "800px", 
                    width: "500px", 
                    fontSize: "30pt" 
                }, 1500)

                .animate({ 
                    top: "500px", 
                    width: "300px", 
                    height: "132px"
                }, 1500)

                .animate({ 
                    left: "50px", 
                    opacity: 0.4 
                }, 1500)

                .animate({ 
                    left: "300px", 
                    top: "300px", 
                    width: "300px", 
                    height: "120px", 
                    fontSize: "12pt", 
                    opacity: 1 
                }, 1500, function() {
                    alert("VÉGE");
                    animacioFut = false;
                });
        });

        $("#elrejt").click(function() {
            $("p, b").hide(800);

            $("#doboz").animate({ top: "120px" }, 1000, function() {
                alert("Bekezdések elrejtése");
            });
        });

        $("#osszecsuk").click(function() {
            $("#doboz")
                .animate({ width: "toggle", height: "toggle", fontSize: "toggle" }, 600)
                .animate({ left: "900px" }, 1200);
        });
    });