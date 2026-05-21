import React from "react";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";

function App() {
  const token = localStorage.getItem("token");
  return (
   <div>
      {
        token ? <Dashboard /> : <Auth />
      }
    </div>
  );
}

export default App;