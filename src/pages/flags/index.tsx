import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Flag from 'react-world-flags';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { countries, countriesTypes } from '../../util/countries';
import Input from '../../components/input';

const style = {
  position: 'absolute' as const,
  // top: '20vh',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FlagsTable(): React.ReactElement {
  const [rows, setRows] = useState<countriesTypes[]>(countries);
  const [selected, setSelected] = useState<countriesTypes>();
  const [searched, setSearched] = useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [test, setTeste] = React.useState<string>('');

  const requestSearch = (searchedVal: string): void => {
    let filteredRows = countries.filter((row) => row.nome.toLowerCase().includes(searchedVal.toLowerCase()));
    if (filteredRows?.length === 0) filteredRows = countries.filter((row) => row.sigla3.toLowerCase().includes(searchedVal.toLowerCase()));
    setRows(filteredRows);
  };

  const selectCountry = (prop: countriesTypes): void => {
    setSelected(prop);
    setOpen(true);
  };

  return (
    <>
      <Input onChange={requestSearch} searchable />
      <Paper>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>País</TableCell>
                <TableCell>Capital</TableCell>
                <TableCell align="right">Sigla</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, key) => {
                if (key > 500) return <></>;
                return (
                  <TableRow key={row.nome}>
                    <TableCell width={30} align="left">
                      <Flag code={row.sigla3} height="16" />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.nome}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.capital || 'Essa é uma capital'}
                    </TableCell>
                    <TableCell align="right">{row.sigla2}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Ver">
                        <IconButton sx={{ p: '10px' }} aria-label="search">
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton
                          sx={{ p: '10px' }}
                          aria-label="search"
                          onClick={() => selectCountry(row)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{ top: '350px' }}
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Flag code="USA" height="100%" />
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    {selected?.nome}
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <Input
                    searchable={false}
                    inputLabel="Nome"
                    onChange={setTeste}
                    defaultValue={selected?.nome}
                  />
                </Grid>
                <Grid item sm={6}>
                  <Input
                    searchable={false}
                    inputLabel="Capital"
                    onChange={setTeste}
                    defaultValue={selected?.capital}
                  />
                </Grid>
                <Grid item sm={4}>
                  <Input
                    searchable={false}
                    inputLabel="Área"
                    onChange={setTeste}
                    defaultValue={selected?.area}
                  />
                </Grid>
                <Grid item sm={4}>
                  <Input
                    searchable={false}
                    inputLabel="População"
                    onChange={setTeste}
                    defaultValue={selected?.populacao}
                  />
                </Grid>
                <Grid item sm={4}>
                  <Input
                    searchable={false}
                    inputLabel="Top-Level"
                    onChange={setTeste}
                    defaultValue={selected?.tld}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
