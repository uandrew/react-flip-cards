import React from "react";
import "./App.scss";
import Start from "./components/Start";

import CHARACTERS from "./characters";

const App = () => <Start characters={CHARACTERS} />;

export default App;
