import Hero from "./Hero/Hero";
import Box from "../Box/Box";
import About from "./About/About";

function Home() {

    return (

        <div>

            <Hero />
            <Box categoryName="adventure" index={0} />
            <Box categoryName="puzzle" index={1} />
            <Box categoryName="education" index={2} />
            <Box categoryName="reflex" index={3} />
            <Box categoryName="sports" index={4} />

            <About />




        </div>
    )
}

export default Home;
