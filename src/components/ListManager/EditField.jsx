import { Autocomplete, TextField } from "@aws-amplify/ui-react";
import { isPlainObject } from "lodash";

export default function EditField ({configItem, value, setValue}) {
  const enumItems = 
    configItem.type == 'enum'
      ? configItem.enumOptions?.map(opt => (isPlainObject(opt)? opt: {id: opt, label: opt}))
      : [{id: 'true', label: 'true'}, {id: 'false', label: 'false'}];
  
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
        value={enumItems.find(c => c.id == value)?.label??value} 
        options={enumItems.map(i => ({id: i.id.toString(), label: i.label}))}
        onChange={null}
        onClear={() =>  setValue('')}
        onSelect={(opt) =>  setValue(enumItems.find(i => i.label == opt.label).id)}
        optionFilter={() => true}
        hasSearchButton={false}
        hasSearchIcon={false}
        size='small'
      />
    )
  }
}