/* The landing page component - if you found this, congrats!
The markup/html goes into the return statement below
Your css goes into the Home.scss file, and you can navigate to your page by going to localhost:5173/
*/
import './Home.scss'
export default function Home() {
  return (

    <div className='main-container'>
      <h1 className='header' >Year2Year</h1>
      <div className='body'>
     
        <button className='button'>Sign in:)</button>
        <br/>
        <p className='p1'>Smth smth, i dont understand why this thing is here on the right</p>
        <div class="footer">
          three buttons go here, profilr/homr/book now
        </div>

      </div>
     
    </div>
  );
}
