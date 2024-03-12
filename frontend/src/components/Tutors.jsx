import { useEffect, useState, useRef } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import TutorCard from "./TutorCard";
import TutorCardSkeleton from "./TutorCardSkeleton";
import { useNavigate } from "react-router-dom";

export default function Tutors() {
  const containerRef = useRef(null);
  const [isFooterAbsolute, setIsFooterAbsolute] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [tutors, setTutors] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("id") == null) {
      setTimeout(() => navigate("/login"), 2500);
    } else {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        setIsFooterAbsolute(containerHeight < windowHeight);
        console.log(isFooterAbsolute);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoading]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/tutors")
      .then((res) => {
        console.log(res);
        setTimeout(() => setIsLoading(false), 250);
        setTutors(res.data.tutors);
        console.log(res.data.tutors);
      })
      .catch((err) => console.debug(err));
  }, []);

  return (
    <div className="h-screen">
      <Navbar />
      {authenticated ? (
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold mb-4">Tutors</h1>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-4">
              {[...Array(4)].map((index) => (
                <TutorCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div ref={containerRef} className="grid grid-cols-4 gap-4">
              {tutors.map((tutor, index) => (
                <TutorCard key={index} tutor={tutor} index={index} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          You have to be authenticated to view the tutors page, redirecting to
          login...
        </div>
      )}
      <Footer relative={!isFooterAbsolute} />
    </div>
  );
}
