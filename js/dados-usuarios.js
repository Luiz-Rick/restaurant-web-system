// ============================================
// GERENCIADOR DE DADOS DE USUÁRIOS
// Arquivo para gerenciar import/export de dados
// ============================================

// Exporta usuários para arquivo TXT
function exportarUsuariosParaTXT() {
    // Carrega os usuários do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuariosApp')) || [];
    
    if (usuarios.length === 0) {
        alert('Nenhum usuário para exportar!');
        return;
    }
    
    // Cria conteúdo formatado para TXT
    let conteudoTXT = '=== ARQUIVO DE USUÁRIOS CADASTRADOS ===\n';
    conteudoTXT += `Data da Exportação: ${new Date().toLocaleString('pt-BR')}\n`;
    conteudoTXT += `Total de Usuários: ${usuarios.length}\n`;
    conteudoTXT += '==========================================\n\n';
    
    usuarios.forEach((user, index) => {
        conteudoTXT += `USUÁRIO ${index + 1}:\n`;
        conteudoTXT += `Nome Completo: ${user.nomeCompleto}\n`;
        conteudoTXT += `Usuário: ${user.usuario}\n`;
        conteudoTXT += `Senha: ${user.senha}\n`;
        conteudoTXT += `Telefone: ${user.telefone}\n`;
        conteudoTXT += `Endereço: ${user.endereco}\n`;
        conteudoTXT += `Número: ${user.numero}\n`;
        conteudoTXT += `Cidade: ${user.cidade}\n`;
        conteudoTXT += `Estado: ${user.estado}\n`;
        conteudoTXT += `CEP: ${user.cep}\n`;
        conteudoTXT += '==========================================\n\n';
    });
    
    // Cria blob e faz download
    const blob = new Blob([conteudoTXT], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `usuarios_${new Date().getTime()}.txt`;
    link.click();
    
    console.log('Usuários exportados com sucesso!');
}

// Importa usuários de arquivo TXT
function importarUsuariosDeArquivo(arquivoInput) {
    // Verifica se um arquivo foi selecionado
    if (!arquivoInput.files || arquivoInput.files.length === 0) {
        alert('Por favor, selecione um arquivo!');
        return;
    }
    
    const arquivo = arquivoInput.files[0];
    const leitor = new FileReader();
    
    leitor.onload = function(evento) {
        try {
            const conteudo = evento.target.result;
            const usuariosImportados = parsearArquivoUsuarios(conteudo);
            
            if (usuariosImportados.length === 0) {
                alert('Nenhum usuário válido encontrado no arquivo!');
                return;
            }
            
            // Salva os usuários importados no localStorage
            const usuariosExistentes = JSON.parse(localStorage.getItem('usuariosApp')) || [];
            const usuariosMesclados = mesclarUsuarios(usuariosExistentes, usuariosImportados);
            
            localStorage.setItem('usuariosApp', JSON.stringify(usuariosMesclados));
            
            alert(`${usuariosImportados.length} usuário(s) importado(s) com sucesso!`);
            console.log('Usuários importados:', usuariosImportados);
            
            // Atualiza a variável global
            if (typeof usuarios !== 'undefined') {
                usuarios = usuariosMesclados;
            }
            
            // Limpa o input de arquivo
            arquivoInput.value = '';
            
        } catch (erro) {
            console.error('Erro ao importar arquivo:', erro);
            alert('Erro ao importar arquivo. Verifique o formato.');
        }
    };
    
    leitor.readAsText(arquivo, 'UTF-8');
}

// Parseia o arquivo TXT e extrai usuários
function parsearArquivoUsuarios(conteudo) {
    const usuariosImportados = [];
    
    // Divide por linhas
    const linhas = conteudo.split('\n');
    let usuarioAtual = null;
    
    for (let linha of linhas) {
        linha = linha.trim();
        
        if (linha.startsWith('USUÁRIO')) {
            // Se já temos um usuário, salva e cria novo
            if (usuarioAtual && usuarioAtual.usuario) {
                usuariosImportados.push(usuarioAtual);
            }
            usuarioAtual = {
                nomeCompleto: '',
                usuario: '',
                senha: '',
                telefone: '',
                endereco: '',
                numero: '',
                cidade: '',
                estado: '',
                cep: ''
            };
        } else if (linha.startsWith('Nome Completo:')) {
            usuarioAtual.nomeCompleto = linha.replace('Nome Completo:', '').trim();
        } else if (linha.startsWith('Usuário:')) {
            usuarioAtual.usuario = linha.replace('Usuário:', '').trim();
        } else if (linha.startsWith('Senha:')) {
            usuarioAtual.senha = linha.replace('Senha:', '').trim();
        } else if (linha.startsWith('Telefone:')) {
            usuarioAtual.telefone = linha.replace('Telefone:', '').trim();
        } else if (linha.startsWith('Endereço:')) {
            usuarioAtual.endereco = linha.replace('Endereço:', '').trim();
        } else if (linha.startsWith('Número:')) {
            usuarioAtual.numero = linha.replace('Número:', '').trim();
        } else if (linha.startsWith('Cidade:')) {
            usuarioAtual.cidade = linha.replace('Cidade:', '').trim();
        } else if (linha.startsWith('Estado:')) {
            usuarioAtual.estado = linha.replace('Estado:', '').trim();
        } else if (linha.startsWith('CEP:')) {
            usuarioAtual.cep = linha.replace('CEP:', '').trim();
        }
    }
    
    // Adiciona o último usuário
    if (usuarioAtual && usuarioAtual.usuario) {
        usuariosImportados.push(usuarioAtual);
    }
    
    return usuariosImportados;
}

// Mescla usuários evitando duplicatas
function mesclarUsuarios(usuariosExistentes, usuariosNovos) {
    const usuariosMesclados = [...usuariosExistentes];
    
    for (let usuarioNovo of usuariosNovos) {
        // Verifica se já existe um usuário com o mesmo nome de usuário
        const jaExiste = usuariosMesclados.some(user => 
            user.usuario.toLowerCase() === usuarioNovo.usuario.toLowerCase()
        );
        
        if (!jaExiste) {
            usuariosMesclados.push(usuarioNovo);
        }
    }
    
    return usuariosMesclados;
}

// Exporta dados em formato JSON (alternativo)
function exportarUsuariosJSON() {
    const usuarios = JSON.parse(localStorage.getItem('usuariosApp')) || [];
    
    if (usuarios.length === 0) {
        alert('Nenhum usuário para exportar!');
        return;
    }
    
    const blob = new Blob([JSON.stringify(usuarios, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `usuarios_${new Date().getTime()}.json`;
    link.click();
}

// Obtém estatísticas dos usuários
function obterEstatisticasUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuariosApp')) || [];
    
    return {
        total: usuarios.length,
        usuariosComTelefone: usuarios.filter(u => u.telefone).length,
        usuariosComEndereco: usuarios.filter(u => u.endereco).length,
        cidades: [...new Set(usuarios.map(u => u.cidade).filter(c => c))],
        estados: [...new Set(usuarios.map(u => u.estado).filter(e => e))]
    };
}
