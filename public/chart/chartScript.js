let ctx1 = document.getElementById('myChart');
let ctx2 = document.getElementById('myChart2');

fetch("http://localhost:3000/api/inventory")
    .then(res => res.json())
    .then(data => {
        createChart(ctx1, data, "bar");
        createChart(ctx2, data, "bar");
    })
    .catch(error => console.error("Error fetching API:", error));

function createChart(ctx, data, type) {
    return new Chart(ctx, {
        type: type,
        data: {
            labels: data.map(r => r.product_id),
            datasets: [{
                label: 'Quantity of Products',
                data: data.map(r => r.quantity),
                backgroundColor: "black",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
