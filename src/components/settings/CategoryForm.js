
import React ,{useState} from "react";
import { Grid,IconButton ,Tooltip,makeStyles} from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";
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
  id:0,
  categoryName: "",
  categoryDescription:"",
};

const CategoryForm = (props) => {
  const classes = useStyles();
const [File,setFile]=useState(null)
  const _data = props.data || initialFValues;
  const handleCapture1 = (e) => {
    //    const formData = new FormData();
    // formData.append("File", File);
        setFile(URL.createObjectURL(e.target.files[0]));
      };
    
  const validate = (fieldValues=values) => {
    let temp = { ...errors }
    if ('categoryName' in fieldValues)
    temp.categoryName = fieldValues.categoryName
    ?fieldValues.categoryName.length<16
    ?fieldValues.categoryName.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
      ? ""
        : "Invalid Data" 
       :"maximum 16 Characters"
    : "This field is required."

    if ('categoryDescription' in fieldValues)
    temp.categoryDescription = fieldValues.categoryDescription 
    ?fieldValues.categoryDescription.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
    ? ""
      : "Invalid Data" 
    : "This field is required."
    setErrors({
      ...temp
    })
    if (fieldValues == values)
    return Object.values(temp).every(x => x == "")
  }
  const { values, handleInputChange, errors, setErrors } =useForm(_data,true,validate);
  
  const handleSubmission = e => {
    e.preventDefault()
    if (validate()) {
      let req_value = {
        id:values.id,
        categoryName: values.categoryName,
        categoryDescription:values.categoryDescription,
        categoryImgUrl:"http://placekitten.com/g/150/150",
      };

      props.handleSubmit(req_value);
    }
 
  }



  return (
    <Form  onSubmit={handleSubmission}>
        <Grid container>
      <Grid container item xs={6}>
        <Controls.Input
         name="categoryName"
         label="categoryName"
         value={values.categoryName}
         onChange={handleInputChange} 
         error={errors.categoryName}
        required={true}
        />
            <Controls.Input
         name="categoryDescription"
         multiline
         row={5}
         label="Description"
         value={values.categoryDescription}
         onChange={handleInputChange} 
         error={errors.categoryDescription}
         
        
        />
      </Grid>
      
      <Grid container item xs={6}> 
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
          ):
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
export default CategoryForm;

