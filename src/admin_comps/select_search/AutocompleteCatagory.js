import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { apiUrl } from '../../services/apiService';
import { adsCheck } from '../js/ads';


function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function AutocompleteCatagory(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const func = (event, values) => {
    
    let val = values;
    if (val === null) {
      val = null;
      props.setValCategory(val);

    }
    else {
      val = values.category;
      props.setValCategory(val);
    }
    
    let temp = adsCheck(props.ads_ar,props.setFlag,val,props.valEmail,props.valDateStart, props.valDateEnd);
    
    props.setTempAr(temp)
  }


  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(apiUrl+'/ads');
      await sleep(1e3);
      const ads = await response.json();

      if (active) {
      
        let arr = []; 
        let arr2 = [];
        //עושה רשימה של הקטגוריות שיש          
        for (let index = 0; index < ads.length-1; index++) {                  
            if (!(arr2.includes(ads[index].category))) {
              arr2.push(ads[index].category);      

                arr.push(ads[index]);      
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
      getOptionLabel={(option) => option.category}
      options={options}
      loading={loading}
      onChange={func}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Category"
          variant="outlined"
          inputProps={{...params.inputProps , style: { textTransform: 'capitalize' } }}
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



