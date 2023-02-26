import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getContacts } from 'redux/contacts/operations';
import Header from 'components/Header/Header';
import AddContactForm from 'components/AddContactForm/AddContactForm';
import ContactsList from 'components/ContactsList/ContactsList';
import UpdateContactForm from 'components/UpdateContactForm/UpdateContactForm';
import {
  toggleAddContactModal,
  toggleUpdateContactModal,
} from 'redux/global/slice';
import { Container, Box, Dialog, Button } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const isAddContactModalOpen = useAppSelector(
    state => state.global.isAddContactModalOpen
  );
  const isUpdateContactModalOpen = useAppSelector(
    state => state.global.isUpdateContactModalOpen
  );

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box>
      <Header />
      <Box component="main" pt={4} pb={4}>
        <Container>
          <Dialog
            fullScreen={fullScreen}
            open={isAddContactModalOpen}
            onClose={() => dispatch(toggleAddContactModal())}
          >
            <AddContactForm />
          </Dialog>
          <Dialog
            fullScreen={fullScreen}
            open={isUpdateContactModalOpen}
            onClose={() => dispatch(toggleUpdateContactModal())}
          >
            <UpdateContactForm />
          </Dialog>
          <ContactsList />
          <Box position="fixed" bottom="40px" right="40px">
            <Button
              type="button"
              variant="contained"
              color="primary"
              startIcon={<AddCircleRoundedIcon />}
              onClick={() => dispatch(toggleAddContactModal())}
            >
              Add contact
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
