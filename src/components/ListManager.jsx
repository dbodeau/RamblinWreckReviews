import { Autocomplete, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, ThemeProvider, View, Text, Grid } from "@aws-amplify/ui-react";
import { MdArrowDropDown, MdArrowDropUp, MdCancel, MdDelete, MdEdit, MdSave } from "react-icons/md";
import { isEqual } from "lodash";
import '@aws-amplify/ui-react/styles.css';
import { useState } from "react";
/*
config 
Array of {
  displayName: string
  key: string
  showInShortList: bool
  type: 'string' | 'enum' | 'bool'
  enumOptions: []
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

// all members of data must have a unique id prop.
// if a status prop exists, the enable/disable button will show
//  status prop options: enabled || disabled
export default function ListManager({ config, addComponent, editItem, deleteItem, data }) {
  const [expandedElement, setExpandedElement] = useState(null);
  const [editMode, setEditMode] = useState(false);

  return (
    <ThemeProvider theme={theme} colorMode="light">
      <Table
        highlightOnHover={!!!expandedElement}
        variation="striped"
      >
        <TableHead>
          <TableRow>
            {
              config.filter((item) => item.showInShortList).map((item) =>
                <TableCell as='th' key={item.key}>{item.displayName}</TableCell>
              )
            }
            <TableCell as='th' style={{ width: "50px" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((element) => (
                <TableRow key={element.id} style={expandedElement !== null && expandedElement?.id == element.id ?{backgroundColor: '#dde3ed'}:{}}>
                  {
                    expandedElement !== null && expandedElement?.id == element.id
                      ? <>
                          <TableCell 
                            colSpan={config.filter((item) => item.showInShortList).length}
                            // style={{height: '300px'}}
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
                                              {
                                                item.type == 'string'
                                                  ? <TextField
                                                      label={item.displayName}
                                                      value={expandedElement[item.key]} 
                                                      onChange={(e) => setExpandedElement(elem => ({...elem, [item.key]: e.target.value}))} 
                                                      size='small'
                                                      labelHidden
                                                    />
                                                  : <Autocomplete
                                                      label={item.displayName}
                                                      value={expandedElement[item.key]} 
                                                      options={
                                                        item.type == 'enum'
                                                          ? [...item.enumOptions?.map(opt => ({id: opt, label: opt}))]
                                                          : [{id: 'true', label: 'true'}, {id: 'false', label: 'false'}]
                                                      }
                                                      onChange={null}
                                                      onClear={() =>  setExpandedElement(elem => ({...elem, [item.key]: ''}))}
                                                      onSelect={(opt) =>  setExpandedElement(elem => ({...elem, [item.key]: opt.label}))}
                                                      optionFilter={() => true}
                                                      hasSearchButton={false}
                                                      hasSearchIcon={false}
                                                      size='small'
                                                    />
                                              }
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
                                  editMode && 
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
                                      <Text paddingLeft='1em'>Discard Changes</Text>
                                    </Button>
                                }
                              </View>
                            </View>
                          </TableCell>
                          <TableCell style={{ display: 'flex', borderWidth: '0px' }}>
                              <Button onClick={() => {setExpandedElement(null); setEditMode(false)}}><MdArrowDropUp /></Button>

                          </TableCell>
                        </>
                      : (<>
                          {config.filter((item) => item.showInShortList).map((item) => 
                            <TableCell key={item.key}>{element[item.key]}</TableCell>
                          )}
                          <TableCell style={{ width: "50px" }}>
                            <Button onClick={() => setExpandedElement(element)}><MdArrowDropDown /></Button>
                          </TableCell></>)
                  }
                </TableRow>
              )
            )}
        </TableBody>
      </Table>
    </ThemeProvider>
  );
}