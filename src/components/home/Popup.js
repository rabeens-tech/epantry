import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Controls from "../controls/Controls";
import CloseIcon from "@material-ui/icons/Close";


const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    // top: theme.spacing(5),
    minHeight: "20%",
    maxHeight: "90%",
  },
  dialogTitle: {
    padding: "0%",
  },
}));

export default function Popup(props) {
  const { title, children, openPopup, setPopups } = props;
  const classes = useStyles();

  return (
    // <Draggable>
      <Dialog
       hideBackdrop
      //disableEnforceFocus
     // disableBackdropClick
        open={openPopup}
        fullWidth
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle className={classes.dialogTitle}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1, textAlign: "center" }}>
              {title}
            </Typography>
            <Controls.ActionButton
              color="secondary"
              onClick={() => {
                setPopups(false);
              }}
            >
              <CloseIcon />
            </Controls.ActionButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    // </Draggable>
  );
}
