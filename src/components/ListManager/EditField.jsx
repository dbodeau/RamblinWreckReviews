import { Autocomplete, TextField } from "@aws-amplify/ui-react";
import { isPlainObject } from "lodash";

export default function EditField ({configItem, value, setValue}) {
  if (configItem.type == 'string') {
    return (
      <TextField
        label={configItem.displayName}
        value={value} 
        onChange={e => setValue(e.target.value)} 
        size='small'
        labelHidden
      />
    )
  }
  else {
    return (
      <Autocomplete
        label={configItem.displayName}
        value={value} 
        options={
          configItem.type == 'enum'
            ? configItem.enumOptions?.map(opt => (isPlainObject(opt)? opt: {id: opt, label: opt}))
            : [{id: 'true', label: 'true'}, {id: 'false', label: 'false'}]
        }
        onChange={null}
        onClear={() =>  setValue('')}
        onSelect={(opt) =>  setValue(opt.id)}
        optionFilter={() => true}
        hasSearchButton={false}
        hasSearchIcon={false}
        size='small'
      />
    )
  }
}