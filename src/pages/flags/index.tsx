import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FC, useEffect, useState } from 'react';
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
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from '@apollo/client';
import Input from '../../components/input';
import { countriesTypes } from '../../util/countries';
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

interface params {
  countries: countriesTypes[],
  loading: boolean
}

const FlagsTable: FC<params> = ({
  countries,
  loading,
}) => {
  const [rows, setRows] = useState<countriesTypes[]>();
  const [selected, setSelected] = useState<countriesTypes>();
  const [searched, setSearched] = useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [test, setTeste] = React.useState<string>('');
  const [result, setResult] = React.useState<number>(0);
  const [typeModal, setTypeModal] = React.useState<string>('view');
  const { name } = useQuery(GET_NAME).data;

  useEffect(() => {
    setRows(countries);
  }, [loading]);

  const requestSearch = (searchedVal: string): void => {
    let filteredRows = countries?.filter((row: countriesTypes) => row?.name.toLowerCase().includes(searchedVal.toLowerCase()));
    if (filteredRows?.length === 0) filteredRows = countries?.filter((row: countriesTypes) => row?.alpha3Code.toLowerCase().includes(searchedVal.toLowerCase()));
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
      setRows(allMutations.editCountries(selected));
    }
    setOpen(false);
  };

  const handleInputChange = (e: string, index: string): void => {
    const newValue = { ...selected, [index]: e.trim() } as countriesTypes;
    setSelected(newValue);
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
            <Typography variant="h5" component="div" data-testid="named">
              Olá
              {' '}
              {name}
              ,
            </Typography>
            <Input onChange={requestSearch} searchable id="inputFlagsSearch" />
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
                  <TableBody data-testid="tableFlags">
                    {rows?.map((row, key) => {
                      if (key >= result + 5) {
                        if (key === result + 5) {
                          return (
                            <TableRow key={key.toString()} style={{ cursor: 'pointer' }} onClick={() => setResult(result + 5)}>
                              <TableCell />
                              <TableCell align="left">
                                Próximos 5 resultados
                              </TableCell>
                              <TableCell />
                              <TableCell />
                              <TableCell />
                            </TableRow>
                          );
                        }
                        return null;
                      }
                      return (
                        <TableRow data-testid={`tableRow-${row.name}`} key={key.toString()}>
                          <TableCell width={30} align="left">
                            <Flag code={row.alpha3Code} height="16" />
                          </TableCell>
                          <TableCell component="th">
                            {row.name}
                          </TableCell>
                          <TableCell component="th">
                            {row?.capital || 'Essa é uma capital'}
                          </TableCell>
                          <TableCell align="right">{row.alpha2Code}</TableCell>
                          <TableCell align="right">
                            <Tooltip title="Ver">
                              <IconButton data-testid={`ButtonView-${row.name}`} sx={{ p: '10px' }} onClick={() => selectCountry(row, 'view')}>
                                <RemoveRedEyeIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar">
                              <IconButton
                                data-testid={`ButtonEdit-${row.name}`}
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
        data-testid={`Modal-${selected?.name}`}
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
                <Flag code={selected?.alpha3Code} height="100%" />
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <Typography data-testid={`Label-${selected?.name}`} id="modal-modal-title" variant="h6" component="h2">
                    {selected?.name}
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <Input
                    disabled
                    id={`InputName-${selected?.name}`}
                    inputLabel="Nome"
                    onChange={(e) => handleInputChange(e, 'nome')}
                    defaultValue={selected?.name}
                  />
                </Grid>
                <Grid item sm={6}>
                  <Input
                    disabled={typeModal === 'view'}
                    id={`InputCapital-${selected?.name}`}
                    inputLabel="Capital"
                    onChange={(e) => handleInputChange(e, 'capital')}
                    defaultValue={selected?.capital}
                  />
                </Grid>
                <Grid item sm={4}>
                  <Input
                    disabled={typeModal === 'view'}
                    id={`InputArea-${selected?.name}`}
                    inputLabel="Área"
                    onChange={(e) => handleInputChange(e, 'area')}
                    defaultValue={selected?.area}
                  />
                </Grid>
                <Grid item sm={4}>
                  <Input
                    disabled={typeModal === 'view'}
                    id={`InputPopulacao-${selected?.name}`}
                    inputLabel="População"
                    onChange={(e) => handleInputChange(e, 'populacao')}
                    defaultValue={selected?.population}
                  />
                </Grid>
                <Grid item sm={4}>
                  <Input
                    disabled={typeModal === 'view'}
                    id={`InputDominio-${selected?.name}`}
                    inputLabel="Domínio"
                    onChange={(e) => handleInputChange(e, 'tld')}
                    defaultValue={selected?.demonym}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Button
                    variant="contained"
                    style={{ float: 'right' }}
                    endIcon={typeModal === 'view' ? <CloseIcon /> : <SendIcon />}
                    onClick={() => setOpen(false)}
                    color={typeModal === 'view' ? 'error' : 'primary'}
                  >
                    {typeModal === 'view' ? 'Fechar' : 'Salvar'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default FlagsTable;
