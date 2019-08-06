import { createMuiTheme } from '@material-ui/core/styles';
import { indigo, deepOrange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: deepOrange,
  },
});
console.log(theme.spacing(2));
export default theme;
