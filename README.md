<div align="center">

![MesaAR — briefing técnico](docs/banner.svg)

**O prato na mesa. Antes do pedido.**

HTML independente · 29 telas · 15 blocos tecnológicos · Fontes incorporadas

[Abrir o HTML](index.html) · [Telas](docs/telas.md) · [Stack](docs/tecnologias.md) · [Arquitetura](docs/arquitetura.md)

</div>

## O projeto

Cardápio com modelos em escala, informações do preparo, sacola e pagamento. Um painel reúne restaurantes, perfis, equipe e cobrança mensal do serviço.

> Dois fluxos financeiros: pagamento do pedido ao restaurante e assinatura mensal do MesaAR. Este briefing não cobra, não cadastra cartão e não faz um pagamento real. Integração com adquirente/PSP será homologada por país, moeda e métodos elegíveis.

Este repositório contém o **briefing técnico navegável e suas demonstrações locais**. As integrações de produção descritas no projeto são o escopo de desenvolvimento, sem servidor compartilhado ou credenciais nesta versão.

## Experimente agora

1. Baixe o repositório em **Code → Download ZIP** ou clone com o comando abaixo.
2. Abra `index.html` no navegador.
3. Explore as telas, filtre a stack e teste a simulação identificada.
4. Use **Imprimir / salvar PDF** para obter a especificação completa, ou exporte o briefing em JSON.

```bash
git clone https://github.com/perabru/mesaar-cardapio-ar.git
cd mesaar-cardapio-ar
```

O arquivo inclui HTML, CSS, JavaScript, fontes e recursos visuais. Não exige instalação, `npm install`, chave de API ou internet para navegar. Os links da documentação oficial exigem conexão.

## O que está disponível

| Recurso | Esta versão |
| --- | --- |
| Inventário de telas | Busca, filtros, objetivo, campos, ações, estados, API e aceite |
| Tecnologias | Responsabilidade, local de uso, contrato e documentação |
| Método | Equações e demonstração com dados locais ou sintéticos |
| Entrega | Responsáveis, testes, pendências e sequência de implementação |
| Impressão | Anexo completo de telas, mesmo com filtro ativo |
| Serviço de produção | Especificado; depende de implementação e homologação |

## Tipografia e identidade

| Papel | Família | Intenção |
| --- | --- | --- |
| Títulos e marca | **Outfit** | Geometria suave e letras arredondadas para um cardápio acolhedor. |
| Texto e controles | **Nunito Sans** | Leitura mais confortável em parágrafos, listas e botões. |
| Código e medidas | **JetBrains Mono** | Alinhamento de valores, rotas e equações. |

As fontes são incorporadas no HTML em WOFF. Textos, controles e rótulos receberam tamanhos maiores e mais espaço entre linhas. Os avisos SIL OFL acompanham o projeto em [créditos de terceiros](THIRD_PARTY_NOTICES.md).

## Percurso principal

1. **Descobrir:** QR/link identifica unidade e mesa.
2. **Escolher:** Preço, porção, ingredientes e alergênicos.
3. **Visualizar:** 3D, AR compatível e escala conferida.
4. **Pedir:** Sacola, revisão e pagamento confirmado.
5. **Operar:** Cozinha, cardápio, equipe e assinatura.

## Telas por área

| Área | Telas |
| --- | ---: |
| Cliente | 10 |
| Restaurante | 8 |
| Assinatura | 6 |
| Admin | 1 |
| Conta | 3 |
| Gestão | 1 |
| **Total** | **29** |

[Consultar todas as telas e critérios de aceite →](docs/telas.md)

## Quem participa

| Área | Responsabilidade |
| --- | --- |
| Produto / interface | Fluxo por QR, acessibilidade, sacola e disponibilidade. |
| 3D / captura | Prato real, textura, escala, GLB/USDZ e ensaio em celulares. |
| Back-end / pagamentos | Isolamento, pedidos, sessões hospedadas, webhooks e reconciliação. |
| Restaurante / operação | Ficha, alergênicos, equipe, cozinha e política de atendimento. |

## Critérios do piloto

- [ ] Pedido de unidade A não usa cardápio ou cobrança da unidade B.
- [ ] Alteração de preço obriga nova revisão antes de confirmar.
- [ ] Webhook duplicado não cria pedido nem baixa duas vezes.
- [ ] Negar câmera mantém 3D e cardápio utilizáveis.
- [ ] Cancelar mensalidade não apaga histórico financeiro dos pedidos.

Os itens descrevem testes da aplicação final. Marcar o checklist do briefing registra leitura local e não comprova a implementação.

## Decisões abertas

- Homologar PSP dos restaurantes e responsabilidades comerciais; nenhum split ou modelo Connect foi contratado.
- Definir planos, limites por unidade, proporcionalidade, carência e cancelamento.
- Capturar pratos reais e validar escala, performance e compatibilidade AR.

## Organização do repositório

| Caminho | Conteúdo |
| --- | --- |
| [`index.html`](index.html) | Briefing completo e independente |
| [`docs/telas.md`](docs/telas.md) | Inventário das telas |
| [`docs/tecnologias.md`](docs/tecnologias.md) | Stack proposta e fontes |
| [`docs/arquitetura.md`](docs/arquitetura.md) | Fluxo e dados do domínio |
| [`docs/banner.svg`](docs/banner.svg) | Identidade aplicada ao README |
| [`font-licenses/`](font-licenses/) | Licenças das fontes incorporadas |
| [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) | Créditos e limites de licenciamento |

## Validação desta entrega

- Sintaxe dos scripts e integridade dos recursos incorporados.
- Referências entre telas e tecnologias.
- Navegação e tipografia verificadas na prévia do navegador.
- Preservação das demonstrações e dos critérios do briefing anterior.

---

<div align="center">

**MesaAR** · Projeto de [Bruno Michel Pera](https://github.com/perabru)

Briefing técnico · Documentação em português · 2026

</div>
