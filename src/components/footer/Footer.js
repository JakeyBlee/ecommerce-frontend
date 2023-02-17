import './footer.css';

export const Footer = () => {
    return(
        <footer className='footer'>
            <h1 className='siteName'>Friends of the Thread</h1>
                <section className='icons'>  
                <img src={require("../../media/facebook.png")} alt="Facebook"/>
                <img src={require("../../media/instagram.png")} alt="Instagram"/>
                <img src={require("../../media/twitter.png")} alt="Twitter"/>
                </section>
        </footer>
    )
}