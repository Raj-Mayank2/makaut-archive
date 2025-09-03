// src/pages/AboutPage.jsx
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-white max-w-4xl mx-auto p-8 rounded-lg shadow-lg border border-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Makaut Archives
        </h1>
        <p className="text-lg text-gray-600">
          A dedicated platform for the students of MAKAUT.
        </p>
      </div>

      <div className="my-10 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Project Mission</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          The mission of Makaut Archives is to create a seamless and centralized hub for academic resources. By providing an intuitive platform for sharing and accessing notes, we aim to foster a collaborative learning environment and empower students to achieve their academic goals more effectively.
        </p>
      </div>

      <div className="my-10 text-center bg-gray-50 p-8 rounded-lg border">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">About the Creator</h2>
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🧑‍💻</div>
          <h3 className="text-3xl font-bold text-indigo-600">Mayank</h3>
          <p className="text-gray-600 text-lg mt-2">
            This project was conceptualized, designed, and developed entirely by me. It serves as a practical solution to a common challenge faced by students and is a testament to my passion for building useful, high-quality web applications.
          </p>
        </div>
      </div>

      <div className="text-center mt-10 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Have questions, feedback, or want to connect? Feel free to reach out.
        </p>
        <a 
          href="https://www.linkedin.com/in/your-linkedin-profile" // Replace with your LinkedIn or GitHub link
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
        >
          Connect on LinkedIn
        </a>
      </div>
    </div>
  );
};

export default AboutPage;