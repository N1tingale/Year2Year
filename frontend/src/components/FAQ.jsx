import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import FAQItem from "./FAQItem";

export default function FAQ() {
  return (
    <div>
      <div className="container mx-auto h-screen">
        <Navbar />
        <div className="mt-10 flex text-center justify-center mx-auto justify-center items-center rounded-xl border-2 border-black m-2 bg-white w-2/5">
          <h1 className="text-3xl font-extrabold p-4 px-16">
            Frequently Asked Questions
          </h1>
        </div>
        <div className="p-4 text-primaryColor">
          <FAQItem
            question="What is Year2Year?"
            information="Year2Year is a platform that connects students with tutors from their university. Students can find tutors to help them with their modules using our messaging system."
          />

          <FAQItem
            question="How can I find a tutor?"
            information="You can search for tutors by module. Once you find a tutor you're interested in, you can send them a message to start a conversation."
          />

          <FAQItem
            question="How can I register as a tutor?"
            information="You can register as a tutor by creating an account and selecting the 'Register as Tutor' option. You'll need to provide information about the modules you can tutor."
          />

          <FAQItem
            question="How do I communicate with a tutor?"
            information="Once you've found a tutor you're interested in, you can send them a message directly through our platform. You can discuss your needs, schedule, and any other details directly with the tutor."
          />

          <FAQItem
            question="What subjects are available for tutoring?"
            information="Tutors on Year2Year cover a wide range of subjects. You can search for tutors by module to find help in the specific subject you're looking for."
          />

          <FAQItem
            question="Can I be both a tutor and a student?"
            information="Yes, you can register as both a student and a tutor. You can offer tutoring in the modules you're confident in, and find tutors for the modules you need help with."
          />

          <FAQItem
            question="What if I have a problem with a tutor?"
            information="If you encounter any issues with a tutor, please contact our support team or report the user. We're here to help ensure that Year2Year is a safe and productive environment for everyone."
          />

          <FAQItem
            question="How can I give feedback on a tutor?"
            information="After a tutoring session, you'll have the opportunity to leave feedback for the tutor. This helps us ensure the quality of tutors on Year2Year and helps other students make informed decisions."
          />
        </div>
      </div>
      <Footer relative={true} />
    </div>
  );
}
