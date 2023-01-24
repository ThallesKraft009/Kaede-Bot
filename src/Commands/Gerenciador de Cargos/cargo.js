module.exports = {
  name: "cargo",
  description: "Sobre Cargos",
  type: 1,
  options: [
    {
      name: "adicionar",
      description: "Adicione um cargo a alguem",
      type: 1,
      default_member_permissions: 1<<28,
      options: [
        {
          name: "cargo",
          description: "Qual cargo você quer adicionar",
          type: 8,
        required: true
        },{
          name: "membro",
          description: "Qual membro você quer adicionar esse cargo",
          type: 6,
          required: true
        }
      ]
    },{
      name: "remover",
      description: "Remova um cargo de algum membro",
      type: 1,
      default_member_permissions: 1<<28,
      options: [
    {
      name: "cargo",
          description: "Qual cargo você quer remover",
          type: 8,
        required: true
        },{
          name: "membro",
          description: "Qual membro você quer remover esse cargo",
          type: 6,
          required: true
    }
      ]
    }
  ],

  run: async(client, interaction) => {}
}