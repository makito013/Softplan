import React, { FC } from 'react';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface inputParams {
  onChange: (arg1: string) => void,
  placeholder?: string,
  searchable?: boolean,
  disabled?: boolean,
  inputLabel?: string,
  defaultValue?: string,
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fcfcfb',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Input: FC<inputParams> = ({
  searchable = false,
  onChange,
  placeholder,
  disabled,
  inputLabel,
  defaultValue,
}) => {
  if (searchable) {
    return (
      <Paper
        component="form"
        style={{ border: '1px solid #A6A6A6' }}
        sx={{
          p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder || 'Digite Para Pesquisar'}
          onChange={(e) => onChange(e.target.value)}
          defaultValue
        />
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }

  return (
    <FormControl style={{ width: '100%', marginBottom: 20 }} sx={{ m: 1, minWidth: 120 }} variant="standard">
      {inputLabel
      && (
        <InputLabel style={{ fontWeight: 'bold', fontSize: 20 }} shrink>
          {inputLabel}
        </InputLabel>
      )}
      <BootstrapInput
        disabled={disabled || false}
        placeholder={placeholder || ''}
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue || ''}
      />
    </FormControl>
  );
};

export default Input;
