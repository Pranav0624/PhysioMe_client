import React from 'react';
import './FAQ.css'; // Optional: For custom styles

const faqData = [
  {
    question: "How do I create an account?",
    answer: "Click on the 'Sign Up' button on the navbar to create an account.",
  },
  {
    question: "Can I customize my workout plan?",
    answer: "Yes! Our programs are tailored to your specific needs and preferences.",
  },
  {
    question: "What if I have a medical condition?",
    answer: "Please consult with your healthcare provider before starting any new exercise program.",
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach us via the contact information provided above.",
  },
];

const FAQ = () => {
  return (
    <section id="faq">
      <h2>FAQ's</h2>
      {faqData.map((faq, index) => (
        <FAQCard key={index} question={faq.question} answer={faq.answer} />
      ))}
    </section>
  );
};

const FAQCard = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-card" onClick={toggleAnswer}>
      <h3 className="faq-question">{question}</h3>
      {isOpen && <p className="faq-answer">{answer}</p>}
    </div>
  );
};

export default FAQ;
