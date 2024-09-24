import { Button, Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider, View, Text, Grid } from "@aws-amplify/ui-react";
import { MdAdd, MdArrowDropDown, MdArrowDropUp, MdCancel, MdDelete, MdEdit, MdFilterList, MdFilterListOff, MdSave } from "react-icons/md";
import { isEqual } from "lodash";
import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import EditField from "./EditField";

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
            backgroundColor: { value: '{colors.shadow.secondary}' },
          },
        }
      },
    },
  },
};

// all members of data must have a unique id prop.
// if a status prop exists, the enable/disable button will show
//  status prop options: enabled || disabled
export default function ListManager({ config, showAddComponent, editItem, deleteItem, data }) {
  const [expandedElement, setExpandedElement] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeFilters, setActiveFilters] = useState([{key: 'status', value: 'enabled'}]);
  const [dataShown, setDataShown] = useState(data.filter(elem => !elem.status || elem.status == 'enabled'));
  const [showFilterBar, setShowFilterBar] = useState(null);

  const applyFilters = () => {
    let filteredData = data;
    activeFilters.forEach((filter) => {
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

  const toggleFilterBar = () => {
    setShowFilterBar(state => !state);
  }

  useEffect(() => {
    applyFilters();
  }, [activeFilters])

  return (
    <ThemeProvider theme={theme} colorMode="light">
      <Table
        highlightOnHover={!!!expandedElement && showFilterBar == false}
        variation="striped"
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
                <Button onClick={toggleFilterBar}>
                  {
                    showFilterBar
                      ? <MdFilterListOff/>
                      : <MdFilterList/>
                  }
                </Button>
                {
                  !!showAddComponent && (
                    <Button marginLeft='1em' onClick={showAddComponentß}>
                      {
                        <MdAdd/>
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
            showFilterBar && (
              <TableRow backgroundColor= 'shadow.secondary' >
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
            dataShown.map((element) => (
              <>
                <TableRow key={element.id}>
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
                  expandedElement !== null && expandedElement?.id == element.id && (
                    <TableRow backgroundColor= 'shadow.secondary'>
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
                              config.map(item => (
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
                              ))
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