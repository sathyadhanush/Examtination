
import React from "react";
import { IconButton } from "@mui/material";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import EditEmployee from "./editExam_Questions";
import styles from "../styles/EmployeeList.module.css";
import Link from "next/link";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const exam_questionsEdit = ({data}) => {
  console.log("data", data);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
  
      <div>
     <br/>
      <button 
      className={styles.update}
      kind="Secondary"
      onClick={handleClickOpen}>
        
          {data.map((examQuesData,index) => (
           <div key={index}> 
        <Link href={`/exam_questions/${examQuesData.id}`}>Update</Link>
        </div>
        ))}
        
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent>
           <EditEmployee/>
        </DialogContent>
        
        <DialogActions>
          
          <button 
           className={styles.update}
          kind="primary"
          onClick={handleClose}>
            cancel
          </button>
        </DialogActions>
        
      </BootstrapDialog>
      
    </div>
   
   
  );
}
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/exm_questions");
  const data = await res.json();
  return {
    props: { data },
  };
}


export default exam_questionsEdit;