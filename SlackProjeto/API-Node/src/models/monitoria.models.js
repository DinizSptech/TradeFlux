const { response } = require("express")

async function fetch_captura_wdv(captura){
  console.log("\n\nCaptura:")
  console.log(captura)
  try{

    const response = await fetch("http://127.0.0.1:8080/tempo_real/monitoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(captura)
    })

    console.log("Dados enviados para wdv com sucesso!\n Status" + response.status)
  } 
  
  catch {
    throw error
  }
    


   

    };


module.exports = {
  fetch_captura_wdv
}