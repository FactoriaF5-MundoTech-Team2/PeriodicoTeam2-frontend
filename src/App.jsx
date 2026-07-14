//import Header from "./components/Header/Header";
//import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router";
//import CardImage from "./components/CardImage/CardImage";
//import PublishButton from "./features/articles/components/PublishButton/PublishButton";
//import SearchBar from "./features/articles/components/SearchBar/SearchBar";
//import Footer from "./components/Footer/Footer";
import FilterButton from "./features/articles/components/FilterButton/FilterButton";

function App() {

  return (
    <>
      <main>
        <Outlet />
        {/* <PublishButton/> */}
        {/* <SearchBar/> */}
        <FilterButton/>
        {/* <CardImage/> */}
      </main>
      {/* <Footer/> */}
    </>
  )
}
export default App