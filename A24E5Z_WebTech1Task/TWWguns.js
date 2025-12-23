fetch("TWWguns.json")
    .then(res => res.json())
    .then(data => loadWeapons(data));

function loadWeapons(weapons) {

    // Oldalsó menü generálása
    const menu = document.getElementById("weapon-menu");
    menu.innerHTML = weapons.map(w =>
        `<li><a href="#${w.id}">${w.title}</a></li>`
    ).join("");

    // Fegyver blokkok generálása a tartalomba
    const container = document.getElementById("weapon-container");

    weapons.forEach(w => {
        const rows = Object.entries(w.data)
            .map(([key, val]) => `<tr><th>${key}</th><td>${val}</td></tr>`)
            .join("");

        container.innerHTML += `
            <section id="${w.id}" class="weapon-block">
                <div class="weapon-img">
                    <img src="${w.img}" alt="${w.title}">
                </div>
                <div class="weapon-info">
                    <h2 class="weapon-title">${w.title}</h2>
                    <table>${rows}</table>
                </div>
            </section>
        `;
    });

    // Excel letöltés gomb működése
    document.getElementById("download-excel").addEventListener("click", function() {
        // Új munkafüzet
        const wb = XLSX.utils.book_new();

        // Összes adat egy nagy táblázatba
        const tableData = [];

        // Egyesítendő cellák gyűjtése (a fegyvernevekhez)
        const merges = [];
        let currentRow = 0;

        weapons.forEach((w, index) => {
            // 1. Fegyver neve (egyesítve 3 oszlopon)
            tableData.push([w.title, "", ""]);
            merges.push({
                s: { r: currentRow, c: 0 },  // kezdő cella
                e: { r: currentRow, c: 2 }   // vég cella (A-tól C-ig)
            });
            currentRow++;

            // 2. Fejléc a tulajdonságokhoz
            tableData.push(["Tulajdonság", "Érték", ""]);
            currentRow++;

            // 3. Tulajdonságok sorai
            Object.entries(w.data).forEach(([key, val]) => {
                tableData.push([key, val, ""]);
                currentRow++;
            });

            // 4. Két üres sor a következő fegyver előtt (szép elválasztás)
            tableData.push(["", "", ""]);
            tableData.push(["", "", ""]);
            currentRow += 2;
        });

        // Munkalap létrehozása
        const ws = XLSX.utils.aoa_to_sheet(tableData);

        // Oszlopok szélessége (szebb megjelenés)
        ws['!cols'] = [
            { wch: 30 },  // Tulajdonság / fegyvernév
            { wch: 25 },  // Érték
            { wch: 5 }     // Kis üres oszlop jobb elválasztáshoz
        ];

        // Cellák egyesítése (fegyvernevek nagy címe)
        ws['!merges'] = merges;

        // Stílus: fegyvernevek félkövér és középre igazított (opcionális, de nagyon szép)
        weapons.forEach((w, index) => {
            const titleRowIndex = index === 0 
                ? 0 
                : weapons.slice(0, index).reduce((sum, prev) => 
                    sum + 3 + Object.keys(prev.data).length + 2, 0); // számoljuk a sorokat

            const cellAddress = XLSX.utils.encode_cell({ r: titleRowIndex, c: 0 });
            if (!ws[cellAddress]) ws[cellAddress] = { v: w.title };
            if (!ws[cellAddress].s) ws[cellAddress].s = {};
            ws[cellAddress].s = {
                font: { bold: true, sz: 14 },
                alignment: { horizontal: "center", vertical: "center" }
            };
        });

        // Munkalap hozzáadása a füzethez
        XLSX.utils.book_append_sheet(wb, ws, "Fegyverek");

        // Fájl letöltése
        XLSX.writeFile(wb, "Vadnyugat_Fegyverek.xlsx");
    });
}