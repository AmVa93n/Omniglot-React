import Hero from "../components/Hero"
import Features from "../components/Features"
import TopLanguages from "../components/TopLanguages"
import "../styles/HomePage.css"

function HomePage() {
    return (
        <>
            <Hero />
                
            <div className="b-example-divider"></div>

            <Features />
                
            <div className="b-example-divider"></div>
                
            <TopLanguages />
        </>
    )
}

export default HomePage