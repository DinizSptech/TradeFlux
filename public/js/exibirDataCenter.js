function exibirDataCenters() {
  fetch("/dataCenter/exibir").then((res) => {
    res.json().then((resjson) => {
      for (let i = 0; i < resjson.length; i++) {
        const nomeDC_atual = resjson[i].nome;

        bodyTabela.innerHTML += `
        <tr>
        <td>${nomeDC_atual}</td>
        </tr>`;
      }
    });
  });
}

// for (var i = 0; i < dataCenters.length; i++) {
//     bodyTabela.innerHTML += `
//             <tr>
//             <td>${dataCenters[i].nome}</td>
//             <td>${dataCenters[i].Servidores}</td>
//             <td style="color: ${
//               dataCenters[i].status == "Estável"
//                 ? "#2ecc71"
//                 : dataCenters[i].status == "Perigo"
//                 ? "#f39c12"
//                 : "#e74c3c"
//             };">${dataCenters[i].status}</td>
//             <td style="color: ${
//               dataCenters[i].monitoramento == "Ativo" ? "#2ecc71" : "#e74c3c"
//             };">${dataCenters[i].monitoramento}</td>
//             <td class='tableIcons'> <i class="fa-solid fa-pencil" onclick="abrirModal('edicao'); editarFuncionario(${
//               dataCenters[i].idUsuario
//             }, '${dataCenters[i].nome}', '${dataCenters[i].email}', '${
//       dataCenters[i].senha
//     }', '${dataCenters[i].cargo}', '${dataCenters[i].status}')" ></i></td>
//             <td class='tableIcons deletarUser'><i class="fa-solid fa-trash"  onclick='abrirModal('edicao'); deletar(${
//               dataCenters[i].idUsuario
//             })'></i></td>
//             </tr>
//             `;
//   }
