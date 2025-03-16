
function validar() {
    var nome = document.getElementById("ipt_nome").value
    var placamae = document.getElementById("ipt_placaMae").value;
    var disco = document.getElementById("ipt_Disco").value;
    var ram = document.getElementById("ipt_Ram").value;
    var sisOpe = document.getElementById("ipt_SO").value;

    document.getElementById("divErroNome").innerHTML = "";
    document.getElementById("divErroMae").innerHTML = "";
    document.getElementById("divErroDisco").innerHTML = "";
    document.getElementById("divErroRam").innerHTML = "";
    document.getElementById("divErroSO").innerHTML = "";


    if(nome == ""){
        document.getElementById("divErroNome").innerHTML = "Campo obrigatório!";
    }
    if (placamae == "") {
        document.getElementById("divErroMae").innerHTML = "Campo obrigatório!";
    }
    if (disco == "") {
        document.getElementById("divErroDisco").innerHTML = "Campo obrigatório!";
    }
    if (ram == "") {
        document.getElementById("divErroRam").innerHTML = "Campo obrigatório!";
    }
    if (sisOpe == "") {
        document.getElementById("divErroSO").innerHTML = "Campo obrigatório!";
    }
}





