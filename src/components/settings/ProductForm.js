
import React from "react";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";

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
  name: "",
  description: "",
  unit: "",
  image: ""
};
const category = [
  {
    "id": 1,
    "title": "MOMOS",
    "description": "mitho Momos",
  },
  {
    "id": 2,
    "title": "pizza",
    "description": "mitho pizzass",
  },
  {
    "id": 3,
    "title": "Coke",
    "description": "mitho Coke",
  },
]

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

const ProductForm = (props) => {
  const classes = useStyles();
  const _data = props.data || initialFValues;
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [File, setFile] = React.useState(null);
  const validate = (fieldValues = values) => {
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
  const handleCapture = (e) => {
    setSelectedFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const handleCapture1 = (e) => {
    //    const formData = new FormData();
    // formData.append("File", File);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  console.log(selectedFile);
  console.log(File);
  const { values, handleInputChange, errors, setErrors } = useForm(_data, true, validate);

  const handleSubmission = e => {
    e.preventDefault()
    if (validate()) {
      let req_value = {
        id: values.id,
        name: values.name,
        description: values.description,
        category_id: values.category_id,
        unit: values.unit,
        image: "http://placekitten.com/g/150/150",
      };

      props.handleSubmit(req_value);
    }

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
            options={category}

          />
          <Controls.Input
            name="name"
            label="Name"
            value={values.name}
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

        <Grid container item xs={6}>
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
              </Tooltip>
            </div>
          </div>
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
export default ProductForm;

