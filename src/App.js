import "bootstrap/dist/css/bootstrap.min.css"
import Routes from "./routes/routes"

import { Provider } from "react-redux"
import store from "./store"



function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
