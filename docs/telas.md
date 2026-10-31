# Inventário de telas · MesaAR

29 telas e seus critérios de aceite.

## M01 · Entrada por QR e restaurante

`/r/:slug` · Cliente

Abrir a unidade correta.

- **Campos:** Nome; Mesa; Horário; Situação.
- **Ações:** Confirmar unidade; Explorar.
- **Estados:** QR inválido; Fechado; Mesa inexistente.
- **API:** `GET /v1/restaurants/:slug/menu`
- **Aceite:** Nenhuma permissão administrativa é derivada do QR.

## M02 · Cardápio e categorias

`/r/:slug/menu` · Cliente

Encontrar pratos disponíveis com preço claro.

- **Campos:** Categorias; Foto; Preço; Filtros.
- **Ações:** Buscar; Filtrar; Abrir prato.
- **Estados:** Sem estoque; Categoria vazia.
- **API:** `GET /v1/menu`
- **Aceite:** Item indisponível não pode ser confirmado por uma URL antiga.

## M03 · Ficha do prato

`/pratos/:id` · Cliente

Consultar preparo antes de escolher.

- **Campos:** Ingredientes; Alergênicos; Porção; Preço.
- **Ações:** Ver 3D; Adicionar.
- **Estados:** Ficha incompleta; Foto indisponível.
- **API:** `GET /v1/dishes/:id`
- **Aceite:** Informação reflete o preparo cadastrado; não prometer ausência de contaminação por inferência.

## M04 · Visualizador 3D

`/pratos/:id/3d` · Cliente

Inspecionar prato e dimensão declarada.

- **Campos:** Modelo; Giro; Zoom; Medida.
- **Ações:** Girar; Recentrar; Abrir AR.
- **Estados:** Sem WebGL; Asset inválido.
- **API:** `GET /v1/dishes/:id/model`
- **Aceite:** Modelo com escala revisada; fallback textual e fotográfico disponível.

## M05 · Posicionamento AR

`/pratos/:id/ar` · Cliente

Colocar o prato numa superfície compatível.

- **Campos:** Câmera; Superfície; Escala; Instruções.
- **Ações:** Autorizar; Posicionar; Sair.
- **Estados:** Sem suporte; Câmera negada; Tracking perdido.
- **API:** `Sessão local AR + asset aprovado`
- **Aceite:** Solicitar câmera apenas ao iniciar e retornar ao 3D se falhar.

## M06 · Sacola por unidade

`/sacola` · Cliente

Revisar quantidade, observações e total.

- **Campos:** Itens; Quantidade; Preço; Unidade.
- **Ações:** Editar; Remover; Continuar.
- **Estados:** Preço alterado; Item indisponível.
- **API:** `POST /v1/cart/validate`
- **Aceite:** Troca de restaurante não mistura itens silenciosamente.

## M07 · Revisão e forma de pagamento

`/checkout` · Cliente

Conferir condições antes do PSP.

- **Campos:** Total; Mesa; Taxas; Meios elegíveis.
- **Ações:** Revisar; Confirmar; Abrir checkout.
- **Estados:** Pagamento indisponível; Estoque mudou.
- **API:** `POST /v1/checkout-sessions`
- **Aceite:** Servidor recalcula valor; não guardar cartão nem dados de autenticação.

## M08 · Pagamento pendente ou falhou

`/pedidos/:id/pagamento` · Cliente

Informar o estado real sem duplicar cobrança.

- **Campos:** Estado; Validade; Referência.
- **Ações:** Consultar; Tentar nova sessão.
- **Estados:** Expirado; Falhou; Evento atrasado.
- **API:** `GET /v1/orders/:id/payment`
- **Aceite:** Refresh e retorno do PSP não significam sucesso.

## M09 · Confirmação e acompanhamento

`/pedidos/:id` · Cliente

Acompanhar pedido confirmado e preparo.

- **Campos:** Número; Itens; Pagamento; Status.
- **Ações:** Atualizar; Pedir suporte.
- **Estados:** Pagamento aguardando; Cancelado.
- **API:** `GET /v1/orders/:id`
- **Aceite:** Mostrar confirmado somente após regra de pagamento/atendimento aprovada.

## M10 · Histórico e recibos

`/conta/pedidos` · Cliente

Consultar pedidos da própria conta.

- **Campos:** Data; Unidade; Valor; Recibo.
- **Ações:** Abrir; Baixar.
- **Estados:** Sem pedido; Recibo em processamento.
- **API:** `GET /v1/me/orders`
- **Aceite:** Recibo pertence à conta ou token autorizado do pedido.

## M11 · Painel de unidades

`/gestao` · Restaurante

Selecionar restaurante e resumo operacional.

- **Campos:** Unidades; Pedidos; Plano; Pendências.
- **Ações:** Abrir unidade; Cadastrar.
- **Estados:** Sem vínculo; Unidade arquivada.
- **API:** `GET /v1/me/restaurants`
- **Aceite:** Servidor filtra unidades autorizadas.

## M12 · Cadastro e perfil da unidade

`/gestao/unidades/:id` · Restaurante

Manter dados públicos e operacionais.

- **Campos:** Nome; Endereço; Horário; Contato.
- **Ações:** Editar; Arquivar; Reativar.
- **Estados:** Nome inválido; Sem responsável.
- **API:** `PATCH /v1/restaurants/:id`
- **Aceite:** Arquivar restringe novos pedidos; dados históricos permanecem íntegros.

## M13 · Pratos e categorias

`/gestao/cardapio` · Restaurante

Organizar o menu da unidade.

- **Campos:** Categorias; Ordem; Disponibilidade.
- **Ações:** Criar; Reordenar; Pausar.
- **Estados:** Categoria sem itens; Conflito.
- **API:** `GET/POST /v1/restaurants/:id/dishes`
- **Aceite:** Edição de uma unidade não altera outra.

## M14 · Editar prato, preço e alergênicos

`/gestao/pratos/:id` · Restaurante

Versionar a ficha usada no cardápio.

- **Campos:** Preparo; Ingredientes; Porção; Preço; Alergênicos.
- **Ações:** Salvar; Validar; Publicar.
- **Estados:** Campo faltante; Preço inválido.
- **API:** `PATCH /v1/dishes/:id`
- **Aceite:** Preço usa centavos; pedido antigo conserva seu snapshot.

## M15 · Upload e revisão de modelos

`/gestao/modelos` · Restaurante

Relacionar o asset ao prato real.

- **Campos:** GLB; USDZ; Dimensões; Texturas.
- **Ações:** Enviar; Inspecionar; Aprovar escala.
- **Estados:** Modelo pesado; Escala desconhecida.
- **API:** `POST /v1/model-assets`
- **Aceite:** Asset não aprovado não recebe selo de escala real.

## M16 · Mesas e QR Codes

`/gestao/mesas` · Restaurante

Gerar links públicos da unidade.

- **Campos:** Mesa; URL; Status.
- **Ações:** Criar; Baixar QR; Desativar.
- **Estados:** Mesa duplicada; QR antigo.
- **API:** `GET/POST /v1/restaurants/:id/tables`
- **Aceite:** Desativar mesa invalida novos pedidos pelo seu link.

## M17 · Fila da cozinha

`/gestao/pedidos` · Restaurante

Atender pedidos com estado coerente.

- **Campos:** Número; Itens; Observações; Pagamento.
- **Ações:** Aceitar; Preparar; Concluir.
- **Estados:** Duplicata; Cancelamento; Rede perdida.
- **API:** `GET/PATCH /v1/orders`
- **Aceite:** Transições válidas e responsáveis ficam registrados.

## M18 · Pagamento do pedido e estorno

`/gestao/pagamentos` · Restaurante

Conciliar receita do restaurante.

- **Campos:** Pedido; PSP; Valor; Estado; Estorno.
- **Ações:** Consultar; Conciliar; Solicitar estorno.
- **Estados:** Divergência; Estorno parcial; Sem permissão.
- **API:** `GET /v1/payments · POST /v1/refunds`
- **Aceite:** Valor/conta/moeda conferidos; evento repetido é idempotente.

## M19 · Planos mensais

`/assinatura/planos` · Assinatura

Explicar preço, ciclo e limites do software.

- **Campos:** Plano; Unidades; Limites; Condições.
- **Ações:** Comparar; Selecionar.
- **Estados:** Plano indisponível; Condição não aceita.
- **API:** `GET /v1/plans`
- **Aceite:** A mensalidade não aparece como parte do total do pedido.

## M20 · Contratação da mensalidade

`/assinatura/contratar` · Assinatura

Abrir checkout do plano escolhido.

- **Campos:** Plano; Ciclo; Contratante; Condições.
- **Ações:** Revisar; Abrir checkout.
- **Estados:** Sessão expirada; Pagamento pendente.
- **API:** `POST /v1/billing/checkout`
- **Aceite:** Não ativar serviço apenas pelo redirect de sucesso.

## M21 · Assinatura atual e mudança de plano

`/assinatura` · Assinatura

Ver ciclo e efeito de upgrade/downgrade.

- **Campos:** Status; Renovação; Limites; Proporcionalidade.
- **Ações:** Alterar plano; Revisar efeito.
- **Estados:** Past due; Mudança agendada.
- **API:** `GET/PATCH /v1/subscription`
- **Aceite:** Aplicar política versionada e mostrar data do efeito antes da alteração.

## M22 · Editar forma e dados de cobrança

`/assinatura/cobranca` · Assinatura

Usar portal hospedado para alterar pagamento.

- **Campos:** Cadastro de cobrança; Método mascarado.
- **Ações:** Abrir portal; Atualizar.
- **Estados:** Portal expirado; Sem papel financeiro.
- **API:** `POST /v1/billing/portal`
- **Aceite:** O aplicativo nunca recebe PAN/CVV e não armazena cartão.

## M23 · Faturas e inadimplência

`/assinatura/faturas` · Assinatura

Conferir valores e recuperar pendências.

- **Campos:** Fatura; Período; Estado; Vencimento.
- **Ações:** Baixar; Regularizar.
- **Estados:** Falha; Pagamento assíncrono.
- **API:** `GET /v1/invoices`
- **Aceite:** Estado é reconciliado por webhook e consulta ao provedor.

## M24 · Cancelamento e reativação

`/assinatura/cancelar` · Assinatura

Mostrar consequência e momento do encerramento.

- **Campos:** Fim do ciclo; Acesso; Histórico.
- **Ações:** Revisar; Cancelar; Reativar.
- **Estados:** Cancelamento agendado; Ciclo encerrado.
- **API:** `POST /v1/subscription/cancel`
- **Aceite:** Pedido e fatura anteriores não são apagados no cancelamento.

## M25 · Conciliação e operação

`/admin/operacao` · Admin

Tratar eventos perdidos ou divergentes.

- **Campos:** Webhook; Tentativas; Fila; Incidentes.
- **Ações:** Reprocessar; Conciliar; Auditar.
- **Estados:** Assinatura inválida; Evento duplicado.
- **API:** `POST /v1/webhooks/provider · GET /v1/ops`
- **Aceite:** Webhook exige assinatura e deduplicação; segredo nunca chega à interface.

## M26 · Entrar e criar conta

`/conta/entrar` · Conta

Identificar a pessoa antes de abrir recursos privados.

- **Campos:** Nome público; E-mail; Retorno autorizado.
- **Ações:** Entrar via OIDC; Criar conta; Sair.
- **Estados:** E-mail não confirmado; Sessão expirada; Acesso recusado.
- **API:** `GET /auth/login · GET /auth/callback`
- **Aceite:** Nunca aceitar uma URL de retorno externa sem validação; nenhum token no armazenamento local.

## M27 · Verificação e recuperação de acesso

`/conta/recuperar` · Conta

Concluir verificação e redefinição pelo provedor de identidade.

- **Campos:** Solicitação; Expiração; Estado do link.
- **Ações:** Pedir novo link; Confirmar e-mail; Definir senha no provedor.
- **Estados:** Link expirado; Uso anterior; Limite de tentativas.
- **API:** `Fluxos de ação do Keycloak`
- **Aceite:** Respostas de recuperação não revelam se um endereço está cadastrado.

## M28 · Perfil e preferências

`/conta/perfil` · Conta

Editar os próprios dados e preferências de uso.

- **Campos:** Nome; Idioma; Preferências; Sessões.
- **Ações:** Salvar; Encerrar sessão; Solicitar exportação.
- **Estados:** Erro de validação; Sem conexão; Alteração pendente.
- **API:** `GET/PATCH /v1/me`
- **Aceite:** Uma conta nunca consulta o perfil privado de outra alterando um ID.

## M29 · Equipe, acessos e auditoria

`/gestao/equipe` · Gestão

Vincular pessoas ao escopo correto e registrar mudanças.

- **Campos:** Pessoa; Papel; Projeto; Convites; Histórico.
- **Ações:** Convidar; Revogar; Consultar alterações.
- **Estados:** Convite vencido; Sem permissão; Último responsável.
- **API:** `GET/POST /v1/members · GET /v1/audit`
- **Aceite:** Revogação vale no servidor; manter pelo menos um responsável e trilha de alteração.
