import React, {useEffect} from 'react';
import Basic from './Basic';
import BasicPlus from './BasicPlus';
import '../style/css/register.css'


// import PartC from './PartC';
// import PartD from './PartD';
// import PartE from './PartE';

import { useSelector } from 'react-redux';
import SendBasicData from './SendBasicData';
import UploadImg from './UploadImg';
import NavRand from '../NavRand';

import {useHistory} from 'react-router-dom';


function AppRegister() {

  let submitingType = useSelector((myStore) => myStore.submitingType);

  let history = useHistory();

  // איתחול הכפתור שליחה ללא פעיל
  useEffect(() => {

    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)){
      history.push("/home")
    }

  }, [])






  return (
    <>
      <NavRand />


      <div className="App register">
        <div className="container">
          <div className="register-item" style={{ paddingBottom: "151px" }}>
            <span>About you</span>
            {submitingType === "basic" ? <Basic /> : null ||
              submitingType === "basicPlus" ? <BasicPlus /> : null ||
                submitingType === "uploadingImg" ? <UploadImg /> : null ||
                  submitingType === "send" ? <SendBasicData /> : null
            }
            {/* <Basic/>
         <BasicPlus/>
         <UploadImg/>
         <SendBasicData/>
         <Category/> */}
          </div>

        </div>

      </div>
    </>

  );
}

export default AppRegister;