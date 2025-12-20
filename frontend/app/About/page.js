"use client"
import { useState } from 'react';
import { Footer } from '../Footer';
import Header2 from '../Header2';

const About = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const toggleAnswer = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
      <div className="min-h-screen bg-gray-100">
            <Header2 />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row justify-between items-center py-8 md:py-16">
                    <div className="w-full lg:w-1/2 space-y-8 mb-8 lg:mb-0">
                        <img
                            src="/shoes.png"
                            alt="Shoes img 1"
                            className="w-full max-w-md mx-auto rounded-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                        />
                        <img
                            src="/shoes2.png"
                            alt="Shoes img 2"
                            className="w-full max-w-md mx-auto rounded-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 lg:pl-8">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">About Us</h1>
                        <p className="text-lg sm:text-xl lg:text-2xl mb-8">
                            Welcome to our Website, the ultimate destination for shoe enthusiasts and
                            fashion-forward individuals. We are passionate about footwear and committed to bringing you the latest trends,
                            timeless classics, and the highest quality shoes from around the world.
                        </p>
                        <button
                            className="w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-white text-white hover:text-black font-bold rounded-lg transition-colors duration-300"
                            onClick={() => window.location.href = '/ContactUs'}
                        >
                            Contact Us
                        </button>
                    </div>
                </div>

                <div className="py-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center">Our Partners</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {['/flipkart.png', '/amazon.png', '/myntra.png', '/snapdeal.png'].map((src, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition-transform duration-300">
                                <img
                                    src={src}
                                    alt={`Partner ${index + 1} Logo`}
                                    className="w-full h-40 object-contain rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="py-16">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 text-center">Our Team</h1>
                    <p className="text-lg sm:text-xl font-medium mb-12 text-center">
                        Introducing our dynamic and resilient team—innovators, collaborators, and
                        leaders dedicated to shaping success at every turn.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            { name: 'Siya', role: 'CEO and Founder', img: '/ai2.png' },
                            { name: 'Jullie', role: 'Director', img: '/ai3.png' },
                            { name: 'Mathew', role: 'Assistant Director', img: '/ai4.png' }
                        ].map((person, index) => (
                            <div key={index} className="flex flex-col items-center space-y-4 hover:scale-105 transition-transform duration-300">
                                <img
                                    src={person.img}
                                    alt={person.name}
                                    className="w-48 h-48 rounded-full object-cover"
                                />
                                <h2 className="text-xl font-semibold">{person.name}</h2>
                                <p className="text-lg">{person.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-4xl mx-auto p-6 bg-blue-300 shadow-md rounded-md my-16">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
                    <p className="text-lg sm:text-xl mb-10 font-semibold text-center">
                        Welcome to Shoez, your premier destination for all things footwear! View The
                        Questions We Get Often.
                    </p>
                    <div>
                        {['What is your return policy?', 'How do I track my order?', 'Do you offer international shipping?', 'Can I change my order after it has been placed?'].map((question, index) => (
                            <div key={index} className="faq-item border-b border-gray-200 py-4">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleAnswer(index)}
                                >
                                    <span className="text-base sm:text-lg font-semibold">
                                        {activeIndex === index ? '−' : '+'} {question}
                                    </span>
                                </div>
                                <div
                                    className={`answer mt-2 text-gray-600 ${activeIndex === index ? '' : 'hidden'}`}
                                >
                                    <p>{['You can return any shoes within 30 days of purchase for a full refund.', 'Once your order has shipped, we will send you an email with the tracking information.', 'Yes, we ship to most countries worldwide. Additional shipping fees may apply.', 'You can change your order within 24 hours of placing it by contacting our customer service.'][index]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;