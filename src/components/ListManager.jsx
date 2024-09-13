import { Autocomplete, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, ThemeProvider, View, Text, Grid } from "@aws-amplify/ui-react";
import { MdAdd, MdArrowDropDown, MdArrowDropUp, MdCancel, MdDelete, MdEdit, MdFilterList, MdFilterListOff, MdOutlineRemove, MdSave } from "react-icons/md";
import { isEqual, isPlainObject } from "lodash";
import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from "react";
/*
config 
Array of {
  displayName: string
  key: string
  showInShortList: bool
  type: 'string' | 'enum' | 'bool'
  enumOptions: [string] or [{id: string, label: string}]
  readOnly: bool
*/

const theme = {
  name: 'table-theme',
  tokens: {
    components: {
      table: {
        row: {
          hover: {
            backgroundColor: { value: '{colors.shadow.primary}' },
          },
        }
      },
    },
  },
};

const EditField = ({configItem, value, setValue}) => {
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

const FilterBar = ({config, activeFilters, setActiveFilters}) => {
  const [newFilter, setNewFilter] = useState(null);

  return (
    <>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: '5px'}}
      >
        <Text>{activeFilters.length == 0 ? 'No':''} Active Filters:</Text>
        {
          newFilter == null && 
          <Button marginLeft='1em' onClick={() => setNewFilter({key: '', value: ''})}>
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
            <Text>{config.find(item => item.key == filter.key).displayName}: </Text>
            <EditField
              configItem={config.find(item => item.key == filter.key)}
              value={filter.value}
              setValue={newValue => setActiveFilters(filters => filters.map(f => f.key == filter.key?{...filter, value: newValue}:f))}
            />
            <Button marginLeft='1em' onClick={() => setActiveFilters(filters => filters.filter(f => f.key != filter.key))}>
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
              configItem={{displayName: 'Field Selection', type: 'enum', enumOptions: config.filter(c => !activeFilters.find(f => c.key == f.key)).map(c => ({id: c.key, label: c.displayName}))}}
              value={config.find(item => item.key == newFilter.key)?.displayName ?? ''}
              setValue={newValue => setNewFilter(nf => ({...nf, key: newValue}))}
            />
            <Text marginRight='1em'>:</Text>
            {
              newFilter.key != '' && (
                <>
                  <EditField
                    configItem={config.find(item => item.key == newFilter.key)}
                    value={newFilter.value}
                    setValue={newValue => setNewFilter(nf => ({...nf, value: newValue}))}
                  />
                  <Button marginLeft='1em' onClick={() => {
                    setActiveFilters(filters => [...filters, newFilter]);
                    setNewFilter(null);
                    }}>
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

// all members of data must have a unique id prop.
// if a status prop exists, the enable/disable button will show
//  status prop options: enabled || disabled
export default function ListManager({ config, addComponent, editItem, deleteItem, data }) {
  const [expandedElement, setExpandedElement] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeFilters, setActiveFilters] = useState([{key: 'status', value: 'enabled'}]);
  const [dataShown, setDataShown] = useState(data.filter(elem => !elem.status || elem.status == 'enabled'));
  const [barSelected, setBarSelected] = useState(null);

  const applyFilters = () => {
    let filteredData = data;
    activeFilters.forEach((filter) => {
      //get assoc config
      if(!filter.value==''){
        //get assoc config
        const filterConfig = config.find(c => c.key == filter.key);
        // filter using includes for string vars and equality for bool/enum vals
        if(filterConfig) {
          if(filterConfig.type == 'string'){
            filteredData = filteredData.filter(elem => elem[filter.key].includes(filter.value));
          }
          else {
            filteredData = filteredData.filter(elem => elem[filter.key] == filter.value);
          }
        }
      }
    })
    setDataShown(filteredData);
  }

  const toggleExpandedElement = (element) => {
    if(!!expandedElement) {
      setExpandedElement(null);
      setEditMode(false);
    }
    else {
      setExpandedElement(element);
    }
  }

  useEffect(() => {
    applyFilters();
  }, [activeFilters])

  return (
    <ThemeProvider theme={theme} colorMode="light">
      <Table
        // highlightOnHover={!!!expandedElement}
        // variation="striped"
      >
        <TableHead>
          <TableRow>
            {
              config.filter((item) => item.showInShortList).map((item) =>
                <TableCell as='th' key={item.key}>{item.displayName}</TableCell>
              )
            }
            <TableCell as='th' width='10%'>
              <View
                style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
              >
                <Button onClick={() => setBarSelected(state => state == 'filter' ? null : 'filter')}>
                  {
                    barSelected == 'filter'
                      ? <MdFilterListOff/>
                      : <MdFilterList/>
                  }
                </Button>
                {
                  !!addComponent && (
                    <Button marginLeft='1em' onClick={() => setBarSelected(state => state == 'add' ? null : 'add')}>
                      {
                        barSelected == 'add'
                          ? <MdOutlineRemove/>
                          : <MdAdd/>
                      }
                    </Button>
                  )
                }
              </View>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            barSelected == 'filter' && (
              <TableRow >
                <TableCell 
                  colSpan={config.filter(item => item.showInShortList).length + 1}
                >
                  <FilterBar
                    config={config}
                    activeFilters={activeFilters}
                    setActiveFilters={setActiveFilters}
                  />
                </TableCell>
              </TableRow>
            )
          }
          {
            barSelected == 'add' && (
              <TableRow >
                <TableCell 
                  colSpan={config.filter(item => item.showInShortList).length + 1}
                >
                  {addComponent}
                </TableCell>
              </TableRow>
            )
          }
          {
            dataShown.map((element) => (
              <>
                <TableRow>
                  {config.filter((item) => item.showInShortList).map((item) => 
                    <TableCell key={item.key}>{element[item.key]}</TableCell>
                  )}
                  <TableCell width='10%'>
                    <Button onClick={() => toggleExpandedElement(element)}>
                      {
                        expandedElement !== null && expandedElement?.id == element.id
                          ? <MdArrowDropUp />
                          : <MdArrowDropDown />
                      }
                    </Button>
                  </TableCell>
                </TableRow>
                {
                  expandedElement !== null && expandedElement?.id == element.id && 
                  (
                    <TableRow style={{backgroundColor: '#dde3ed'}}>
                      <TableCell 
                        colSpan={config.filter(item => item.showInShortList).length + 1}
                      >
                        <View>
                          <Grid
                            templateColumns={{ base: '1fr', large: '1fr 1fr' }}
                            templateRows={{ base: `repeat(${config.length}, auto)`, large: `repeat(${Math.ceil( config.length/2)}, auto)` }}
                            autoFlow='column'
                          >
                            {
                              config.map((item => (
                                <View 
                                  key={item.key}
                                  style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: '5px'}}
                                >
                                  <Text style={{width: '20%', paddingLeft: '3%'}}>{item.displayName}: </Text>
                                  {
                                    item.readOnly || !editMode
                                      ? <Text>{expandedElement[item.key]}</Text>
                                      : <View style={{width: '77%'}}>
                                          <EditField
                                            configItem={item}
                                            value={expandedElement[item.key]}
                                            setValue={newVal => setExpandedElement(elem => ({...elem, [item.key]: newVal}))}
                                          />
                                        </View> 
                                      
                                  }
                                </View>
                              )))
                            }
                          </Grid>
                          
                          <View style={{display: 'flex', flexDirection: 'row-reverse'}}>
                            <Button 
                              onClick={() => {
                                if (!element.status || element.status == 'enabled') {
                                  deleteItem(element)
                                }
                                else {
                                  editItem({...element, status: 'enabled'})
                                }
                              }}
                              marginLeft='1em'
                            >
                              <MdDelete />
                              <Text paddingLeft='1em'>{!element.status ? 'Delete' : element.status == 'enabled' ? 'Disable' : 'Enable'}</Text>
                            </Button>
                            {
                              !editMode && 
                                <Button 
                                  onClick={() => setEditMode(true)}
                                  marginLeft='1em'
                                >
                                  <MdEdit />
                                  <Text paddingLeft='1em'>Edit</Text>
                                </Button>
                            }
                            {
                              !isEqual(element, expandedElement) && editMode && 
                                <Button 
                                  marginLeft='1em'
                                  onClick={() => {
                                    editItem(expandedElement); 
                                    setEditMode(false);
                                  }}
                                >
                                  <MdSave />
                                  <Text paddingLeft='1em'>Save Changes</Text>
                                </Button>
                            }
                            {
                              editMode && 
                                <Button
                                  marginLeft='1em'
                                  onClick={() => {
                                    setEditMode(false);
                                    setExpandedElement(element);
                                  }}
                                >
                                  <MdCancel/>
                                  <Text paddingLeft='1em'>{isEqual(element, expandedElement)?'Stop Editing':'Discard Changes'}</Text>
                                </Button>
                            }
                          </View>
                        </View>
                      </TableCell>
                    </TableRow>                    
                  )
                }
              </>
            ))
          }
        </TableBody>
      </Table>
    </ThemeProvider>
  );
}