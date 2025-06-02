const { response } = require("express")

async function fetch_captura_wdv(captura){
  console.log("\n\nCaptura:")
  console.log(captura)
  
  fetch("http://127.0.0.1:8080/tempo_real/monitoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(captura)
    })
    .then(response => {
      console.log("Status da response:" + response.status)
    })
   

    };


module.exports = {
  fetch_captura_wdv
}