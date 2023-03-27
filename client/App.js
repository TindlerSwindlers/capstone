import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import ScrollButton from "./components/ScrollToTop";

const App = () => {
  return (
    <div className='loginPage'>
      <Navbar />
      <Routes />
      <ScrollButton />
    </div>
  );
};

export default App;
