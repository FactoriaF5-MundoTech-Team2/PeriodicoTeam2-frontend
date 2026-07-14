import Header from "./components/Header/Header";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <main>
        <Header />
        <Outlet />
      </main>
    </>
  );
}
export default App;
