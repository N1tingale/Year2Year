export default function FAQItem({ question, information }) {
  return (
    <div className="my-4 shadow-md text-center collapse max-w-3/5 collapse-arrow tagline-font join-item border border-primaryColor">
      <input type="radio" name="my-accordion-4" />
      <div className="collapse-title text-primary font-bold text-left">
        {question}
      </div>
      <div className="text-left collapse-content">
        <p>{information}</p>
      </div>
    </div>
  );
}
