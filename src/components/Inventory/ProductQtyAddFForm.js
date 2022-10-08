
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
  inventoryName : "",
  description: "",
  unit: "",
  inventoryImgUrl: ""
};

const units = [
  {
    "id": 1,
    "title": "kg",

  },
  {
    "id": 2,
    "title": "gram",

  },
  {
    "id": 3,
    "title": "ml",

  },
  {
    "id": 4,
    "title": "litre",

  },
  {
    "id": 5,
    "title": "piece",

  },
  {
    "id": 6,
    "title": "packet",

  },
]

const ProductQtyAddForm= (props) => {
  const classes = useStyles();
  const _data = props.data || initialFValues;

  const [allCat, setAllCat] = React.useState()

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [File, setFile] = React.useState(null);
  
  const validate = (fieldValues = values) => {
    return true
    let temp = { ...errors }
    if ('inventoryName' in fieldValues)
      temp.name = fieldValues.inventoryName
        ? fieldValues.inventoryName.length < 26
          ? fieldValues.inventoryName.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=_-]+$/g)
            ? ""
            : "Invalid Data"
          : "maximum 25 Characters"
        : "This field is required."

    setErrors({
      ...temp
    })
    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }


  React.useEffect(()=>{
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
  },[])

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
    // alert("handle")
    e.preventDefault()
    if (validate()) {
      let req_value = {
        id: values.id,
        inventoryAdded:"",
        consumptionRate:0,
        quantity:0,
        inventoryName: values.inventoryName,
        //description: values.description,
        category_id: values.category_id,
        unitName: values.unit,
        inventoryImgUrl: "http://placekitten.com/g/150/150",
      };

      props.handleSubmit(req_value);
    }

  }


  if(allCat === undefined){
    return <Spinner />
  }

  return (
    <Form onSubmit={handleSubmission}>
      <Grid container>
        <Grid container item xs={6}>
          <Controls.Select
            label="CategoryName"
            name="category_id"
            value={values.category_id}
            onChange={handleInputChange}
            options={allCat}

          />
          <Controls.Input
            name="inventoryName"
            label="Name"
            value={values.inventoryName}
            onChange={handleInputChange}

            required={true}
          />

          <Controls.Select
            label="unit"
            name="unit"
            value={values.unit}
            onChange={handleInputChange}
            options={units}

          />

        </Grid>

        {/* <Grid container item xs={6}>
          <Controls.Input
            name="description"
            multiline
            row={5}
            label="Description"
            value={values.description}
            onChange={handleInputChange}
          />
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
              </Tooltip> */}
            {/* </div>
          </div>
        </Grid> */}
        <div style={{ width: "100%", textAlign: "right" }}>
          {_data.id ? (
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
export default ProductQtyAddForm;

