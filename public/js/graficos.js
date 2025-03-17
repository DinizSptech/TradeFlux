const ctx = document.getElementById('graficoRAM').getContext('2d');

new Chart(ctx, {
    type: 'doughnut', // Tipo de gráfico (pode ser 'bar', 'line', etc.)
    data: {
        labels: ['Usado', 'Disponível'],
        datasets: [{
            data: [70, 30], // Percentual de uso da RAM
            backgroundColor: ['#ff6384', '#36a2eb']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});