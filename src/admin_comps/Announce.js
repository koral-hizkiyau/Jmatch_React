import React, { useEffect, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import $ from "jquery";
import moment from 'moment';
import { apiUrl, doApiPostToken } from '../services/apiService';
import io from 'socket.io-client';




import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: "50%",
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    marginBottom: "5px"


  },
}));

const ENDPOINT = "http://localhost:4002/";



function Announce(props) {

  const socket = io(ENDPOINT);

  const classes = useStyles();
  let [btnTarget, setBtnTarget] = useState(false);
 
const btnChange=(e)=>{
  setBtnTarget(true)
}

  const announceSend = () => {
    let msgText = document.getElementById("standard-textarea");
    let tempTime = moment();
    let newMsg = msgText.value
    if (newMsg.length > 0) {

      let singleMsgObj = {
        time: tempTime,
        newMsg: newMsg,
        userPost: "1",
        lastTimeChat: tempTime
      }

      let urlMsg = apiUrl+'/msgs/updateAdminMsg';
      doApiPostToken(urlMsg, singleMsgObj)
        .then(data => {
          console.log(data);
          if (data.ok === 1) {
            console.log("update msgs");
            $("#standard-textarea").val("");
           
            setBtnTarget(false)

              socket.emit("Admin send msg", {
              singleMsgObj
            });
          }
          else if (data.message) {
            console.log(data.message);
            alert("Problem");
          }
          else {
            console.log(data);
            alert("there is already user in this name")
          }
        })
    }
   

    // let userGetAlert = userChatData.id

    // socket.emit("alert", {
    //   boxIdState,
    //   userGetAlert
    // });

  }

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center" style={{ paddingTop: "12rem" }}>
        <i style={{ height: "8em" }} className="fa fa-pencil fa-fw fa-2x" aria-hidden="true" id="name"></i>
        <TextField
          id="standard-textarea"
          label="Write your announcement here"
          style={{ border: "1px solid #ced4da" ,width: "80%"}}
          rows={15}
          onChange={(e)=>btnChange(e)}
          multiline
        />

      </div>
      {btnTarget ? 
      <div className="container d-flex justify-content-center align-items-center" style={{ paddingTop: "2rem" }} >
        <Button onClick={announceSend} variant="contained" color="primary" data-toggle="modal" data-target="#modalA"  className={classes.button} endIcon={<SendIcon />}>Send</Button>
      </div>
      :
     <div className="container d-flex justify-content-center align-items-center" style={{ paddingTop: "2rem" }}>
        <Button onClick={announceSend} variant="contained" color="primary" data-toggle="modal" data-target="#modalAF"   className={classes.button} endIcon={<SendIcon />}>Send</Button>
      </div>}
      
      <div className="modal fade" id="modalA" style={{ padding: "50px" }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Announce</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>The message was sent successfully</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        

      <div className="modal fade" id="modalAF" style={{ padding: "50px" }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Error</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>The message box is empty</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Announce