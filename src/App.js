import "bootstrap/dist/css/bootstrap.min.css"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Routes from "./routes/routes"

import { Provider } from "react-redux"
import store from "./store"


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7632DB",
    },
    secondary: {
      main: "#FFEC51",
    },
  },
});



function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
    </ThemeProvider>
  );
}

export default App;
