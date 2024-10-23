export default [
    {
        displayName: "Title",
        key: "title",
        showInShortList: true,
        type: "string",
        readOnly: true
    },
    {
        displayName: "Type",
        key: "type",
        showInShortList: true,
        type: "enum",
        enumOptions: [
            {
                id: true,
                label: 'Bubble'
            },
            {
                id: false,
                label: "Short Answer"
            }
        ]
    },
    {
        displayName: "Content",
        key: "content",
        type: "string",
        readOnly: true
    },
    {
        displayName: "Mandatory",
        key: "isMandatory",
        showInShortList: true,
        type: "bool",
        readOnly: true
    },
    {
        displayName: "Category",
        key: "category",
        type: "bool",
        readOnly: true
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
        displayName: "Created By",
        key: "created_by",
        type: "string",
        readOnly: true
    },
    {
        displayName: "Create On",
        key: "creation_time",
        type: "string",
        readOnly: true
    },
    {
        displayName: "Last Modified",
        key: "last_modified", // status change time?
        type: "string",
        readOnly: true
    },
];