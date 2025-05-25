// Simulação de dados do banco de dados
        // Em um cenário real, isso viria de uma consulta SQL
        const alertasDoDatabase = [
            { id: 1, data: '2025-04-12', valor: 75.4, medida: 'CPU', criticidade: 0 },
            { id: 2, data: '2025-04-12', valor: 92.1, medida: 'Memória', criticidade: 1 },
            { id: 3, data: '2025-04-13', valor: 82.5, medida: 'CPU', criticidade: 0 },
            { id: 4, data: '2025-04-14', valor: 67.3, medida: 'Disco', criticidade: 0 },
            { id: 5, data: '2025-04-14', valor: 95.8, medida: 'CPU', criticidade: 1 },
            { id: 6, data: '2025-04-15', valor: 88.2, medida: 'Rede', criticidade: 0 },
            { id: 7, data: '2025-04-15', valor: 96.7, medida: 'Memória', criticidade: 1 },
            { id: 8, data: '2025-04-16', valor: 78.9, medida: 'CPU', criticidade: 0 },
            { id: 9, data: '2025-04-17', valor: 91.5, medida: 'Disco', criticidade: 1 },
            { id: 10, data: '2025-04-18', valor: 86.3, medida: 'CPU', criticidade: 0 },
            { id: 11, data: '2025-04-18', valor: 97.2, medida: 'Memória', criticidade: 1 },
            { id: 12, data: '2025-04-19', valor: 85.6, medida: 'CPU', criticidade: 0 },
            { id: 13, data: '2025-04-19', valor: 92.4, medida: 'Rede', criticidade: 1 },
            { id: 14, data: '2025-04-20', valor: 84.7, medida: 'CPU', criticidade: 0 },
            { id: 15, data: '2025-04-21', valor: 93.8, medida: 'Disco', criticidade: 1 },
            { id: 16, data: '2025-04-22', valor: 79.1, medida: 'CPU', criticidade: 0 },
            { id: 17, data: '2025-04-22', valor: 81.6, medida: 'Memória', criticidade: 0 },
            { id: 18, data: '2025-04-23', valor: 89.3, medida: 'CPU', criticidade: 0 },
            { id: 19, data: '2025-04-23', valor: 94.5, medida: 'Rede', criticidade: 1 },
            { id: 20, data: '2025-04-24', valor: 83.9, medida: 'CPU', criticidade: 0 },
            { id: 21, data: '2025-04-25', valor: 87.4, medida: 'Disco', criticidade: 0 },
            { id: 22, data: '2025-04-25', valor: 96.1, medida: 'Memória', criticidade: 1 },
            { id: 23, data: '2025-04-26', valor: 90.8, medida: 'CPU', criticidade: 1 },
            { id: 24, data: '2025-04-26', valor: 77.2, medida: 'Rede', criticidade: 0 },
            { id: 25, data: '2025-04-27', valor: 85.9, medida: 'CPU', criticidade: 0 },
            { id: 26, data: '2025-04-28', valor: 94.3, medida: 'Disco', criticidade: 1 },
            { id: 27, data: '2025-04-28', valor: 82.7, medida: 'Memória', criticidade: 0 },
            { id: 28, data: '2025-04-29', valor: 88.5, medida: 'CPU', criticidade: 0 },
            { id: 29, data: '2025-04-30', valor: 95.6, medida: 'Rede', criticidade: 1 },
            { id: 30, data: '2025-05-01', valor: 86.9, medida: 'CPU', criticidade: 0 },
            { id: 31, data: '2025-05-01', valor: 91.7, medida: 'Memória', criticidade: 1 },
            { id: 32, data: '2025-05-02', valor: 80.4, medida: 'CPU', criticidade: 0 },
            { id: 33, data: '2025-05-03', valor: 93.2, medida: 'Disco', criticidade: 1 },
            { id: 34, data: '2025-05-04', valor: 87.8, medida: 'CPU', criticidade: 0 },
            { id: 35, data: '2025-05-05', valor: 92.9, medida: 'Rede', criticidade: 1 },
            { id: 36, data: '2025-05-06', valor: 84.3, medida: 'CPU', criticidade: 0 },
            { id: 37, data: '2025-05-07', valor: 90.6, medida: 'Memória', criticidade: 1 },
            { id: 38, data: '2025-05-08', valor: 83.1, medida: 'CPU', criticidade: 0 },
            { id: 39, data: '2025-05-09', valor: 94.7, medida: 'Disco', criticidade: 1 },
            { id: 40, data: '2025-05-10', valor: 89.5, medida: 'CPU', criticidade: 0 },
            { id: 41, data: '2025-05-10', valor: 96.3, medida: 'Rede', criticidade: 1 },
            { id: 42, data: '2025-05-11', valor: 75.8, medida: 'CPU', criticidade: 0 }
        ];

        // Função para processar os dados do banco
        function processarDadosDoBanco(dadosDB) {
            const hoje = new Date();
            const diasAtras30 = new Date();
            diasAtras30.setDate(hoje.getDate() - 30);
            
            // Obter intervalo de 30 dias para o calendário
            const datas = [];
            const dataAtual = new Date(diasAtras30);
            
            while (dataAtual <= hoje) {
                datas.push({
                    data: formatarDataSQL(dataAtual),
                    displayData: formatarDataExibicao(dataAtual),
                    diaDaSemana: dataAtual.getDay(),
                    alertasAtencao: 0,
                    alertasCriticos: 0,
                    total: 0
                });
                dataAtual.setDate(dataAtual.getDate() + 1);
            }
            
            // Preencher contagem de alertas para cada dia
            dadosDB.forEach(alerta => {
                const dataIndex = datas.findIndex(d => d.data === alerta.data);
                if (dataIndex >= 0) {
                    if (alerta.criticidade === 0) {
                        datas[dataIndex].alertasAtencao++;
                    } else {
                        datas[dataIndex].alertasCriticos++;
                    }
                    datas[dataIndex].total++;
                }
            });
            
            return datas;
        }
        
        // Função para formatar data no formato SQL (YYYY-MM-DD)
        function formatarDataSQL(data) {
            return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
        }
        
        // Função para formatar data para exibição (DD/MM)
        function formatarDataExibicao(data) {
            return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}`;
        }
        
        // Obter cor para alertas de atenção
        function obterCorAlertaAtencao(valor) {
            if (valor === 0) return '#91cc75'; // Verde - sem alertas
            if (valor <= 2) return '#ffe066'; // Amarelo claro - poucos alertas
            if (valor <= 5) return '#ffc145'; // Amarelo médio - médio
            return '#ffa10a'; // Laranja - muitos alertas
        }
        
        // Obter cor para alertas críticos
        function obterCorAlertaCritico(valor) {
            if (valor === 0) return '#91cc75'; // Verde - sem alertas
            if (valor <= 2) return '#ff9e80'; // Vermelho claro - poucos alertas
            if (valor <= 5) return '#ff6e40'; // Vermelho médio - médio
            return '#ff3d00'; // Vermelho intenso - muitos alertas
        }
        
        // Variável global para armazenar o modo atual (atencao/critico)
        let tipoAlertaAtual = 'atencao';
        
        // Processar os dados
        const dadosProcessados = processarDadosDoBanco(alertasDoDatabase);
        
        // Inicializar interface quando o DOM estiver pronto
        document.addEventListener('DOMContentLoaded', function() {
            // Abas para alternar tipo de alerta
            document.getElementById('abaAlertasAtencao').addEventListener('click', function() {
                definirAbaAtiva(this);
                document.getElementById('legendaAlertasAtencao').style.display = 'flex';
                document.getElementById('legendaAlertasCriticos').style.display = 'none';
                tipoAlertaAtual = 'atencao';
                renderizarCalendario();
            });
            
            document.getElementById('abaAlertasCriticos').addEventListener('click', function() {
                definirAbaAtiva(this);
                document.getElementById('legendaAlertasAtencao').style.display = 'none';
                document.getElementById('legendaAlertasCriticos').style.display = 'flex';
                tipoAlertaAtual = 'critico';
                renderizarCalendario();
            });
            
            // Renderizar inicialmente o calendário
            renderizarCalendario();
        });
        
        function definirAbaAtiva(botaoAba) {
            document.querySelectorAll('.botaoTipoAlerta').forEach(function(botao) {
                botao.classList.remove('ativo');
            });
            botaoAba.classList.add('ativo');
        }
        
        // Renderizar calendário baseado no modo atual
        function renderizarCalendario() {
            const painelCalendario = document.getElementById('calendarioAlertas');
            let htmlCalendario = '';
            
            // Organizar dados por semanas
            const semanas = [];
            let semanaAtual = [];
            
            for (let i = 0; i < dadosProcessados.length; i++) {
                // Adicionar à semana atual
                semanaAtual.push(dadosProcessados[i]);
                
                // Se chegamos ao fim da semana (sábado) ou ao último item, finalizar a semana
                if (dadosProcessados[i].diaDaSemana === 6 || i === dadosProcessados.length - 1) {
                    // Se não começamos no domingo, preencher com espaços vazios
                    if (semanaAtual[0].diaDaSemana !== 0) {
                        const diasVazios = semanaAtual[0].diaDaSemana;
                        for (let e = 0; e < diasVazios; e++) {
                            semanaAtual.unshift(null);
                        }
                    }
                    
                    // Se não terminamos no sábado, preencher com espaços vazios
                    if (semanaAtual[semanaAtual.length - 1] && semanaAtual[semanaAtual.length - 1].diaDaSemana !== 6) {
                        const diasVazios = 6 - semanaAtual[semanaAtual.length - 1].diaDaSemana;
                        for (let e = 0; e < diasVazios; e++) {
                            semanaAtual.push(null);
                        }
                    }
                    
                    semanas.push([...semanaAtual]);
                    semanaAtual = [];
                }
            }
            
            // Renderizar semanas usando innerHTML
            semanas.forEach(semana => {
                htmlCalendario += '<div class="linhaCalendario">';
                
                semana.forEach(dia => {
                    if (dia) {
                        // Definir a cor e o valor da célula com base no modo atual
                        const valorAlerta = tipoAlertaAtual === 'atencao' ? dia.alertasAtencao : dia.alertasCriticos;
                        const corAlerta = tipoAlertaAtual === 'atencao' ? 
                            obterCorAlertaAtencao(valorAlerta) : obterCorAlertaCritico(valorAlerta);
                        
                        // Criar a célula usando template string
                        htmlCalendario += `
                            <div class="celulaCalendario" 
                                style="background-color: ${corAlerta};" 
                                data-data="${dia.displayData}"
                                data-atencao="${dia.alertasAtencao}"
                                data-critico="${dia.alertasCriticos}"
                                data-total="${dia.total}"
                                onmouseover="mostrarBalaoInfo(event, this.dataset)"
                                onmouseout="ocultarBalaoInfo()">
                                <div class="numeroDiaCelula">${dia.displayData}</div>
                                ${valorAlerta}
                            </div>
                        `;
                    } else {
                        htmlCalendario += '<div class="celulaCalendario" style="background-color: #3a3f5c;"></div>';
                    }
                });
                
                htmlCalendario += '</div>';
            });
            
            // Atualizar o HTML do calendário
            painelCalendario.innerHTML = htmlCalendario;
        }
        
        // Funções para controle do tooltip personalizado
        function mostrarBalaoInfo(evento, dadosDia) {
            const balaoInfo = document.getElementById('balaoInfoAlertas');
            balaoInfo.style.display = 'block';
            
            // Posicionar o balão
            balaoInfo.style.left = (evento.pageX + 1) + 'px';
            balaoInfo.style.top = (evento.pageY + 1) + 'px';
            
            // Preencher dados
            balaoInfo.querySelector('.tituloBalaoInfo').textContent = `Data: ${dadosDia.data}`;
            balaoInfo.querySelectorAll('.valorAlertaBalao')[0].textContent = dadosDia.atencao;
            balaoInfo.querySelectorAll('.valorAlertaBalao')[1].textContent = dadosDia.critico;
            balaoInfo.querySelectorAll('.valorAlertaBalao')[2].textContent = dadosDia.total;
        }
        
        function ocultarBalaoInfo() {
            const balaoInfo = document.getElementById('balaoInfoAlertas');
            balaoInfo.style.display = 'none';
        }