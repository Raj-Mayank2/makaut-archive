// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

// It's a good practice to import icons as components, for example from a library like 'lucide-react'
// For now, we will use emojis as placeholders.
// import { BookOpen, BrainCircuit, Users, Search, Download, Target } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      
      {/* ## 1. Hero Section - Refined for Impact ## */}
      <div className="relative text-center pt-28 pb-24 px-6 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Master Your MAKAUT Semesters
            </span>
            <span className="block text-4xl md:text-6xl text-gray-700 mt-2">
              All Resources, One Platform.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Your ultimate hub for PYQs, lecture notes, syllabus, and AI-powered tools designed exclusively for MAKAUT students.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/dashboard"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative flex items-center space-x-2">
                <span>Find Your Subject Notes</span>
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🚀</span>
              </span>
            </Link>
            
          </div>
        </div>
      </div>
      
      {/* ## 2. How It Works Section - NEW ## */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Get Started in 3 Simple Steps</h2>
          <p className="text-lg text-gray-600 mb-12">Navigating your academic resources has never been easier.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-24 h-24 mb-6 bg-blue-100 rounded-full text-4xl">🔍</div>
              <h3 className="text-2xl font-semibold mb-2">1. Find Your Subject</h3>
              <p className="text-gray-600">Use our powerful search to filter by semester, stream, or subject code instantly.</p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-24 h-24 mb-6 bg-purple-100 rounded-full text-4xl">📄</div>
              <h3 className="text-2xl font-semibold mb-2">2. Download Resources</h3>
              <p className="text-gray-600">Access a vast library of high-quality PDFs, notes, and PYQs uploaded by peers and professors.</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-24 h-24 mb-6 bg-pink-100 rounded-full text-4xl">🏆</div>
              <h3 className="text-2xl font-semibold mb-2">3. Ace Your Exams</h3>
              <p className="text-gray-600">Study smarter with our AI tools and well-organized materials to boost your SGPA.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ## 3. Features Section - More Detailed ## */}
      <div className="py-24 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                An Arsenal for Every Student
              </span>
            </h2>
            <p className="text-lg text-gray-600">Everything you need to thrive at MAKAUT, all in one place.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card 1 */}
            <FeatureCard icon="📚" title="Vast Resource Library" description="Organized by semester & branch. Find exactly what you need for CSE, IT, ECE, ME, and more." color="blue" />
            {/* Feature Card 2 */}
            <FeatureCard icon="✨" title="AI Exam Prep Toolkit" description="Generate unique question papers from PYQs and get insights into important topics." color="purple" />
            {/* Feature Card 3 */}
            <FeatureCard icon="🤝" title="Collaborative Learning Hub" description="A platform by MAKAUTians, for MAKAUTians. Share notes, discuss topics, and grow together." color="pink" />
            {/* Feature Card 4 */}
            <FeatureCard icon="📊" title="SGPA / YGPA Tracker" description="Track your academic progress, calculate your SGPA, and set goals for upcoming semesters." color="indigo" />
          </div>
        </div>
      </div>

      {/* ## 4. By the Numbers Section - NEW ## */}
      <div className="py-20 px-6 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">5,000+</p>
              <p className="text-xl mt-2 text-gray-300">Active Students</p>
            </div>
            <div>
              <p className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">2,000+</p>
              <p className="text-xl mt-2 text-gray-300">Notes & PYQs</p>
            </div>
            <div>
              <p className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">10+</p>
              <p className="text-xl mt-2 text-gray-300">Engineering Streams Covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* ## 5. Community Testimonials - NEW ## */}
      <div className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">What Our Seniors Say</h2>
          <p className="text-lg text-gray-600 mb-12">Don't just take our word for it. Hear from fellow MAKAUT students.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard
              quote="This platform was a lifesaver during my 5th-semester exams. The PYQ generator is a game-changer!"
              author="Ankita Sharma"
              details="CSE, 3rd Year"
            />
            <TestimonialCard
              quote="Finding notes for my ECE subjects was always a hassle. MAKAUT Archive brought everything together. Highly recommended."
              author="Rohan Das"
              details="ECE, 4th Year"
            />
          </div>
        </div>
      </div>

      {/* ## 6. Final Call to Action ## */}
      <div className="relative py-24 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/40 p-12">
            <div className="text-5xl mb-8 animate-bounce">🎓</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ready to Ace Your Next Exam?
              </span>
            </h2>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              Join thousands of fellow MAKAUT students. Your journey to a better SGPA starts now.
            </p>
            <Link 
              to="/dashboard"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative flex items-center space-x-3">
                <span>Start Learning Now</span>
                <span className="text-2xl group-hover:translate-x-1 transition-transform duration-300">📖</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for Features
const FeatureCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    blue: 'group-hover:text-blue-600 from-blue-500/5 to-purple-600/5',
    purple: 'group-hover:text-purple-600 from-purple-500/5 to-pink-600/5',
    pink: 'group-hover:text-pink-600 from-pink-500/5 to-indigo-600/5',
    indigo: 'group-hover:text-indigo-600 from-indigo-500/5 to-blue-600/5',
  };
  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/40 p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
      <div className={`absolute inset-0 bg-gradient-to-br rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colorClasses[color]}`}></div>
      <div className="relative z-10">
        <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className={`text-2xl font-bold text-gray-800 mb-4 transition-colors duration-300 ${colorClasses[color]}`}>
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// Helper component for Testimonials
const TestimonialCard = ({ quote, author, details }) => {
  return (
    <div className="bg-gray-100/80 p-8 rounded-2xl shadow-lg text-left">
      <p className="text-lg text-gray-700 italic mb-6">"{quote}"</p>
      <div>
        <p className="font-bold text-gray-900">{author}</p>
        <p className="text-sm text-gray-500">{details}</p>
      </div>
    </div>
  );
};

export default HomePage;