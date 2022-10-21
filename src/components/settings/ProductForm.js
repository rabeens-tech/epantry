
import React from "react";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";
import axios from "axios";
import Spinner from '../../utils/spinner'
import { toast } from "react-toastify";
import config from "../../utils/config";

import {
  Button, Divider, Paper, Typography,
  IconButton,
  Tooltip,
  makeStyles,
  Theme, Grid,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

import units from '../../utils/units'

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  faceImage: {
    color: theme.palette.primary.light,
  },
}));

const initialFValues = {
  category_id: "",
  inventoryName: "",
  description: "",
  unitId: "",
  image: ""
};




const ProductForm = (props) => {
  const classes = useStyles();
  // console.log(props.data)
  const _data = props.data || {};

  if(_data.unitName!==undefined){
    let defaultUnit = units.filter(x=>x["title"].toUpperCase() === (_data.unitName|| "").toUpperCase())
    if(defaultUnit.length > 0){
      _data.unitId = defaultUnit[0]["id"]
    }
  }

  const [allCat, setAllCat] = React.useState(props.categories || [])

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [File, setFile] = React.useState(null);
  
  const validate = (fieldValues = values) => {
    return true
    let temp = { ...errors }
    if ('name' in fieldValues)
      temp.name = fieldValues.name
        ? fieldValues.name.length < 26
          ? fieldValues.name.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=_-]+$/g)
            ? ""
            : "Invalid Data"
          : "maximum 25 Characters"
        : "This field is required."

    // if ('description' in fieldValues)
    //   temp.description = fieldValues.description
    //     ? fieldValues.description.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=.]+$/g)
    //       ? ""
    //       : "Invalid Data"
    //     : "This field is required."
    // if ('image' in fieldValues)
    //   temp.image = fieldValues.image
    //     ? fieldValues.image.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
    //       ? ""
    //       : "Invalid Data"
    //     : "This field is required."
    setErrors({
      ...temp
    })
    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }


  React.useEffect(()=>{
    // load_categories()
  },[])


  const load_categories = () =>{
    axios
    .get(`${config.APP_CONFIG}category/getall`)
    .then((res) => {
      if (res.status === 200) {
        let _res= res.data.map((x,i)=>{
          return {
            id:x["categoryId"],
            title:x["categoryName"]
          }
        })
        setAllCat(_res)    
      } else if (res.status === 401) {
        // userSessionContext.handleLogout();
      } else if (res.status === 400) {
        toast.error(res.data || "Cannot load categories");
        setAllCat([]);
      }
    })
    .catch((err) => {
      toast.error("Something Went Wrong");
      setAllCat([]);
    });
  }

  const handleCapture = (e) => {
    setSelectedFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const handleCapture1 = (e) => {
    //    const formData = new FormData();
    // formData.append("File", File);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  // console.log(selectedFile);
  // console.log(File);
  const { values, handleInputChange, errors, setErrors } = useForm(_data, true, validate);

  const handleSubmission = e => {
    e.preventDefault()
    // alert("handle")
    
    let curr_unit = units.filter(x=> (x["id"] === values.unitId))
    let curr_category = allCat.filter(x=>x["id"]===values.categoryId)
    console.log(values, units, curr_unit)
    if(curr_unit.length===0){
      toast.error("Invalid Unit type selected ")
      return
    }
    if(curr_category.length===0){
      toast.error("Invalid Product Category selected")
      return
    }
    
    if (validate()) {
      let req_value = {
        inventoryId: values.inventoryId,
        inventoryAdded:"",
        consumptionRate:0,
        consumptionType:"DAILY", 
        quantity:0,
        inventoryName: values.inventoryName,
        invDescription: values.invDescription,
        categoryId: values.categoryId,
        unitName: curr_unit[0]["title"],
        inventoryImgUrl: values.inventoryImgUrl || "",
        inventoryCategory:curr_category[0]["id"]
      };
      // console.log(values)
      // console.log(req_value)
      props.handleSubmit(req_value);
    }
    return

  }


  if(allCat === undefined){
    return <Spinner />
  }
 // console.log(_data)
  // console.log(values)
  return (
    <Form onSubmit={handleSubmission}>
      <Grid container>
        <Grid container item xs={6}>
          <Controls.Select
            label="CategoryName"
            name="categoryId"
            value={values.categoryId}
            onChange={handleInputChange}
            options={allCat}

          />
          <Controls.Input
            name="inventoryName"
            label="Name"
            value={values.inventoryName}
            onChange={handleInputChange}

            // required={true}
          />

          <Controls.Select
            label="Unit"
            name="unitId"    
            value={values.unitId}
            onChange={handleInputChange}
            options={units}

          />

        </Grid>

        <Grid container item xs={6}>
          <Controls.Input
            name="invDescription"
            multiline
            rows={3}
            label="Description"
            value={values.invDescription}
            onChange={handleInputChange}
          />

          <Controls.Input
            name="inventoryImgUrl"
            multiline
            rows={3}
            label="Image URL"
            value={values.inventoryImgUrl}
            onChange={handleInputChange}
          />

{/**
          <div style={{ display: "block" }}>
            <div style={{ width: "175px", textAlign: "center", margin: "8px", height: "20px" }}>
              <label>Upload Image</label>
            </div>
            <div style={{ border: "1px solid #ddd", maxWidth: "175px", width: "100%", height: "150px", textAlign: "center", margin: "8px" }}>
              <input
                accept="image/*"
                className={classes.input}
                id="faceImage"
                type="file"
                onChange={handleCapture1}
              />
              {File ? < img src={File} alt="image" width="175" height="150" /> : "Select Image"}
              <Tooltip title="Select Image">
                <label htmlFor="faceImage">
                  <IconButton
                    className={classes.faceImage}
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera fontSize="large" />
                  </IconButton>
                </label>
              </Tooltip>
            </div>
          </div>
          **/}
        </Grid>
        <div style={{ width: "100%", textAlign: "right" }}>
          {_data.inventoryId ? (
            <Controls.Button
              type="submit"
              text="Update"
            />
          ) :
            (
              <Controls.Button
                type="submit"
                text="Add"
              />
            )}
        </div>
      </Grid>
    </Form>

  );
};
export default ProductForm;

