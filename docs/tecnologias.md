# Tecnologias propostas

O HTML do briefing usa JavaScript e CSS nativos. A stack abaixo descreve o produto a desenvolver.

### React + TypeScript + Vite

Uma interface com contratos tipados e componentes reaproveitáveis.

- **Onde entra:** Aplicativo web responsivo; UI com CSS próprio e primitivas Radix.
- **Contrato:** Estados de carregamento, vazio, falha e foco visível em todas as rotas.
- [Documentação](https://react.dev/)

### Keycloak + OIDC + sessão no servidor

Reutilizar identidade, verificação de e-mail, recuperação e MFA da equipe.

- **Onde entra:** BFF Python com Authlib; JWT verificado na API.
- **Contrato:** Cookie HttpOnly/Secure/SameSite; CSRF; papéis e propriedade conferidos no servidor.
- [Documentação](https://www.keycloak.org/securing-apps/oidc-layers)

### S3 compatível + checksums

Guardar originais e derivados sem transformar o banco em repositório de mídia.

- **Onde entra:** Armazenamento privado por projeto e URLs temporárias.
- **Contrato:** Chaves e permissões geradas no servidor; tamanho, MIME e integridade validados.
- [Documentação](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)

### Linux + Docker Compose + Caddy

Reproduzir o piloto e servir a interface por HTTPS.

- **Onde entra:** Ambientes de desenvolvimento, homologação e piloto separados.
- **Contrato:** Segredos fora do repositório, volumes persistentes e recuperação documentada.
- [Documentação](https://docs.docker.com/compose/)

### Git + CI + pytest + Vitest + Playwright

Verificar cálculo, contrato e percurso completo antes da entrega.

- **Onde entra:** Testes de API Python, componentes e navegador.
- **Contrato:** Versões fixadas no lockfile; testes de falha, autorização e retomada.
- [Documentação](https://playwright.dev/docs/intro)

### OpenTelemetry + Prometheus + Grafana

Observar recepção, latência, falhas e consumo.

- **Onde entra:** Instrumentação no servidor, métricas dos workers e logs estruturados.
- **Contrato:** Sem credenciais nos logs; alertas acionáveis e registro das interrupções.
- [Documentação](https://opentelemetry.io/docs/languages/python/)

### Node.js + NestJS + OpenAPI

Centralizar regras de pedido, restaurante e assinatura.

- **Onde entra:** API REST com validação e autorização por unidade.
- **Contrato:** Preço, disponibilidade e total recalculados no servidor.
- [Documentação](https://docs.nestjs.com/openapi/introduction)

### PostgreSQL + Prisma

Relacionar unidades, pratos, pedidos e cobrança.

- **Onde entra:** Banco com transações e migrações.
- **Contrato:** Pedido conserva snapshot de preço, itens e restaurante; não muda quando o menu é editado.
- [Documentação](https://www.prisma.io/docs/)

### Redis + BullMQ

Preparar modelos, notificar cozinha e processar eventos repetíveis.

- **Onde entra:** Workers separados da criação do pedido.
- **Contrato:** Deduplicação por evento e chave idempotente; status consultável.
- [Documentação](https://docs.bullmq.io/)

### model-viewer + WebXR + Scene Viewer / Quick Look

Oferecer 3D e caminhos AR suportados por cada dispositivo.

- **Onde entra:** Componente de visualização com GLB e alternativa USDZ.
- **Contrato:** HTTPS e gesto do usuário; detectar suporte, pedir câmera no momento adequado e manter fallback 3D.
- [Documentação](https://modelviewer.dev/examples/augmentedreality/)

### Blender + glTF / GLB + USDZ

Preparar malha, textura e dimensões do prato real.

- **Onde entra:** Pipeline de captura, simplificação e inspeção da escala.
- **Contrato:** Usar metros; validar tamanho de referência; orçamento de polígonos e textura testado em celular.
- [Documentação](https://docs.blender.org/manual/en/latest/)

### QR Code + URL de unidade e mesa

Abrir o cardápio sem exigir cadastro.

- **Onde entra:** Link público com slug e identificador de mesa não privilegiado.
- **Contrato:** QR nunca concede permissão administrativa; mesa validada no servidor.
- [Documentação](https://developer.mozilla.org/en-US/docs/Web/API/URL)

### Checkout hospedado do PSP + API de pedidos

Evitar coletar dados de cartão na aplicação.

- **Onde entra:** Adaptador do PSP contratado pelo restaurante; métodos conforme elegibilidade.
- **Contrato:** Servidor cria sessão; webhook assinado confirma pagamento; retorno visual não libera pedido sozinho.
- [Documentação](https://docs.stripe.com/payments/checkout)

### Stripe Billing + Checkout + Customer Portal (proposta)

Gerenciar assinatura mensal do software separada dos pedidos.

- **Onde entra:** Conta de cobrança da plataforma; plano, fatura e edição de meio de pagamento no portal hospedado.
- **Contrato:** Webhooks obrigatórios, acesso por estado da assinatura, eventos idempotentes e testes em sandbox.
- [Documentação](https://docs.stripe.com/billing/subscriptions/overview)

### Sharp + CDN + CORS

Entregar fotos e modelos otimizados com origem permitida.

- **Onde entra:** Armazenamento privado de originais e derivados publicados.
- **Contrato:** Alergênicos e preço são dados da API; imagem ou modelo não substitui a ficha.
- [Documentação](https://sharp.pixelplumbing.com/)
