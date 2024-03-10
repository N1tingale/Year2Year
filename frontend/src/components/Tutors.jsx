import { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import TutorCard from "./TutorCard";
import TutorCardSkeleton from "./TutorCardSkeleton";

export default function Tutors() {
  const [isLoading, setIsLoading] = useState(true);
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/tutors")
      .then((res) => {
        console.log(res);
        // setIsLoading(false)
        setTimeout(() => setIsLoading(false), 250);
        setTutors(res.data.tutors);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-screen">
      <Navbar />
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">Tutors</h1>
        {isLoading ? (
          <div className="grid grid-cols-4 gap-4">
            {[...Array(5)].map(() => (
              <TutorCardSkeleton />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {tutors.map((tutor, index) => (
              <TutorCard key={index} tutor={tutor} index={index} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
