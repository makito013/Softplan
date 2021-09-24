import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Flag from 'react-world-flags';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import { Redirect } from 'react-router-dom';
import Input from '../../components/input';
import { allMutations } from '../../operations/mutations';

export default function Login(): React.ReactElement {
  const [nome, setNome] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  const onPressButton = (): void => {
    allMutations.editName(nome);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/flags" />;
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      style={{ backgroundColor: '#9eccf1' }}
    >
      <Grid item xs={4}>
        <Card style={{ width: 600, height: 200 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Digite seu Nome:
            </Typography>
            <div style={{ width: '100%' }}>
              <Input
                onChange={(e) => setNome(e.trim())}
                defaultValue={nome}
                id="input-name"
              />
            </div>
            <Button
              variant="contained"
              style={{ float: 'right' }}
              endIcon={<SendIcon />}
              onClick={onPressButton}
            >
              Continuar
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
