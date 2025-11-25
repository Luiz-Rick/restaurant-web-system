// Banco de dados de usuários (simulado)
const usuarios = [
    { nome: 'admin', senha: '123456' },
    { nome: 'usuario', senha: 'senha123' },
    { nome: 'test', senha: 'test123' },
    { nome: 'luiz henrique da silva pereira', senha: '123456' },
];

// Função para fazer login
function fazerLogin() {
    // Captura os valores dos inputs
    const nomeUsuario = document.getElementById('usuario').value.trim();
    const senhaUsuario = document.getElementById('senha').value.trim();

    // Validação básica
    if (nomeUsuario === '' || senhaUsuario === '') {
        mostrarErro('Por favor, preencha todos os campos!');
        return;
    }

    // Procura o usuário no banco de dados
    const usuarioEncontrado = usuarios.find(user => 
        user.nome.toLowerCase() === nomeUsuario.toLowerCase() && 
        user.senha === senhaUsuario
    );

    // Verifica se encontrou o usuário
    if (usuarioEncontrado) {
        // Armazena o nome do usuário na sessão
        sessionStorage.setItem('usuarioLogado', usuarioEncontrado.nome);
        
        // Redireciona para a página de usuário logado
        window.location.href = 'logado.html';
    } else {
        // Mostra mensagem de erro
        mostrarErro('Erro, senha inválida. Verifique se seu nome está correto ou senha!');
        
        // Limpa os campos de entrada
        document.getElementById('usuario').value = '';
        document.getElementById('senha').value = '';
        
        // Foca no campo de usuário
        document.getElementById('usuario').focus();
    }
}

// Função para mostrar mensagem de erro
function mostrarErro(mensagem) {
    const elementoErro = document.getElementById('mensagemErro');
    
    if (elementoErro) {
        elementoErro.textContent = mensagem;
        elementoErro.style.display = 'block';
        
        // Remove a mensagem de erro após 5 segundos
        setTimeout(() => {
            elementoErro.style.display = 'none';
        }, 5000);
    } else {
        alert(mensagem);
    }
}

// Função para fazer logout
function fazerLogout() {
    sessionStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
}

// Função para exibir o nome do usuário logado
function exibirUsuarioLogado() {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    
    if (!usuarioLogado) {
        // Se não tem usuário logado, redireciona para login
        window.location.href = 'login.html';
    } else {
        // Exibe o nome do usuário
        const elementoNome = document.getElementById('nomeUsuario');
        if (elementoNome) {
            elementoNome.textContent = usuarioLogado.charAt(0).toUpperCase() + usuarioLogado.slice(1);
        }
    }
}

// Permite fazer login com Enter no formulário
document.addEventListener('DOMContentLoaded', function() {
    const inputSenha = document.getElementById('senha');
    if (inputSenha) {
        inputSenha.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                fazerLogin();
            }
        });
    }
    
    // Se estamos na página de logado, exibe o usuário
    if (window.location.href.includes('logado.html')) {
        exibirUsuarioLogado();
    }
});
