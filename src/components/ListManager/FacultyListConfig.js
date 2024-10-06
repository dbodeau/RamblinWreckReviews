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
  }
];