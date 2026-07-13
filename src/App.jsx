//import Header from "./components/Header/Header";
//import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router";
import PublishButton from "./features/articles/components/PublishButton/PublishButton";

function App() {

  return (
    <>
      <main>
        <Outlet />
        <PublishButton/>
      </main>
    </>
  )
}
export default App