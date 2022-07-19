
import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { valCheck } from '../js/data';
import { apiUrl } from '../../services/apiService';


function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function AutocompleteNames(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const func = (event, values) => {
    let val = values;
    if (val === null) {
      val = null;
      props.setValName(val);
    }
    else {
      val = values.first_name;
      props.setValName(val);
    }
    
    let temp = valCheck(props._ar,props.setFlag,props.valCity,props.valGender,val,props.valDateStart,props.valDateEnd,props.valEmail)
    props.setTempAr(temp)
  }


  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      let users;

      if(props.textFlag==="vip"){
      let response = await fetch(apiUrl+"/users");
      console.log(props.textFlag);
      await sleep(1e3);
       users = await response.json();
      users = users.filter(item => item.vip.vip === true && item.block_status===false);
      }
      else if(props.textFlag==="regular"){
        let response = await fetch(apiUrl+"/users"); 
        await sleep(1e3);
         users = await response.json();
         users = users.filter(item => item.vip.vip !== true && item.block_status === false);

      }
      else{
        let response = await fetch(apiUrl+props.textFlag); 
        await sleep(1e3);
         users = await response.json();
  
      }

      
     
      if (active) {
        let arr = []; 
        let arr2 = [];
        //עושה רשימה של הקטגוריות שיש          
        for (let index = 0; index < users.length; index++) {                  
            if (!(arr2.includes(users[index].first_name))) {
              arr2.push(users[index].first_name);      

                arr.push(users[index]);      
            }  
        }
        setOptions(arr);
      }

    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      style={{ width: 200 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.iso === value.iso}
      getOptionLabel={(option) => option.first_name}
      options={options}
      loading={loading}
      onChange={func}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Name"
          variant="outlined"
          inputProps={{ ...params.inputProps, style: { textTransform: 'capitalize' } }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}

        />
      )}

    />
  );
}

