# Protótipo navegável · MesaAR

Abra `index.html` em um servidor estático ou use [a página do protótipo](./). Sem build, serviços externos ou dependências de rede. Fontes locais da identidade visual.

## Fluxos

- **Cliente · mesa 12:** Cardápio → Detalhes do prato → Simulação na mesa → Sacola → Confirmação → Status do pedido.
- **Restaurante:** Fila da cozinha → Editar cardápio → Status do pedido.

## Escopo

A interface simula as ações no navegador. Dados, ilustrações SVG e registros são exemplos fictícios. Não há autenticação, envio de arquivos, pagamento, acesso à câmera ou inferência científica. Selecionar arquivos registra somente os nomes; recarregar a página reinicia a sessão.

`project.js` define os percursos; `prototype.js` contém as interações; `prototype.css` aplica o sistema visual. O protótipo substitui o laboratório 3D do projeto de software.
