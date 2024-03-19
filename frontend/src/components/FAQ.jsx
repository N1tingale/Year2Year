import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function FAQ() {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="p-4 text-primaryColor">
        <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>

        <h2 className="text-xl font-semibold mb-2">What is Year2Year?</h2>
        <p className="mb-4">
          Year2Year is a platform that connects students with tutors from their
          university. Students can find tutors to help them with their modules
          using our messaging system.
        </p>

        <h2 className="text-xl font-semibold mb-2">How can I find a tutor?</h2>
        <p className="mb-4">
          You can search for tutors by module. Once you find a tutor you're
          interested in, you can send them a message to start a conversation.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          How can I register as a tutor?
        </h2>
        <p className="mb-4">
          You can register as a tutor by creating an account and selecting the
          "Register as Tutor" option. You'll need to provide information about
          the modules you can tutor.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          How do I communicate with a tutor?
        </h2>
        <p className="mb-4">
          Once you've found a tutor you're interested in, you can send them a
          message directly through our platform. You can discuss your needs,
          schedule, and any other details directly with the tutor.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          What subjects are available for tutoring?
        </h2>
        <p className="mb-4">
          Tutors on Year2Year cover a wide range of subjects. You can search for
          tutors by module to find help in the specific subject you're looking
          for.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          Can I be both a tutor and a student?
        </h2>
        <p className="mb-4">
          Yes, you can register as both a student and a tutor. You can offer
          tutoring in the modules you're confident in, and find tutors for the
          modules you need help with.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          What if I have a problem with a tutor?
        </h2>
        <p className="mb-4">
          If you encounter any issues with a tutor, please contact our support
          team. We're here to help ensure that Year2Year is a safe and
          productive environment for everyone.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          How can I give feedback on a tutor?
        </h2>
        <p className="mb-4">
          After a tutoring session, you'll have the opportunity to leave
          feedback for the tutor. This helps us ensure the quality of tutors on
          Year2Year and helps other students make informed decisions.
        </p>
      </div>
      <Footer relative={true} />
    </div>
  );
}
