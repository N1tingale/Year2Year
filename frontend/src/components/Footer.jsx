import { Link } from "react-router-dom";
export default function Footer({ relative }) {
  return (
    <footer
      className={`${
        relative ? "relative" : "absolute left-0 bottom-0"
      } footer items-center px-2 py-1 bg-primaryColor`}
    >
      <aside className="text-white items-center grid-flow-col">
       <img alt="Year 2 Year Logo" width={50} height={50} src="/y-white.png"/>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 text-white flex md:place-self-center md:justify-self-end">
        <div className="flex gap-4 text-lg font-semibold text-right">
          <a href="mailto:year2yearmcr@gmail.com">Contact Us</a>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </nav>
    </footer>
  );
}
