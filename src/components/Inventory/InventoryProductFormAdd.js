
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

const InventoryProductFormAdd = (props) => {
  const classes = useStyles();
  console.log(props.data)
  const _data = props.data || {};

  const [allCat, setAllCat] = React.useState()

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

    if ('description' in fieldValues)
      temp.description = fieldValues.description
        ? fieldValues.description.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=.]+$/g)
          ? ""
          : "Invalid Data"
        : "This field is required."
    if ('image' in fieldValues)
      temp.image = fieldValues.image
        ? fieldValues.image.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
          ? ""
          : "Invalid Data"
        : "This field is required."
    setErrors({
      ...temp
    })
    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }


  React.useEffect(()=>{
    // load_categories()
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
        consumptionRate:values.consumptionRate,
        quantity:values.quantity,
        inventoryName: values.inventoryName,
        description: values.description,
        categoryId: values.categoryId,
        unitName: values.unitName,
        inventoryImgUrl: "http://placekitten.com/g/150/150",
      };

      props.handleSubmit(req_value);
    }
  }



  return (
    <Form onSubmit={handleSubmission}>
      <Grid container>
        <Grid container item xs={6}>

          <Controls.Input
            name="inventoryName"
            label="Name"
            value={values.inventoryName}
            onChange={handleInputChange}
            disabled={true}
            required={true}
          />

          <Controls.Select
            label="unit"
            name="unit"
            initialValue={{
              id:units.filter(x=>{

              })
            }}
            value={values.unitName}
            onChange={handleInputChange}
            options={units}
            disabled={true}
          />

        </Grid>

        <Grid container item xs={6}>
          <Controls.Input
            type="number"
            name="quantity"
            label="Quantity"
            value={values.quantity}
            onChange={handleInputChange}
            required={true}
          />
        </Grid>


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
export default InventoryProductFormAdd;

