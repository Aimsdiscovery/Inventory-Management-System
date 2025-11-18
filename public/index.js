fetch("http://localhost:3000/api/inventory")
    .then(res =>res.json())
    .then(dataInv => {
        if (dataInv.length > 0) {
            let temp = "";

            dataInv.forEach(itemData => {
                temp += "<tr>";
                temp += "<td>" + itemData.inventory_id + "</td>";
                temp += "<td>" + itemData.product_name + "</td>";
                temp += "<td>" + itemData.quantity + "</td>";
                temp += "<td>" + itemData.last_updated + "</td>";
                temp += "</tr>";
            });
            document.getElementById('dataInv').innerHTML = temp;
        }
    })
    .catch(error => console.error('Error fetching data', error));

    fetch("http://localhost:3000/api/products")
    .then(res =>res.json())
    .then(dataPro => {
        if (dataPro.length > 0) {
            let temp = "";

            dataPro.forEach(itemData => {
                temp += "<tr>";
                temp += "<td>" + itemData.product_id + "</td>";
                temp += "<td>" + itemData.product_name + "</td>";
                temp += "<td>" + itemData.category_name + "</td>";
                temp += "<td>" + itemData.price + "</td>";
                temp += "<td>" + itemData.created_at + "</td>";
                temp += "</tr>";
            });
            document.getElementById('dataPro').innerHTML = temp;
        }
    })
    .catch(error => console.error('Error fetching data', error));

    fetch("http://localhost:3000/api/purchase")
    .then(res =>res.json())
    .then(dataPur => {
        if (dataPur.length > 0) {
            let temp = "";

            dataPur.forEach(itemData => {
                temp += "<tr>";
                temp += "<td>" + itemData.purchase_id + "</td>";
                temp += "<td>" + itemData.product_name + "</td>";
                temp += "<td>" + itemData.supplier_name + "</td>";
                temp += "<td>" + itemData.quantity + "</td>";
                temp += "<td>" + itemData.unit_price + "</td>";
                temp += "<td>" + itemData.total_amount + "</td>";
                temp += "</tr>";
            });
            document.getElementById('dataPur').innerHTML = temp;
        }
    })
    .catch(error => console.error('Error fetching data', error));

    fetch("http://localhost:3000/api/sales")
    .then(res =>res.json())
    .then(dataSal => {
        if (dataSal.length > 0) {
            let temp = "";

            dataSal.forEach(itemData => {
                temp += "<tr>";
                temp += "<td>" + itemData.sale_id + "</td>";
                temp += "<td>" + itemData.product_name + "</td>";
                temp += "<td>" + itemData.customer_name + "</td>";
                temp += "<td>" + itemData.quantity + "</td>";
                temp += "<td>" + itemData.unit_price + "</td>";
                temp += "<td>" + itemData.total_amount + "</td>";
                temp += "</tr>";
            });
            document.getElementById('dataSal').innerHTML = temp;
        }
    })
    .catch(error => console.error('Error fetching data', error));