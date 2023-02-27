module.exports = {
  name: "cargo",
  description: "Gerenciamento de Cargos",
  default_member_permissions: "ManageRoles",
  type: 1,
  options: [
    {
      name: "criar",
      description: "Crie um cargo no servidor",
      type: 1,
      options: [
        {
          name: "nome",
          description: "Qual o nome do cargo",
          type: 3,
          required: true
        }
      ]
    },{
      name: "deletar",
      description: "Delete um cargo no servidor",
      type: 1,
      options: [
        {
          name: "cargo",
          description: "Qual cargo a ser deletado",
          type: 8,
          required: true
        }
      ]
    },{
      name: "adicionar",
      description: "Adicione um cargo pra um membro",
      type: 1,
      options: [
        {
          name: "membro",
          description: "Selecione o membro",
          type: 6,
          required: true
        },{
          name: "cargo",
          description: "Selecione um cargo",
          type: 8,
          required: true
        }
      ]
    },{
      name: "remover",
      description: "Remova um cargo de um membro",
      type: 1,
      options: [
        {
          name: "membro",
          description: "Selecione o membro",
          type: 6,
          required: true
        },{
          name: "cargo",
          description: "Selecione um cargo",
          type: 8,
          required: true
        }
      ]
    }
  ], 
  run: async(client, interaction) => {

    let { guild, user } = interaction;
    
  }
}