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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useQuery } from '@apollo/client';
import Input from '../../components/input';
import { countries, countriesTypes } from '../../util/countries';
import { GET_COUNTRIES } from '../../operations/queries/getCountries';
import { GET_NAME } from '../../operations/queries/getName';
import { allMutations } from '../../operations/mutations';

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
  const [rows, setRows] = useState<countriesTypes[]>(useQuery(GET_COUNTRIES).data.countries);
  const [selected, setSelected] = useState<countriesTypes>();
  const [searched, setSearched] = useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [test, setTeste] = React.useState<string>('');
  const [result, setResult] = React.useState<number>(0);
  const [typeModal, setTypeModal] = React.useState<string>('view');
  const { name } = useQuery(GET_NAME).data;

  const requestSearch = (searchedVal: string): void => {
    let filteredRows = countries.filter((row) => row?.nome.toLowerCase().includes(searchedVal.toLowerCase()));
    if (filteredRows?.length === 0) filteredRows = countries.filter((row) => row?.sigla3.toLowerCase().includes(searchedVal.toLowerCase()));
    setResult(0);
    setRows(filteredRows);
  };

  const selectCountry = (prop: countriesTypes, type: string): void => {
    setSelected(prop);
    setTypeModal(type);
    setOpen(true);
  };

  const onPressButton = (): void => {
    if (selected) {
      allMutations.editCountries(selected);
    }
    setOpen(false);
  };

  const handleInputChange = (e: string, index: string): void => {
    console.log('entrei');
  };

  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#9eccf1',
        minHeight: '100vh',
        padding: 20,
      }}
      >
        <Card style={{
          width: '90%',
          borderRadius: 16,
          backgroundColor: '#fbf7f7',

        }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Olá
              {' '}
              {name}
              ,
            </Typography>
            <Input onChange={requestSearch} searchable />
            <Paper style={{
              marginTop: 30, borderRadius: 10, display: 'block', overflow: 'auto',
            }}
            >
              <TableContainer component={Paper}>
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
                      if (key >= result + 5) {
                        if (key === result + 5) {
                          return (
                            <TableRow style={{ cursor: 'pointer' }} onClick={() => setResult(result + 5)}>
                              <TableCell />
                              <TableCell align="left">
                                Próximos 5 resultados
                              </TableCell>
                            </TableRow>
                          );
                        }
                        return <></>;
                      }
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
                              <IconButton sx={{ p: '10px' }} onClick={() => selectCountry(row, 'view')}>
                                <RemoveRedEyeIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar">
                              <IconButton
                                sx={{ p: '10px' }}
                                onClick={() => selectCountry(row, 'edit')}
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
          </CardContent>
        </Card>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{ top: '350px' }}
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Flag code={selected?.sigla3} height="100%" />
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
                    disabled={typeModal === 'view'}
                    inputLabel="Nome"
                    onChange={(e) => handleInputChange(e, 'name')}
                    defaultValue={selected?.nome}
                  />
                </Grid>
                <Grid item sm={6}>
                  <Input
                    disabled={typeModal === 'view'}
                    inputLabel="Capital"
                    onChange={setTeste}
                    defaultValue={selected?.capital}
                  />
                </Grid>
                <Grid item sm={4}>
                  <Input
                    disabled={typeModal === 'view'}
                    inputLabel="Área"
                    onChange={setTeste}
                    defaultValue={selected?.area}
                  />
                </Grid>
                <Grid item sm={4}>
                  <Input
                    disabled={typeModal === 'view'}
                    inputLabel="População"
                    onChange={setTeste}
                    defaultValue={selected?.populacao}
                  />
                </Grid>
                <Grid item sm={4}>
                  <Input
                    disabled={typeModal === 'view'}
                    inputLabel="Top-Level"
                    onChange={setTeste}
                    defaultValue={selected?.tld}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Button
                    variant="contained"
                    style={{ float: 'right' }}
                    endIcon={<SendIcon />}
                    onClick={onPressButton}
                  >
                    Continuar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
