import Hero from "./Hero/Hero";
import Box from "../Box/Box";
import About from "./About/About";

function Home() {

    return (

        <div>

            <Hero />
            <Box categoryName="action" />
            <Box categoryName="puzzle" />
            <Box categoryName="adventure" />
            <Box categoryName="arcade" />
            <Box categoryName="sports" />

            <About />
            
  


        </div>
    )
}

export default Home;
