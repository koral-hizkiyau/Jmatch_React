import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { valCheck } from '../js/data';
import { apiUrl } from "../../services/apiService";


function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}


export default function AutocompleteCities(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;



  const func = (event, values) => {

    let val = values;
    if (val === null) {
      val = null;
      props.setValCity(null)

    }
    else {
      val = values.city_name;
      props.setValCity(values.city_name)
    }
    let temp = valCheck(props._ar, props.setFlag, val, props.valGender, props.valName, props.valDateStart, props.valDateEnd,props.valEmail)
    props.setTempAr(temp)
  }


  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(apiUrl + '/cities');
      await sleep(1e3);
      const countries = await response.json();

      if (active) {
        setOptions(countries);
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
      getOptionLabel={(option) => option.city_name}
      options={options}
      loading={loading}
      onChange={func}
      renderInput={(params) => (
        <TextField
          {...params}
          label="City"
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

