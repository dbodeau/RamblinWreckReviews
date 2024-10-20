/* This is previous team code and our team did not touch this file*/
import "../../../css/Admin_EditQuestionWeights.css";
import React, { useState, useEffect } from "react";
import { Popup } from "reactjs-popup";
import MenuBar from '../../MenuBar';
import { updateQuestionWeights, getQuestionWeights } from "../../../services/service";
import Question from "../../Question";
import { useSelector } from 'react-redux';
import { View } from "@aws-amplify/ui-react";

export default function Admin_EditQuestionWeights() {
  // TODO get current user and department
  // const currentUser = useSelector((state => state.auth.user));
  const [adminDepartment, setAdminDepartment] = useState(null);

  //handles changes that user makes to form
  const [formState, setFormState] = useState({
    num_categories: 2,
    fields: ["Excellent", "Good", "", "", ""],
    bubbles: 2,
    min: 0, //holds the min of the auto grading scale
    max: 100, //holds the max of the auto grading scale
    weights: [[0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0]], //will hold an array of arrays, each number corresponds to grading scale of the radio button
  });

  

  // TODO pull previous multiple choice config
  // useEffect(() => {
  //   //get the actual department of the current user
  //   if(currentUser) {
  //     const adminDept = currentUser.roles.find(role => role.user_type == 'admin' && role.resource_type == 'dept' && role.status == true)?.resource_id;
  //     setAdminDepartment(adminDept);
  //     getQuestionWeights(adminDept)
  //       .then((weights) => {
  //         // TODO data transformation
  //         // const transformed_data = {...formState}; // would prefer a deep-copy
  //         // setFormState(transformed_data);
  //       });
  //   }
  // }, [currentUser])


  //holds the error popup for invalid max and min
  const [rangeErrorPopup, setRangeErrorPopup] = useState();

  //holds the setting scale success popup
  const [successPopup, setSucessPopup] = useState();

  //holds the error popup in the input text boxes have an improper scale
  const [scaleErrorPopup, setScaleErrorPopup] = useState();

  //holds the error popup if the categories are not properly filled out
  const [categoryErrorPopup, setCategoryErrorPopup] = useState(false);

  //Event that is fired when the button to submit the question is clicked
  const handleFormSubmit = (event) => {
    event.preventDefault();

    //post the grading scale
    postGradingScale();
  };

  //handles the number of categories slider
  const handleCategorySlider = (event) => {
    if (event.target.value < formState.num_categories) {
      // when we decrease the slider, make sure to update field names
      setFormState({...formState, num_categories: event.target.value, fields: formState.fields.map((value, index) => index < formState.num_categories - 1 ? value : "")})
    } else {
      setFormState({ ...formState, num_categories: event.target.value });
    }
  };

  //handles the number of bubble per category slider
  const handleBubbleSlider = (event) => {
    setFormState({ ...formState, bubbles: event.target.value });
  };

  //updates the category name given the index of the category
  const updateCategoryNames = (event, index) => {
    //updates the category name within the formState state variable
    const newValue = event.target.value;
    setFormState((prevState) => {
      const newFields = [...prevState.fields];
      newFields[index] = newValue;
      return {...prevState, fields: newFields};
    });
  }

  //will not allow the user to enter a negative min or a min greater than the max
  const handleMin = (event) => {
    const minValue = event.target.value;
    if(minValue < 0 || minValue > formState.max) {
      setFormState({...formState, min: 0});
      return;
    }
    //otherwise, update with user input
    setFormState({...formState, min: minValue});
  }

  const handleMax = (event) => {
    const maxValue = event.target.value;
    if (maxValue > 100 || maxValue < formState.min) {
      setFormState({...formState, max: 100});
      return;
    }
    //update with user input
    setFormState({...formState, max: maxValue});
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
    // check errors before we do data transformation
    //if scaled input was messed up show error
    if(checkScalingError()) {
      setScaleErrorPopup(true);
      return;
    }

    if (checkCategoryError()) {
      setCategoryErrorPopup(true);
      return;
    }

    //format the weights array
    const weights = []
    //include only the weights for the number of fields
    for(let i = 0 ; i < formState.num_categories; i++) {
      const categoryWeights = [];
      //include the weights for each bubble
      for(let j = 0; j < formState.bubbles; j++) {
        const val = formState.weights[i][j];
        categoryWeights.push(val);
      }
      weights.push(categoryWeights);
    }

    //include only the fields selected
    const categories = formState.fields.slice(0, formState.num_categories);

    //format response body
    const body = { // TODO: ensure this matches DB entry
      fields: categories,
      bubbles: formState.bubbles,
      weights: weights
    }
    // console.log(body);

    // TODO: make put call
    // updateQuestionWeights(adminDepartment, body);

    //show success message
    setSucessPopup(true);
  }

  //sees if the admin is inputing an invalid value
  const checkScalingError = () => {
    let lastVal = 1000000;

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

  const checkCategoryError = () => {
    for (let i = 0; i < formState.num_categories; i++) {
      if (formState.fields[i] === "") { // non-empty
        return true;
      }
    }
    return false;
  }

  return (
    <View style={{display: 'flex', flexDirection: 'row', height: '100%', width: '100%'}}>
      {/* create admin menu bar */}
      <MenuBar />
      {/* Draws the section that allows the admin to enter the grading scale content and save it for their department*/}
      <View style={{width: '100%', overflow: 'scroll'}}>
        <div id="form" className="form">
          <form onSubmit={handleFormSubmit}>
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
              {formState.fields.map((field, index) => {
                return index < formState.num_categories ?
                <span className="input-category-span">
                  <h5 className="input-category-subheader">Category {index + 1}: </h5>
                  <input
                    className="input-category-name"
                    value={field}
                    onChange={(e) => {updateCategoryNames(e, index)}}
                    placeholder={`Click to edit. Ex: '${index === 2 ? "Satisfactory" : index === 3 ? "Below Average" : index === 4 ? "Poor": "Excellent"}'`}
                  ></input>
                </span>
                : null;
              })}
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
          {/* Preview of the question, allowing them to manual override weights */}
          <Question
            formData={formState.weights}
            setFormData={setFormState}
            questionData={{
              question: "Preview",
              subtext: "This is how a question looks like on a survey. The numbers represent the grading scale. You can click the values and edit them if you want to override the autoscaled grading.",
              type: "preview",
              mcConfig: {
                numBubbles: formState.bubbles,
                categories: formState.fields
              }
            }}
          />
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

          {/* Error message for invalid category values */}
          <Popup
            open={categoryErrorPopup}
            onClose={() => setCategoryErrorPopup(false)}
            position="right center"
          >
            <div className="content-box-error">
              <p className="content-text">
                Oh no! It seems you're category names are invalid, make sure all categories are given a title.
              </p>
              <button
                onClick={() => setCategoryErrorPopup(false)}
                className="popup-button"
              >
                Close
              </button>
            </div>
          </Popup>
        </div>
        <div style={{height:60}} />
      </View>
    </View>
  );
}
