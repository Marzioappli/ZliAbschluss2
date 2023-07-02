import "../App.css"

function Homepage() {
    return (
    <div>
        <h1>Lernende Verwaltung</h1>
        {/*  <img src='https://ca.slack-edge.com/T018VJU1LJF-U02D8LBLW0G-4523f03352eb-512' alt=''className="pictureHome"></img> */}
        <a href="https://www.zli.ch/">
        <img src="https://www.schoolexpo.ch/files/school_ausstelleraz__92816070.png"  alt="" className="pictureHome"></img>
        </a>
        <div>
        <a href="./Verwaltung.js" target="" rel="noopener noreferrer">
        <button className="button">Verwaltung Lernende</button>
        </a>
    </div>
    </div>
    );
}
export default Homepage;