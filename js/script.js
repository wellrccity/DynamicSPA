$(document).ready(function() {
    // Função para carregar conteúdo baseado na rota
    function loadPage(route) {
        $('#content').empty(); // Limpa o conteúdo atual

        // Carregar o script da página específica
        $.getScript('content/pages/' + route + '.js')
            .done(function() {
                // Script carregado com sucesso
            })
            .fail(function() {
                $('#content').html('<p>Página não encontrada.</p>');
            });

        // Atualiza a URL na barra de endereços
        history.pushState(null, '', '/' + route);
    }

    // Configurar eventos de clique nos botões de navegação
    $('button[data-route]').click(function() {
        const route = $(this).data('route');
        loadPage(route); // Carrega a página correspondente
    });

    // Lidar com a navegação do histórico (botão voltar/avançar)
    window.onpopstate = function(event) {
        const path = location.pathname.split('/').pop(); // Obtém a parte da URL
        const route = path === '' ? 'home' : path;
        loadPage(route);
    };

    // Carregar a página com base na URL inicial
    function loadInitialPage() {
        const initialPath = location.pathname.split('/').pop(); // Obtém a parte da URL
        const route = initialPath === '' ? 'home' : initialPath; // Se estiver vazio, define como 'home'
        loadPage(route);
    }

    loadInitialPage();
});
