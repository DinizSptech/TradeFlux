// Função para buscar dados do endpoint e popular as tabelas
async function popularTabelas() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/csv");
        const dados = await response.json();

        // Popular a tabela de alertas
        const corpoTabelaAlertas = document.getElementById("corpo-tabela-alertas");
        corpoTabelaAlertas.innerHTML = ""; // Limpa a tabela antes de popular

        // Ordenar os alertas por tempo de resolução (maior primeiro)
        const alertasOrdenados = dados.sort((a, b) => {
            const [h1, m1, s1] = a.tempo_resolucao.split(":").map(Number);
            const [h2, m2, s2] = b.tempo_resolucao.split(":").map(Number);
            return (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
        }).slice(0, 5); // Pega os 5 alertas com maior tempo de resolução

        alertasOrdenados.forEach(alerta => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${alerta.data_center}</td>
                <td>${alerta.data_hora}</td>
                <td>${alerta.tempo_resolucao}</td>
            `;
            corpoTabelaAlertas.appendChild(linha);
        });

        // Calcular e popular a tabela de Data Centers
        const tempoResolucaoPorDataCenter = {};
        dados.forEach(alerta => {
            if (!tempoResolucaoPorDataCenter[alerta.data_center]) {
                tempoResolucaoPorDataCenter[alerta.data_center] = [];
            }
            tempoResolucaoPorDataCenter[alerta.data_center].push(alerta.tempo_resolucao);
        });

        const corpoTabelaDataCenters = document.getElementById("corpo-tabela-datacenters");
        corpoTabelaDataCenters.innerHTML = ""; // Limpa a tabela antes de popular

        // Calcular a média de tempo de resolução
        const medias = Object.keys(tempoResolucaoPorDataCenter).map(dataCenter => {
            const tempos = tempoResolucaoPorDataCenter[dataCenter];
            const mediaTempo = calcularMediaTempo(tempos);
            return { dataCenter, mediaTempo };
        });

        // Ordenar por tempo médio de resolução (maior primeiro) e pegar os 3 piores
        const pioresDataCenters = medias.sort((a, b) => {
            const [h1, m1, s1] = a.mediaTempo.split(":").map(Number);
            const [h2, m2, s2] = b.mediaTempo.split(":").map(Number);
            return (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
        }).slice(0, 3); // Pega os 3 piores Data Centers

        // Popular a tabela com os 3 piores Data Centers
        pioresDataCenters.forEach(item => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${item.dataCenter}</td>
                <td>${item.mediaTempo}</td>
            `;
            corpoTabelaDataCenters.appendChild(linha);
        });

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

// Função para calcular a média de tempo de resolução
function calcularMediaTempo(tempos) {
    const totalSegundos = tempos.reduce((total, tempo) => {
        const partes = tempo.split(":");
        return total + (parseInt(partes[0]) * 3600) + (parseInt(partes[1]) * 60) + parseInt(partes[2]);
    }, 0);

    const mediaSegundos = totalSegundos / tempos.length;
    const horas = Math.floor(mediaSegundos / 3600);
    const minutos = Math.floor((mediaSegundos % 3600) / 60);
    const segundos = Math.floor(mediaSegundos % 60);

    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

// Chama a função para popular as tabelas ao carregar a página
document.addEventListener("DOMContentLoaded", popularTabelas);
