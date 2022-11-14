import ListScreen from "./list";
import AddScreen from "./add";
import EditScreen from "./edit";
import membersReducer from "./reducers/members-reducer";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";


const store = configureStore(
  {
    reducer: {
      members: membersReducer
    }
  }
);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListScreen/>}></Route>
          <Route path="/add" element={<AddScreen/>}></Route>
          <Route path="/edit/:id" element={<EditScreen/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
