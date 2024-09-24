import { Button, View, Text } from "@aws-amplify/ui-react";
import { MdAdd, MdOutlineRemove, MdSave } from "react-icons/md";
import { useState } from "react";
import EditField from "./EditField";

export default function FilterBar ({config, activeFilters, setActiveFilters}) {
  const [newFilter, setNewFilter] = useState(null);

  const addFilter = () => {
    setActiveFilters(filters => [...filters, newFilter]);
  };

  const updateFilter = (filter) => {
    setActiveFilters(filters => 
      filters.map(f => 
        f.key == filter.key
          ? filter 
          : f
      )
    );
  };

  const removeFilter = (key) => {
    setActiveFilters(filters => 
      filters.filter(f => f.key != key)
    );
  };

  const enableNewFilter = () => {
    setNewFilter({key: '', value: ''});
  };

  const setNewFilterKey = (key) => {
    setNewFilter({key, value: ''});
  };

  const setNewFilterValue = (value) => {
    setNewFilter(filter => ({...filter, value}));
  };

  const getConfigForKey = (key) => {
    return config.find(c => c.key == key);
  };

  const keyEnumOptions = 
    config
      .filter(c => 
        !activeFilters.find(f => c.key == f.key)
      )
      .map(c => ({id: c.key, label: c.displayName}));

  return (
    <>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: '5px'}}
      >
        <Text>{activeFilters.length == 0 ? 'No':''} Active Filters:</Text>
        {
          newFilter == null && 
          <Button marginLeft='1em' onClick={enableNewFilter}>
            <MdAdd/>
          </Button>
        }
      </View>
      {
        activeFilters.map(filter => (
          <View
            key={filter.key}
            style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: '5px'}}
          >
            <Text marginRight='1em'>{getConfigForKey(filter.key).displayName}: </Text>
            <EditField
              configItem={getConfigForKey(filter.key)}
              value={filter.value}
              setValue={value => updateFilter({...filter, value})}
            />
            <Button marginLeft='1em' onClick={() => removeFilter(filter.key)}>
              <MdOutlineRemove/>
            </Button>

          </View>
        ))
      }
      {
        newFilter != null && (
          <View
            style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: '5px'}}
          > 
            <EditField
              configItem={{displayName: 'Field Selection', type: 'enum', enumOptions: keyEnumOptions}}
              value={getConfigForKey(newFilter.key)?.displayName ?? ''}
              setValue={setNewFilterKey}
            />
            <Text marginRight='1em' marginLeft='1em'>:</Text>
            {
              newFilter.key != '' && (
                <>
                  <EditField
                    configItem={getConfigForKey(newFilter.key)}
                    value={newFilter.value}
                    setValue={setNewFilterValue}
                  />
                  <Button marginLeft='1em' onClick={addFilter}>
                    <MdSave/>
                  </Button>
                </>
              )
            }
          </View>
        )
      }
    </>
  )
}