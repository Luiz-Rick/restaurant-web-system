/* ============================================================
   SCRIPT.JS - Validação e funcionalidades visuais úteis
   AGORA SEM LOGIN/CADASTRO PELO JS
   ============================================================ */

// 🔐 Validação de senha e confirmação em tempo real
const senhaInput = document.getElementById("senha");
const confirmarInput = document.getElementById("confirmarSenha");

if (senhaInput && confirmarInput) {
    confirmarInput.addEventListener("input", function () {
        if (confirmarInput.value !== senhaInput.value) {
            confirmarInput.style.border = "2px solid #ff4757";
        } else {
            confirmarInput.style.border = "2px solid #22c55e";
        }
    });
}

// 📞 Máscara automática para telefone
const telInput = document.getElementById("telefone");

if (telInput) {
    telInput.addEventListener("input", function () {
        let valor = telInput.value.replace(/\D/g, "");
        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
        valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
        telInput.value = valor;
    });
}

// 📍 Máscara automática para CEP
const cepInput = document.getElementById("cep");

if (cepInput) {
    cepInput.addEventListener("input", function () {
        let cep = cepInput.value.replace(/\D/g, "");
        cep = cep.replace(/(\d{5})(\d)/, "$1-$2");
        cepInput.value = cep;
    });
}

// 🚫 Impede envio se senhas forem diferentes
const formCadastro = document.getElementById("formularioCadastro");

if (formCadastro) {
    formCadastro.addEventListener("submit", function (e) {
        if (senhaInput.value !== confirmarInput.value) {
            e.preventDefault();
            alert("❌ As senhas não coincidem!");
            confirmarInput.focus();
        }
    });
}
