/* This is previous team code and our team did not touch this file*/
import "../../../css/Admin_EditQuestionWeights.css";
import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Popup } from "reactjs-popup";
import MenuBar from '../../MenuBar';

export default function Admin_EditQuestionWeights() {
  var departments = useLoaderData();

   //re-renders page without state change
   const [forceRender, setRender] = useState(0);

  //handles changes that user makes to form
  const [formState, setFormState] = useState({
    department: "",
    num_categories: 2,
    fields: ["Excellent", "Good", "'Placeholder'", "'Placeholder'", "'Placeholder'"],
    bubbles: 2,
    min: 0, //holds the min of the auto grading scale
    max: 100, //holds the max of the auto grading scale
    weights: [[0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0]], //will hold an array of arrays, each number corresponds to grading scale of the radio button
  });

  useEffect(() => { // this hook will get called every time fields array
    // perform some action every time myArr is updated
    console.log('Updated State', forceRender)
  }, [forceRender])

  //holds the department ID of the form
  const [deptID, setDeptID] = useState(0);

  //holds the error popup for invalid max and min
  const [rangeErrorPopup, setRangeErrorPopup] = useState();

  //holds the setting scale success popup
  const [successPopup, setSucessPopup] = useState();

  //holds the setting scale error popup
  const [errorPopup, setErrorPopup] = useState();

  //holds the error popup in the input text boxes have an improper scale
  const [scaleErrorPopup, setScaleErrorPopup] = useState();

  //Event that is fired when the button to submit the question is clicked
  const handleFormSubmit = (event) => {
    event.preventDefault();

    //post the grading scale
    postGradingScale();
  };

  //updates the department an user selects
  const updateDepartment = async (event) => {
    event.preventDefault();

    //if the person choose '--Choose--', set to empty string for error handling
    if (event.target.value === "--Choose--") {
      setFormState({ ...formState, department: "" });
      //set to zero for error handling
      setDeptID(0);
      return;
    }

    //set the state for what department is chosen
    setFormState({ ...formState, department: event.target.value });
    //get department ID
    let deptID = await fetchDepartmentID(event.target.value);

    //save the department ID
    setDeptID(deptID);
  };

  //handles the number of categories slider
  const handleCategorySlider = (event) => {
    setFormState({ ...formState, num_categories: event.target.value });
  };

  //handles the number of bubble per category slider
  const handleBubbleSlider = (event) => {
    setFormState({ ...formState, bubbles: event.target.value });
  };

  //updates the category name given the index of the category
  const updateCategoryNames = (event, index) => {
    //updates the category name within the formState state variable
    let newState = formState;
    newState.fields[index] = event.target.value;
    setFormState(newState);

    //force re-render
    let render = forceRender + 1;
    setRender(render);
  }

  //will not allow the user to enter a negative min or a min greater than the max
  const handleMin = (event) => {
    if(formState.min < 0 || formState.min > formState.max) {
      setFormState({...formState, min: 1})
      return
    }
    //otherwise, update with user input
    setFormState({...formState, min: event.target.value})
  }

  const handleMax = (event) => {
    //update with user input
    setFormState({...formState, max: event.target.value})
  }

  //Autoscales the weights array of the department given min and max
  const autoscale = () => {
    let max = Number(formState.max);
    let min = Number(formState.min);

    //if there is an invalid range, error
    if(min >= max) {
      setRangeErrorPopup(true);
      return;
    }
    //computes the range for the scaling
    let range = max - min;
    //computes the value to increment each bubble by
    let scaleBy = range/ (formState.num_categories * formState.bubbles);

    //holds the last computed value
    let lastVal = min;

    //state variable that stores the new changes
    let newWeights = formState.weights;

    //iterate and scale
    for(let i = formState.num_categories-1; i >= 0; i--) {
      for (let j = formState.bubbles-1; j >= 0; j--) {
        let val = Math.ceil(lastVal + scaleBy);
        //to handle going above the max
        if( val > formState.max) {
          val = formState.max;
        }
        newWeights[i][j] = val;
        //update last value
        lastVal = lastVal + scaleBy
      }
    }
    //set new state
    setFormState({...formState, weights: newWeights})
  }

  const postGradingScale = (event) => {
    //format the weights array
    var weights = []
    //include only the weights for the number of fields
    for(let i = 0 ; i < formState.num_categories; i++) {
      let categoryWeights = [];
      //include the weights for each bubble
      for(let j = 0; j < formState.bubbles; j++) {
        let val = formState.weights[i][j];
        categoryWeights.push(val);
      }
      weights.push(categoryWeights);
    }

    //include only the fields selected
    let categories = []
    for(let i = 0 ; i < formState.num_categories; i++) {
      categories.push(formState.fields[i])
    }

    //format response body
    let body = {
      fields: categories,
      bubbles: formState.bubbles,
      weights: weights
    }

    //if department was not selected show error
    if(deptID === 0) {
      //show error popup
      setErrorPopup(true);
      return;
    }

    //if scaled input was messed up show error
    if(checkScalingError()) {
      setScaleErrorPopup(true);
      return;
    }

    //make put call
    postDeptSettings(deptID, body);

    //show success message
    setSucessPopup(true);
  }

  //allows the admin to override the autoscaling 
  const updateWeights = (row, col, event) => {
    //update the weights array given the text input
    var weights = formState.weights;
    //var oldVal = weights[row][col]
    weights[row][col] = Number(event.target.value);

    //set new state
    setFormState({...formState, weights: weights})
  }

  //sees if the admin is inputing an invalid value
  const checkScalingError = (weights) => {
    var lastVal = 1000000;

    //loop and see if new input is not greater than or equal to last value
    for(let i = 0 ; i < formState.num_categories; i++) {
      for(let j = 0; j < formState.bubbles; j++) {
        let val = formState.weights[i][j];
        if(val >= lastVal) {
          return true;
        }
        lastVal = val;
      }
    }

    //if no error, return false
    return false;
  }

  return (
    <>
      {/* create admin menu bar */}
        <div className='content-container'>
          {<MenuBar />}
        {/* Draws the section that allows the admin to enter the grading scale content and save it for their department*/}
        <div>
          <h3 className="add-question-title">Set Department Grading Scale</h3>
          <div id="form" className="form">
            <form onSubmit={handleFormSubmit}>
              {/* Department dropdown, should later be removed when user authorization is added*/}
              <span className="category-span">
                <h3 className="form-subheaders">Department:</h3>
                <select
                  className="preview-question-dropdown"
                  onChange={updateDepartment}
                >
                  <option key={0}>--Choose--</option>
                  {departments?.map((dept) => (
                    <option key={dept.id}>{dept.abbreviation}</option>
                  ))}
                </select>
              </span>

              {/* Contains the input for the number of categories slider*/}
              <div>
                <h4>Number of Question Fields: {formState.num_categories}</h4>
                <p>
                  For example, fields can be the names of categories such as:
                  Excellent, Good, Unsatisfactory, etc.
                </p>
                <input
                  type="range"
                  min="2"
                  max="5"
                  value={formState.num_categories}
                  onChange={handleCategorySlider}
                ></input>
              </div>

              {/* Contains the category titles*/}
              <div>
                <h4>Category Titles:</h4>
                {/* Only render if the number of categories is > 0 */}
                {formState.num_categories > 0 && (
                  <span className="input-category-span">
                    <h5 className="input-category-subheader">Category 1: </h5>
                    <input
                      className="input-category-name"
                      value={formState.fields[0]}
                      onChange={(e) => {updateCategoryNames(e, 0)}}
                      placeholder="Click to edit. Ex: 'Excellent'"
                    ></input>
                  </span>
                )}

                {/* Only render if the number of categories is > 1 */}
                {formState.num_categories > 1 && (
                  <span className="input-category-span">
                    <h5 className="input-category-subheader">Category 2: </h5>
                    <input
                      className="input-category-name"
                      value={formState.fields[1]}
                      onChange={(e) => {updateCategoryNames(e, 1)}}
                      placeholder="Click to edit. Ex: 'Good'"
                    ></input>
                  </span>
                )}

                {/* Only render if the number of categories is > 2 */}
                {formState.num_categories > 2 && (
                  <span className="input-category-span">
                    <h5 className="input-category-subheader">Category 3: </h5>
                    <input
                      className="input-category-name"
                      value={formState.fields[2]}
                      onChange={(e) => {updateCategoryNames(e, 2)}}
                      placeholder="Click to edit. Ex: 'Satisfactory'"
                    ></input>
                  </span>
                )}

                {/* Only render if the number of categories is > 3 */}
                {formState.num_categories > 3 && (
                  <span className="input-category-span">
                    <h5 className="input-category-subheader">Category 4: </h5>
                    <input
                      className="input-category-name"
                      value={formState.fields[3]}
                      onChange={(e) => {updateCategoryNames(e, 3)}}
                      placeholder="Click to edit. Ex: 'Below Average'"
                    ></input>
                  </span>
                )}

                {/* Only render if the number of categories is > 4 */}
                {formState.num_categories > 4 && (
                  <span className="input-category-span">
                    <h5 className="input-category-subheader">Category 5: </h5>
                    <input
                      className="input-category-name"
                      value={formState.fields[4]}
                      onChange={(e) => {updateCategoryNames(e, 4)}}
                      placeholder="Click to edit. Ex: 'Poor'"
                    ></input>
                  </span>
                )}
              </div>

              {/* Setting number of bubbles under each category*/}
              <div>
                <h4>
                  Number of Bubbles Under Each Category: {formState.bubbles}
                </h4>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formState.bubbles}
                  onChange={handleBubbleSlider}
                ></input>
              </div>

              {/* Autoscaling with min-max feature */}
              <div>
                <h4>Category Grades Autoscaling:</h4>
                <p>
                  Entering a min and max will automatically set the grading scale
                  for all the bubbles under each category.
                </p>
                <span className="input-range-span">
                  <span className="input-range-span">
                    <h5 className="input-range-subheader">
                      Enter minimum grade value:
                    </h5>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="input-range"
                      value={formState.min}
                      onChange={handleMin} 
                      placeholder="min"
                    ></input>
                  </span>
                  <span className="input-category-span">
                    <h5 className="input-category-subheader">
                      Enter maximum grade value:
                    </h5>
                    <input
                      type="number"
                      className="input-range"
                      min="1"
                      max="100"
                      value={formState.max}
                      onChange={handleMax} 
                      placeholder="max"
                    ></input>
                  </span>
                  <button type="button" onClick={autoscale} className="autoscale-button">Autoscale</button>
                </span>
              </div>
              <div>
                <button type="onSubmit" className="set-grading-button">Save Settings to Department</button>
              </div>
            </form>
            {/* Error message for invalid min-max */}
            <Popup
              open={rangeErrorPopup}
              onClose={() => setRangeErrorPopup(false)}
              position="right center"
            >
              <div className="content-box-error">
                <p className="content-text">
                  Oops! Invalid Range. Please Try Again.
                </p>
                <button
                  onClick={() => setRangeErrorPopup(false)}
                  className="popup-button"
                >
                  Close
                </button>
              </div>
            </Popup>

            {/* Error message for invalid form input*/}
            <Popup
              open={errorPopup}
              onClose={() => setErrorPopup(false)}
              position="right center"
            >
              <div className="content-box-error">
                <p className="content-text">
                  Oops! Something went wrong with the form input. Make sure department is specified. Please try again.
                </p>
                <button
                  onClick={() => setErrorPopup(false)}
                  className="popup-button"
                >
                  Close
                </button>
              </div>
            </Popup>

            {/* Success message for valid form input and post*/}
            <Popup
              open={successPopup}
              onClose={() => setSucessPopup(false)}
              position="right center"
            >
              <div className="content-box-success">
                <p className="content-text">
                  Great! Your settings have been posted to your department!
                </p>
                <button
                  onClick={() => setSucessPopup(false)}
                  className="popup-button"
                >
                  Close
                </button>
              </div>
            </Popup>

            {/* Error message for invalid user scaling*/}
            <Popup
              open={scaleErrorPopup}
              onClose={() => setScaleErrorPopup(false)}
              position="right center"
            >
              <div className="content-box-error">
                <p className="content-text">
                  Oh no! It seems your scale is invalid. Make sure no entry to the right is greater or equal to the entry on its left.
                </p>
                <button
                  onClick={() => setScaleErrorPopup(false)}
                  className="popup-button"
                >
                  Close
                </button>
              </div>
            </Popup>

            <div className="preview">
              {/* Shows the preview of what a question looks like */}
              <div className="content">
                <h2>Preview</h2>
                <p>This is how a question looks like on a survey. The numbers represent the grading scale. You can click the values and edit them if you
                  want to override the autoscaled grading.
                </p>
                <div id="button-container" className="radio-button-container">
                  {/* Show if there there are more than zero categories */}
                  {formState.num_categories > 0 &&
                  <div className="category" id="category1">
                    <h4 className="category-header">{formState.fields[0]}</h4>
                    {/* TODO make these dynamic rendering within a JS function*/}
                    {formState.bubbles > 0 &&
                      <span>
                        <input name="grade" id="category1button1" type="radio"></input>
                        <input type='text' className="radio-text-box"value={formState.weights[0][0]} onChange={(e) => updateWeights(0,0, e)}></input>
                      </span>
                    }
                    {formState.bubbles > 1 &&
                      <span>
                        <input name="grade" id="category1button2" type="radio"></input>
                        <input type='text' className="radio-text-box"value={formState.weights[0][1]} onChange={(e) => updateWeights(0,1, e)}></input>
                      </span>
                    }
                    {formState.bubbles > 2 &&
                      <span>
                        <input name="grade" id="category1button3" type="radio"></input>
                        <input type='text' className="radio-text-box"value={formState.weights[0][2]} onChange={(e) => updateWeights(0,2, e)}></input>
                      </span>
                    }
                    {formState.bubbles > 3 &&
                      <span>
                        <input name="grade" id="category1button4" type="radio"></input>
                        <input type='text' className="radio-text-box"value={formState.weights[0][3]} onChange={(e) => updateWeights(0,3, e)}></input>
                      </span>
                    }
                    {formState.bubbles > 4 &&
                      <span>
                        <input name="grade" id="category1button5" type="radio"></input>
                        <input type='text' className="radio-text-box"value={formState.weights[0][4]} onChange={(e) => updateWeights(0,4, e)}></input>
                      </span>
                    }
                  </div>
                  }

                  {/* Show if there there are more than 1 categories */}
                  {formState.num_categories > 1 &&
                  <div id="category2">
                    <div className="category" id="category2">
                      <h4 className="category-header">{formState.fields[1]}</h4>
                      {/* TODO make these dynamic rendering within a JS function*/}
                      {formState.bubbles > 0 &&
                        <span>
                          <input name="grade" id="category2button1" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[1][0]} onChange={(e) => updateWeights(1,0, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 1 &&
                        <span>
                          <input name="grade" id="category2button2" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[1][1]} onChange={(e) => updateWeights(1,1, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 2 &&
                        <span>
                          <input name="grade" id="category2button3" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[1][2]} onChange={(e) => updateWeights(1,2, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 3 &&
                        <span>
                          <input name="grade" id="category2button4" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[1][3]} onChange={(e) => updateWeights(1,3, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 4 &&
                        <span>
                          <input name="grade" id="category2button5" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[1][4]} onChange={(e) => updateWeights(1,4, e)}></input>
                        </span>
                      }
                    </div>
                  </div>
                  }

                  {/* Show if there there are more than 2 categories */}
                  {formState.num_categories > 2 &&
                  <div id="category3">
                    <div className="category" id="category2">
                      <h4 className="category-header">{formState.fields[2]}</h4>
                      {/* TODO make these dynamic rendering within a JS function*/}
                      {formState.bubbles > 0 &&
                        <span>
                          <input name="grade" id="category3button1" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[2][0]} onChange={(e) => updateWeights(2,0, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 1 &&
                        <span>
                          <input name="grade" id="category3button2" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[2][1]} onChange={(e) => updateWeights(2,1, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 2 &&
                        <span>
                          <input name="grade" id="category3button3" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[2][2]} onChange={(e) => updateWeights(2,2, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 3 &&
                        <span>
                          <input name="grade" id="category3button4" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[2][3]} onChange={(e) => updateWeights(2,3, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 4 &&
                        <span>
                          <input name="grade" id="category3button5" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[2][4]} onChange={(e) => updateWeights(2,4, e)}></input>
                        </span>
                      }
                    </div>
                  </div>
                  }

                  {/* Show if there there are more than 3 categories */}
                  {formState.num_categories > 3 &&
                  <div id="category4">
                    <div className="category" id="category2">
                      <h4 className="category-header">{formState.fields[3]}</h4>
                      {/* TODO make these dynamic rendering within a JS function*/}
                      {formState.bubbles > 0 &&
                        <span>
                          <input name="grade" id="category4button1" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[3][0]} onChange={(e) => updateWeights(3,0, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 1 &&
                        <span>
                          <input name="grade" id="category4button2" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[3][1]} onChange={(e) => updateWeights(3,1, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 2 &&
                        <span>
                          <input name="grade" id="category4button3" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[3][2]} onChange={(e) => updateWeights(3,2, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 3 &&
                        <span>
                          <input name="grade" id="category4button4" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[3][3]} onChange={(e) => updateWeights(3,3, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 4 &&
                        <span>
                          <input name="grade" id="category4button5" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[3][4]} onChange={(e) => updateWeights(3,4, e)}></input>
                        </span>
                      }
                    </div>
                  </div>
                  }

                  {/* Show if there there are more than 4 categories */}
                  {formState.num_categories > 4 &&
                  <div id="category5">
                    <div className="category" id="category2">
                      <h4 className="category-header">{formState.fields[4]}</h4>
                      {/* TODO make these dynamic rendering within a JS function*/}
                      {formState.bubbles > 0 &&
                        <span>
                          <input name="grade" id="category5button1" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[4][0]} onChange={(e) => updateWeights(4,0, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 1 &&
                        <span>
                          <input name="grade" id="category5button2" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[4][1]} onChange={(e) => updateWeights(4,1, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 2 &&
                        <span>
                          <input name="grade" id="category5button3" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[4][2]} onChange={(e) => updateWeights(4,2, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 3 &&
                        <span>
                          <input name="grade" id="category5button4" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[4][3]} onChange={(e) => updateWeights(4,3, e)}></input>
                        </span>
                      }
                      {formState.bubbles > 4 &&
                        <span>
                          <input name="grade" id="category5button5" type="radio"></input>
                          <input type='text' className="radio-text-box"value={formState.weights[4][4]} onChange={(e) => updateWeights(4,4, e)}></input>
                        </span>
                      }
                    </div>
                  </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
