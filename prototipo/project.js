window.PROTOTYPE_CONFIG = {
  "id": "mesa",
  "name": "MesaAR",
  "initial": "menu",
  "dark": false,
  "avatar": "12",
  "roles": [
    {
      "id": "customer",
      "name": "Cliente · mesa 12",
      "screens": [
        "menu",
        "dish",
        "ar",
        "cart",
        "checkout",
        "order"
      ]
    },
    {
      "id": "restaurant",
      "name": "Restaurante",
      "screens": [
        "kitchen",
        "admin",
        "order"
      ]
    }
  ],
  "nav": [
    [
      "Cardápio",
      "menu"
    ],
    [
      "Sacola",
      "cart"
    ],
    [
      "Meu pedido",
      "order"
    ],
    [
      "Cozinha",
      "kitchen"
    ]
  ],
  "screens": [
    {
      "id": "menu",
      "title": "Cardápio",
      "note": "Filtre por categoria e abra os detalhes de um prato."
    },
    {
      "id": "dish",
      "title": "Detalhes do prato",
      "note": "Confira ingredientes, alergênicos, quantidade e preço."
    },
    {
      "id": "ar",
      "title": "Simulação na mesa",
      "note": "Posicione a ilustração para entender a proposta da interface AR."
    },
    {
      "id": "cart",
      "title": "Sacola",
      "note": "Altere as quantidades; o total é recalculado na hora."
    },
    {
      "id": "checkout",
      "title": "Confirmação",
      "note": "Simule o pedido sem informar dados pessoais ou pagar."
    },
    {
      "id": "order",
      "title": "Status do pedido",
      "note": "Acompanhe a etapa atual, compartilhada com a cozinha."
    },
    {
      "id": "kitchen",
      "title": "Fila da cozinha",
      "note": "Mova o pedido de recebido para em preparo e pronto."
    },
    {
      "id": "admin",
      "title": "Editar cardápio",
      "note": "Mude preços e disponibilidade e confira o cardápio."
    }
  ]
};
