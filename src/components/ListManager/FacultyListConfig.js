export default [
  {
    displayName: "First Name",
    key: "first_name",
    showInShortList: true,
    type: "string",
    readOnly: true
  },
  {
    displayName: "Last Name",
    key: "last_name",
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
    ],
    initialSort: {
      order: 1,
      asc: false
    }
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
    readOnly: true,
    initialSort: {
      order: 0,
      asc: true
    }
  },
  {
    displayName: "Last Modified",
    key: "updated_at",
    type: "string",
    readOnly: true
  },

];