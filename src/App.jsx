//import Header from "./components/Header/Header";
import Button from "./features/articles/components/RejectButton/RejectButton";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <main>
        {/* <Header /> */}
        <Button />
        <Outlet />
      </main>
    </>
  );
}
export default App;
