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
  const [isStudent, setIsStudent] = useState(false);
  const navigate = useNavigate();
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);

  let modules = [
    "COMP12111",
    "COMP15111",
    "COMP13212",
    "COMP15212",
    "COMP16321",
    "COMP16412",
    "COMP11120",
    "COMP11212",
  ];

  useEffect(() => {
    if (localStorage.getItem("id") == null) {
      setAuthenticated(false);
      setTimeout(() => navigate("/login"), 2500);
    } else {
      setAuthenticated(true);
      if (localStorage.getItem("userType") !== "student") {
        setTimeout(() => navigate("/profile"), 2500);
      } else {
        setIsStudent(true);
      }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        setIsFooterAbsolute(containerHeight < windowHeight);
        // console.log(isFooterAbsolute);
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
        setFilteredTutors(res.data.tutors);
        console.log(res.data.tutors);
      })
      .catch((err) => console.debug(err));
  }, []);

  useEffect(() => {
    if (selectedModules.length > 0) {
      const filtered = tutors.filter((tutor) =>
        selectedModules.every((module) => tutor.modules.includes(module))
      );
      setFilteredTutors(filtered);
    } else {
      setFilteredTutors(tutors);
    }
  }, [selectedModules, tutors]);

  return (
    <div className="h-screen">
      <Navbar />
      {authenticated ? (
        isStudent ? (
          <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-4">Tutors</h1>
            <div className="flex items-center mb-4">
              <label className="text-xl font-bold mr-4">
                Filter by module:
              </label>
              {modules.map((module, index) => (
                <button
                  key={index}
                  className={`mr-4 px-4 py-2 border rounded-3xl ${
                    selectedModules.includes(module)
                      ? "bg-primaryColor text-white"
                      : "bg-white border border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white"
                  }`}
                  onClick={() => {
                    if (selectedModules.includes(module)) {
                      setSelectedModules(
                        selectedModules.filter((mod) => mod !== module)
                      );
                    } else {
                      setSelectedModules([...selectedModules, module]);
                    }
                  }}
                >
                  {module}
                </button>
              ))}
            </div>
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-4">
                {[...Array(4)].map((index) => (
                  <TutorCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div ref={containerRef} className="grid grid-cols-4 gap-4">
                {filteredTutors.map((tutor, index) => (
                  <TutorCard key={index} tutor={tutor} index={index} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="h-screen flex items-center justify-center">
            You have to be a student to view the tutors page, redirecting...
          </div>
        )
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
