<<<<<<< HEAD
//import Header from "./components/Header/Header";
//import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router";

function App() {

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
=======
import AppRoutes from "./routes/AppRoutes"

function App() {
  return <AppRoutes />
}

>>>>>>> 89fe3162514d53d70169d8528cdd1d6f622dad2f
export default App