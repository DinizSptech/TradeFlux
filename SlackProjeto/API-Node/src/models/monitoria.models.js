
async function fetch_captura_wdv(captura){
  fetch("http://localhost:8080/monitoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        captura
      }),
    })

    };


module.exports = {
  fetch_captura_wdv
}