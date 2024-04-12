import Footer from "./Footer";
import Navbar from "./Navbar";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="text-primaryColor p-8 rounded-lg container mx-auto text-center">
        <div className="inline-block rounded-xl border-2 border-black my-4 bg-white">
          <h1 className="text-3xl font-extrabold p-4">
            Privacy Policy Year2Year
          </h1>
        </div>
        <p className="mb-4">
          <strong className="font-semibold">Effective Date:</strong> April 10,
          2024
        </p>
        <p className="mb-4">
          Welcome to Year2Year! We value your privacy and are committed to
          protecting your personal information.
        </p>
        <p className="mb-4">
          This Privacy Policy outlines how we collect, use, and safeguard your
          data when you use our tutoring platform.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">
          1. Infоrmation We Collect:
        </h2>
        <ul className="pl-5 mb-4">
          <li>
            <strong className="font-semibold">
              {" "}
              User Profile Information:
            </strong>{" "}
            When you sign up for Year2Year, we collect basic information such as
            your name, email address, and university affiliation.
          </li>
          <li>
            <strong className="font-semibold"> Messaging Data:</strong> We store
            messages exchanged between students and tutors within our platform.
          </li>
          <li>
            <strong className="font-semibold"> Module Preferences:</strong> To
            connect you with relevant tutors, we collect information about the
            modules you’re studying.
          </li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-2">
          2. How We Use Your Information:
        </h2>
        <ul className="pl-5 mb-4">
          <li>
            <strong className="font-semibold">
              {" "}
              Connecting Students and Tutors:
            </strong>{" "}
            We use your profile information to match you with suitable tutors.
          </li>
          <li>
            <strong className="font-semibold"> Improving Our Services:</strong>{" "}
            We analyze usage patterns to enhance Year2Year’s functionality.
          </li>
          <li>
            <strong className="font-semibold"> Communication:</strong> We use
            your email address to send important updates and notifications.
          </li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-2">3. Data Security:</h2>
        <p className="mb-4">
          We employ industry-standard security measures to protect your data
          from unauthorized access, loss, or misuse.
        </p>
        <p className="mb-4">
          However, please note that no method of transmission over the internet
          or electronic storage is completely secure.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">
          4. Third-Party Services:
        </h2>
        <p className="mb-4">
          Year2Year does not have any third party services.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">5. Your Rights:</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal
          information. If you have any concerns, please contact our support
          team.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2">
          6. Changes to this Policy:
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy periodically. Check our website for
          the latest version. By using Year2Year, you agree to the terms
          outlined in this Privacy Policy.
        </p>
        <p className="mb-4">
          If you have any questions or need assistance, feel free to reach out
          to us at year2yearmcrsupport@gmail.com.
        </p>
        <p className="mb-4">
          Thank you for choosing Year2Year for your tutoring needs! 📚🎓
        </p>
      </div>
      <Footer relative={true} />
    </>
  );
}
