import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  rootBox: {
    justifyContent: 'flex-start',
    width: '75%',
    padding: theme.spacing(2),
    margin: 'auto',
    display: 'flex',
    backgroundColor: 'white',
  },
  button: {
    margin: theme.spacing(1),
  },
  avatarGrid: {
    marginTop: 15,
  },
  uploadFilesGrid: {
    textAlign: 'center',
    display: 'none',
  },
  passwordLabelGrid: {
    textAlign: 'center',
    marginBottom: 10,
    visibility: 'hidden',
  },
  contactChannelContainer: {
    marginTop: 5,
    marginBottom: 6,
    alignItems: 'center',
  },
  contactChannelValueGrid: {
    textAlign: 'end',
  },
  submitButtonGrid: {
    textAlign: 'center',
    marginTop: 50,
  },
  errorMessage: {
    color: 'red',
  },
}));
