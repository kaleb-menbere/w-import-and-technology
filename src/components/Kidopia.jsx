import "./Kidopia.css";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Footer from "./Footer/Footer";
import Category from "./Category/Category";

function Kidopia() {

  return (

    <div >
      {/* Header */}
      <Header />
      <main>
        <Home />
        <Category/>
      </main>
      <Footer />

    </div>
  )
}

export default Kidopia;
