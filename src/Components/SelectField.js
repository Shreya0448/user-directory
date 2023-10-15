import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

function SelectField({ value, options, onChange }) {
  return (
    <FormControl fullWidth>
      <Select value={value} onChange={onChange}>
        <MenuItem value="None">
          <em>None</em>
        </MenuItem>
        {options.map((value, index) => (
          <MenuItem key={index} value={value}>
            {value}
          </MenuItem>
        ))
        }
      </Select>
    </FormControl>
  );
}

export default SelectField;
