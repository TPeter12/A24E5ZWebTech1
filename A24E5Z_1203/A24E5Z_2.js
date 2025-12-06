$(document).ready(function(){
    $("#loadBtn").click(function(){
        $.ajax({
            url: "A24E5Z_orarend1.json",
            dataType: "json",
            success: function(data) {
                let d = data.A24E5Z_orarend;
                let html = `<h2>${d.cim}</h2>`;
                html += `<p>Telefon: ${d.telefonszam.szam} | Mobil: ${d.mobil.szam}</p><hr>`;
                html += "<table border='1'><tr><th>Nap</th><th>Idő</th><th>Tárgy</th><th>Oktató</th><th>Helyszín</th></tr>";
                d.kurzus.forEach(k => {
                    html += `<tr><td>${k.idopont.nap}</td><td>${k.idopont.tol}-${k.idopont.ig}</td><td>${k.targy}</td><td>${k.oktato}</td><td>${k.helyszin}</td></tr>`;
                });
                html += "</table>";
                $("#terulet").html(html);
            }
        });
    });
});