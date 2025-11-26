// Inicializa usuários do localStorage ou usa dados padrão
let usuarios = JSON.parse(localStorage.getItem('usuariosApp')) || [
    { 
        nomeCompleto: 'admin',
        usuario: 'admin', 
        senha: '123456',
        telefone: '',
        endereco: '',
        numero: '',
        cidade: '',
        estado: '',
        cep: ''
    },
    { 
        nomeCompleto: 'usuario',
        usuario: 'usuario', 
        senha: 'senha123',
        telefone: '',
        endereco: '',
        numero: '',
        cidade: '',
        estado: '',
        cep: ''
    },
    { 
        nomeCompleto: 'test',
        usuario: 'test', 
        senha: 'test123',
        telefone: '',
        endereco: '',
        numero: '',
        cidade: '',
        estado: '',
        cep: ''
    },
    { 
        nomeCompleto: 'luiz henrique da silva pereira',
        usuario: 'luiz henrique da silva pereira', 
        senha: '123456',
        telefone: '',
        endereco: '',
        numero: '',
        cidade: '',
        estado: '',
        cep: ''
    },
    { 
        nomeCompleto: 'felipe',
        usuario: 'felipe', 
        senha: 'teste',
        telefone: '',
        endereco: '',
        numero: '',
        cidade: '',
        estado: '',
        cep: ''
    }
];

// --- NOVA FUNÇÃO: Gerar e Baixar Pessoas.txt ---
function gerarArquivoTxt() {
    let conteudo = "=== LISTA DE USUÁRIOS CADASTRADOS ===\n\n";

    // Percorre cada usuário e formata os dados para o texto
    usuarios.forEach((user, index) => {
        conteudo += `ID: ${index + 1}\n`;
        conteudo += `Nome Completo: ${user.nomeCompleto}\n`;
        conteudo += `Usuário: ${user.usuario}\n`;
        conteudo += `Senha: ${user.senha}\n`;
        conteudo += `Telefone: ${user.telefone}\n`;
        conteudo += `Endereço: ${user.endereco}, ${user.numero}\n`;
        conteudo += `Cidade/UF: ${user.cidade} - ${user.estado}\n`;
        conteudo += `CEP: ${user.cep}\n`;
        conteudo += "--------------------------------------\n";
    });

    // Cria um objeto Blob com o conteúdo de texto
    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });

    // Cria um link temporário para download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Pessoas.txt"; // Nome do arquivo
    a.style.display = "none";
    
    // Adiciona ao corpo do documento, clica e remove
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Salva usuários no localStorage
function salvarUsuariosLocalStorage() {
    localStorage.setItem('usuariosApp', JSON.stringify(usuarios));
}

// Função para fazer login
function fazerLogin() {
    // Carrega usuários do localStorage
    usuarios = JSON.parse(localStorage.getItem('usuariosApp')) || usuarios;
    
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
        user.usuario.toLowerCase() === nomeUsuario.toLowerCase() && 
        user.senha === senhaUsuario
    );

    // Verifica se encontrou o usuário
    if (usuarioEncontrado) {
        // Armazena os dados do usuário na sessão
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
        
        // Redireciona para a página de usuário logado
        window.location.href = 'logado.html';
    } else {
        // Mostra mensagem de erro
        mostrarErro('Erro, usuário ou senha inválida!');
        
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

// Função para fazer cadastro
function fazerCadastro() {
    // Carrega usuários do localStorage
    usuarios = JSON.parse(localStorage.getItem('usuariosApp')) || usuarios;
    
    // Captura os valores dos inputs
    const nomeCompleto = document.getElementById('nomeCompleto').value.trim();
    const usuario = document.getElementById('usuario').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    
    // Limpa mensagens anteriores
    const elementoSucesso = document.getElementById('mensagemSucesso');
    const elementoErro = document.getElementById('mensagemErro');
    if (elementoSucesso) elementoSucesso.style.display = 'none';
    if (elementoErro) elementoErro.style.display = 'none';
    
    // Validação de campos obrigatórios
    if (!nomeCompleto || !usuario || !telefone || !endereco || !numero || !cidade || !estado || !cep || !senha || !confirmarSenha) {
        mostrarErroCadastro('Por favor, preencha todos os campos!');
        return;
    }
    
    // Validação de comprimento mínimo da senha
    if (senha.length < 6) {
        mostrarErroCadastro('A senha deve ter no mínimo 6 caracteres!');
        return;
    }
    
    // Validação se as senhas coincidem
    if (senha !== confirmarSenha) {
        mostrarErroCadastro('As senhas não coincidem!');
        return;
    }
    
    // Validação se o usuário já existe
    const usuarioExistente = usuarios.find(user => 
        user.usuario.toLowerCase() === usuario.toLowerCase()
    );
    
    if (usuarioExistente) {
        mostrarErroCadastro('Este nome de usuário já está em uso. Escolha outro!');
        return;
    }
    
    // Cria novo usuário
    const novoUsuario = {
        nomeCompleto: nomeCompleto,
        usuario: usuario,
        senha: senha,
        telefone: telefone,
        endereco: endereco,
        numero: numero,
        cidade: cidade,
        estado: estado,
        cep: cep
    };
    
    // Adiciona novo usuário à lista
    usuarios.push(novoUsuario);
    
    // Salva usuários no localStorage
    salvarUsuariosLocalStorage();

    // --- GERA O ARQUIVO TXT APÓS O CADASTRO ---
    // Isso vai baixar automaticamente o arquivo 'Pessoas.txt' atualizado
    gerarArquivoTxt();
    
    // Exibe mensagem de sucesso
    mostrarSucessoCadastro('Cadastro realizado! O arquivo Pessoas.txt foi baixado. Redirecionando...');
    
    // Limpa o formulário
    document.getElementById('formularioCadastro').reset();
    
    // Redireciona para login após 2 segundos
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Função para mostrar erro no cadastro
function mostrarErroCadastro(mensagem) {
    const elementoErro = document.getElementById('mensagemErro');
    
    if (elementoErro) {
        elementoErro.textContent = mensagem;
        elementoErro.style.display = 'block';
    } else {
        alert(mensagem);
    }
}

// Função para mostrar sucesso no cadastro
function mostrarSucessoCadastro(mensagem) {
    const elementoSucesso = document.getElementById('mensagemSucesso');
    
    if (elementoSucesso) {
        elementoSucesso.textContent = mensagem;
        elementoSucesso.style.display = 'block';
    }
}

// Função para exibir o nome do usuário logado e seus dados
function exibirUsuarioLogado() {
    const usuarioLogadoStr = sessionStorage.getItem('usuarioLogado');
    
    if (!usuarioLogadoStr) {
        // Se não tem usuário logado, redireciona para login
        window.location.href = 'login.html';
    } else {
        try {
            const usuarioLogado = JSON.parse(usuarioLogadoStr);
            
            // Exibe o nome do usuário
            const elementoNome = document.getElementById('nomeUsuario');
            if (elementoNome) {
                elementoNome.textContent = usuarioLogado.nomeCompleto;
            }
            
            // Exibe os dados do usuário nos campos
            if (document.getElementById('perfilTelefone')) {
                document.getElementById('perfilTelefone').textContent = usuarioLogado.telefone || 'Não informado';
            }
            if (document.getElementById('perfilEndereco')) {
                document.getElementById('perfilEndereco').textContent = usuarioLogado.endereco || 'Não informado';
            }
            if (document.getElementById('perfilNumero')) {
                document.getElementById('perfilNumero').textContent = usuarioLogado.numero || 'Não informado';
            }
            if (document.getElementById('perfilCidade')) {
                document.getElementById('perfilCidade').textContent = usuarioLogado.cidade || 'Não informado';
            }
            if (document.getElementById('perfilEstado')) {
                document.getElementById('perfilEstado').textContent = usuarioLogado.estado || 'Não informado';
            }
            if (document.getElementById('perfilCep')) {
                document.getElementById('perfilCep').textContent = usuarioLogado.cep || 'Não informado';
            }
        } catch (e) {
            console.error('Erro ao processar dados do usuário', e);
            window.location.href = 'login.html';
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