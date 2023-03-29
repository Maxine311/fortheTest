import "./App.css";
import BaseContainer from "./containers/search.container";
import { Route, Routes } from "react-router-dom";
import QuestionContainer from "./containers/questionDetail.container";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BaseContainer />}></Route>
        <Route path="/qustionContainer/:id" element={<QuestionContainer />} />
      </Routes>
    </div>
  );
}

export default App;
