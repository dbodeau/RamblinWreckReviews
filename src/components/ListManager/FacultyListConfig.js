export default [
  {
    displayName: "Name",
    key: "fullName",
    showInShortList: true,
    type: "string",
    readOnly: true
  },
  {
    displayName: "Email",
    key: "email",
    type: "string",
    readOnly: true
  },
  {
    displayName: "Access Level",
    key: "user_type",
    showInShortList: true,
    type: "enum",
    enumOptions: [
      {
        id: "admin",
        label: "Admin"
      },
      {
        id: "prof",
        label: "Professor"
      }
    ]
  },
  {
    displayName: "Status",
    key: "status",
    showInShortList: true,
    type: "enum",
    enumOptions: [
      {
        id: true,
        label: 'Enabled'
      },
      {
        id: false,
        label: "Disabled"
      }
    ]
  },
  {
    displayName: "Invited By",
    key: "invited_by",
    type: "string",
    readOnly: true
  },
  {
    displayName: "Invited On",
    key: "created_at",
    type: "string",
    readOnly: true
  },
  {
    displayName: "Last Modified",
    key: "updated_at",
    type: "string",
    readOnly: true
  },

];