/* The landing page component - if you found this, congrats!
The markup/html goes into the return statement below
Your css goes into the Home.scss file, and you can navigate to your page by going to localhost:5173/
*/
import Navbar from "../../components/Navbar";
import "./Home.scss";
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1 className="header">Year2Year</h1>
        <p className="header-text">Uniting students, year to year</p>
      </div>
    </div>
  );
}
