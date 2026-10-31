# Trilha de estudos - MesaAR

Do modelo do prato à operação do menu.

Fevereiro a julho de 2027. 88 horas estimadas de leitura e prática; não é a estimativa total do produto. O progresso fica no navegador e tem backup próprio na aba Trilha de estudos.

[Baixar kit de exercícios](../materiais/kit-estudos-mesaar.zip)

## E01 - Desenhar o fluxo do restaurante e do cliente

2027-02-01 a 2027-02-07 | 8 h | Base

Base recomendada: início da trilha.

**Aprender:** Git; Unidade e mesa; Pedido; Assinatura; Ficha do prato.

**Prática:** Mapear o pedido do cliente e a mensalidade do restaurante em diagramas separados, com seus estados.

**Conferir:**
- [ ] Unidade identificada
- [ ] Dois fluxos financeiros
- [ ] Critérios de conclusão

**Fontes:**
- [Pro Git em português](https://git-scm.com/book/pt-br/v2) - Git / autores do Pro Git | PT-BR | Leitura gratuita. Commits, branches, revisão e recuperação do trabalho.
- [Aprendendo desenvolvimento web](https://developer.mozilla.org/pt-BR/docs/Learn_web_development) - MDN Web Docs | PT-BR | Leitura gratuita. HTML, CSS, JavaScript, formulários e acessibilidade.

Entregas: P01, P03.

Arquivos: [menu_demo.json](../materiais/menu_demo.json), [protocolo_experimento.md](../materiais/protocolo_experimento.md).

## E02 - Construir menu, equipe e contrato de dados

2027-02-08 a 2027-02-21 | 12 h | Base

Base recomendada: E01.

**Aprender:** React; TypeScript; API; SQL; Autorização por unidade.

**Prática:** Criar menu com disponibilidade e validar no servidor os itens, a unidade e o total em centavos.

**Conferir:**
- [ ] Total recalculado
- [ ] Unidade consistente
- [ ] Permissão testada

**Fontes:**
- [React: primeiros componentes](https://react.dev/learn) - React | EN | Leitura gratuita. Estado, componentes, eventos e listas.
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) - TypeScript / Microsoft | EN | Leitura gratuita. Tipos, interfaces, narrowing e contratos de dados.
- [NestJS: fundamentos](https://docs.nestjs.com/) - NestJS | EN | Leitura gratuita. Módulos, controllers, validação, guards e testes.
- [PostgreSQL: tutorial](https://www.postgresql.org/docs/current/tutorial.html) - PostgreSQL Global Development Group | EN | Leitura gratuita. Tabelas, chaves, joins, consultas e transações.
- [Autenticação com OpenID Connect](https://www.keycloak.org/securing-apps/oidc-layers) - Keycloak | EN | Leitura gratuita. Sessões, papéis e autorização no servidor.

Entregas: P04, P05, P09.

Arquivos: [validar_pedido.js](../materiais/validar_pedido.js), [menu_demo.json](../materiais/menu_demo.json).

## E03 - Preparar malhas, materiais e escala

2027-02-22 a 2027-03-07 | 12 h | Aplicação

Base recomendada: E02.

**Aprender:** Blender; Malha; Textura; glTF; Escala em metros.

**Prática:** Importar o objeto didático, medir a escala e exportar uma malha própria com tamanho e origem registrados.

**Conferir:**
- [ ] Escala medida
- [ ] Asset identificado
- [ ] Tamanho do arquivo registrado

**Fontes:**
- [Blender: manual glTF 2.0](https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html) - Blender | EN | Leitura gratuita. Exportar malha, materiais e escala; confirmar a versão instalada.
- [Registro oficial glTF](https://registry.khronos.org/glTF/) - Khronos Group | EN | Leitura gratuita. Estrutura do asset, unidades, materiais e empacotamento GLB.

Entregas: P02, P06.

Arquivos: [prato_didatico.gltf](../materiais/prato_didatico.gltf).

## E04 - Exibir 3D antes de entrar em AR

2027-03-08 a 2027-03-28 | 10 h | Aplicação

Base recomendada: E03.

**Aprender:** model-viewer; Giro e zoom; Carregamento; Fallback; Acessibilidade.

**Prática:** Exibir a malha de estudo com uma ficha textual acessível mesmo durante a falha de carregamento.

**Conferir:**
- [ ] Visualizador funcional
- [ ] Ficha disponível
- [ ] Falha tratada

**Fontes:**
- [model-viewer: exemplos de AR](https://modelviewer.dev/examples/augmentedreality/) - Google / model-viewer | EN | Leitura gratuita. Posicionamento, escala e alternativas de visualização por plataforma.
- [Aprendendo desenvolvimento web](https://developer.mozilla.org/pt-BR/docs/Learn_web_development) - MDN Web Docs | PT-BR | Leitura gratuita. HTML, CSS, JavaScript, formulários e acessibilidade.

Entregas: P07.

Arquivos: [prato_didatico.gltf](../materiais/prato_didatico.gltf).

## E05 - Testar AR no Android e no iPhone

2027-03-29 a 2027-04-18 | 12 h | Aplicação

Base recomendada: E04.

**Aprender:** WebXR; Scene Viewer; Quick Look; Permissão; Escala e tracking.

**Prática:** Preencher a matriz de dispositivos e conferir suporte real, permissão negada e retorno ao cardápio.

**Conferir:**
- [ ] Android registrado
- [ ] iPhone registrado
- [ ] Escala conferida

**Fontes:**
- [model-viewer: exemplos de AR](https://modelviewer.dev/examples/augmentedreality/) - Google / model-viewer | EN | Leitura gratuita. Posicionamento, escala e alternativas de visualização por plataforma.
- [Scene Viewer no Android](https://developers.google.com/ar/develop/scene-viewer) - Google / ARCore | EN | Leitura gratuita. Formatos aceitos, entrada em AR e comportamento de fallback.
- [Quick Look: galeria e AR](https://developer.apple.com/quick-look-gallery/) - Apple Developer | EN | Leitura gratuita. Explorar modelos e validar o percurso em aparelhos Apple compatíveis.

Entregas: P08, P15.

Arquivos: [matriz_dispositivos.csv](../materiais/matriz_dispositivos.csv).

## E06 - Estudar pagamento e eventos em sandbox

2027-04-19 a 2027-05-16 | 12 h | Aplicação

Base recomendada: E05.

**Aprender:** Checkout hospedado; Preço no servidor; Webhook; Idempotência; Conciliação.

**Prática:** Executar o exercício local de total e duplicatas; depois seguir o tutorial do PSP apenas no ambiente de testes.

**Conferir:**
- [ ] Total íntegro
- [ ] Duplicata ignorada
- [ ] Confirmação pelo servidor

**Fontes:**
- [Checkout hospedado: integração](https://docs.stripe.com/payments/checkout) - Stripe | EN | Leitura gratuita. Aprender o fluxo de pagamento em ambiente de testes; pedido validado no servidor.
- [Testes de cobrança recorrente](https://docs.stripe.com/billing/testing) - Stripe | EN | Leitura gratuita. Simular falha de renovação, inadimplência e retomada em sandbox.
- [NestJS: fundamentos](https://docs.nestjs.com/) - NestJS | EN | Leitura gratuita. Módulos, controllers, validação, guards e testes.

Entregas: P10, P11.

Arquivos: [validar_pedido.js](../materiais/validar_pedido.js), [webhooks_demo.json](../materiais/webhooks_demo.json).

## E07 - Estudar mensalidade, cozinha e operação

2027-05-17 a 2027-05-30 | 12 h | Validação

Base recomendada: E06.

**Aprender:** Assinatura; Portal do cliente; Inadimplência; Status do pedido; Piloto.

**Prática:** Simular renovação recusada e reativação, mantendo histórico do pedido e da assinatura em registros separados.

**Conferir:**
- [ ] Renovação testada
- [ ] Histórico preservado
- [ ] Piloto documentado

**Fontes:**
- [Assinatura com Checkout](https://docs.stripe.com/billing/quickstart) - Stripe | EN | Leitura gratuita. Modelar mensalidade, estados de assinatura e acesso ao portal do cliente.
- [Testes de cobrança recorrente](https://docs.stripe.com/billing/testing) - Stripe | EN | Leitura gratuita. Simular falha de renovação, inadimplência e retomada em sandbox.
- [Playwright: primeiros testes](https://playwright.dev/docs/intro) - Playwright / Microsoft | EN | Leitura gratuita. Testes do percurso do usuário e evidências de falha.

Entregas: P12, P13, P14, P16.

Arquivos: [protocolo_experimento.md](../materiais/protocolo_experimento.md).

## E08 - Transformar evidências em monografia e artigo

2027-06-01 a 2027-07-16 | 10 h | Validação

Base recomendada: E07.

**Aprender:** Busca e fichamento; Método reproduzível; Figuras e tabelas; Citações e referências; Modelo INIC.

**Prática:** Preencher a matriz de referências, redigir um resultado sustentado pelos dados e fechar o primeiro texto integral do artigo em junho.

**Conferir:**
- [ ] Cada número tem origem
- [ ] Referências revisadas
- [ ] Modelo do evento conferido

**Fontes:**
- [Zotero: guia inicial](https://www.zotero.org/support/quick_start_guide) - Zotero | EN | Leitura gratuita. Coleções, metadados, citações e biblioteca compartilhada.
- [Normas e guias de normalização](https://biblioteca.ufes.br/normalizacao) - Sistema Integrado de Bibliotecas / UFES | PT-BR | Leitura gratuita. Conferir normas de apresentação, citações, referências e resumos.
- [INIC: modelo e submissão](https://www.univap.br/inic/submissao_trabalhos.php) - UNIVAP / INIC | PT-BR | Leitura gratuita. Consultar o modelo da edição de 2027 quando divulgado. A consulta atual identifica 2026.

Entregas: M08, M13, M15, A01, A05, A09.

Arquivos: [matriz_referencias.csv](../materiais/matriz_referencias.csv), [protocolo_experimento.md](../materiais/protocolo_experimento.md).

## Hardware e recursos de bancada

| Item | Quantidade | Uso | Etapa / observação |
| --- | --- | --- | --- |
| Computador para web e modelagem | 1 | API, menu, assets e testes | Essencial. 8 a 16 GB de RAM como referência de exercícios pequenos. |
| Android compatível com ARCore | 1 | Homologar Scene Viewer ou WebXR | Teste. Conferir a lista de suporte e registrar versão do sistema. |
| iPhone ou iPad compatível | 1 | Homologar Quick Look | Teste. Registrar aparelho, versão e formato testado. |
| Câmera ou smartphone de captura | 1 | Capturar os pratos reais autorizados | Captura.  |
| Tripé, iluminação difusa e régua | 1 conjunto | Captura consistente e escala | Captura. Registrar dimensão física de referência de cada prato. |
| Prato e ficha validados pela cozinha | Por item | Conferir aparência, ingredientes e disponibilidade | Captura. A ficha real é aprovada pelo restaurante. |
| Mesa giratória | 1 | Facilitar séries de captura | Opcional.  |

## Drive de Pobre: consulta registrada

[Drive de Pobre](https://drivedepobre.com/) | 31/10/2026 | Consulta bloqueada por verificação humana

O catálogo exigiu verificação humana nesta consulta. Nenhum curso ou arquivo do acervo foi validado ou redistribuído. Use os termos como roteiro de busca e confira autoria e permissão na origem. Os materiais desta trilha estão ligados diretamente às fontes e aos exercícios do projeto.

Termos de busca: JavaScript, Blender, realidade aumentada, banco de dados.

## Uso dos arquivos

Os exercícios e dados do kit são autorais e sintéticos. Fontes externas permanecem no endereço do autor. Conferir versão, autoria e permissão antes de reutilizar material externo. A aplicação não depende do catálogo para abrir os recursos da trilha.
