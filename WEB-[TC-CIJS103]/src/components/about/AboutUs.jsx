import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Carousel4 from "../../image/Carousel4.jpg"

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 mt-[90px]">
      <Header />
      {/* Hero Section */}
      <div className="relative w-full h-[300px]  bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${Carousel4})` }}>
        <h1 className="text-white text-5xl font-futura">ABOUT US</h1>
      </div>

      {/* Introduction Section */}
      <section className="py-16 px-6 lg:px-24 text-center">
        <h2 className="text-red-600 text-4xl font-futura mb-2 ">ABOUT US</h2>
        <h3 className="text-3xl font-futura mb-4">Introduction To Best Digital Agency!</h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 font-futura">
          Harum quisquam amet debitis pariatur quas? Nemo excepturi duis minim nostrum officiis dolorem fugit itaqua. Odio velit, odit, est, euismod aliquip luctus pharetra vero.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <h4 className="font-semibold mb-1 font-futura">Best Price Guaranteed</h4>
            <p className="text-sm text-gray-500 font-futura">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <h4 className="font-semibold mb-1 font-futura">Finance Analysis</h4>
            <p className="text-sm text-gray-500 font-futura">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <h4 className="font-semibold mb-1 font-futura">Professional Team</h4>
            <p className="text-sm text-gray-500 font-futura">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </section>

      {/* Image and Video Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center gap-8 px-6 lg:px-24 mb-20">
        <img
          src="https://img.freepik.com/free-photo/group-people-working-out-business-plan-office_1303-15869.jpg"
          alt="team working"
          className="w-full lg:w-1/2 rounded-xl shadow-lg"
        />
      </section>

      {/* Team Members Section */}
      <section className="bg-gray-50 py-16 px-6 lg:px-24 text-center">
        <h2 className="text-red-600 text-sm font-semibold mb-2 uppercase font-futura">Our Team</h2>
        <h3 className="text-3xl font-bold mb-6 font-futura">Team Members</h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 font-futura">
          Sint nascetur facere, delectus conubia consequuntur, nonummy distinctio! Non officiis, id natus non nisi provident justo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { name: "Nguyen Van A", role: "CEO, Director" },
            { name: "Tran thi B", role: "Head Manager" },
            { name: "Nguyen Van C", role: "Branch Manager" },
            { name: "Nguyen Hoang Phuc", role: "Supervisor" },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center"
            >
              <svg width="60px" height="60px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00024">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#ff4013"></path>
                  <path d="M16.807 19.0112C15.4398 19.9504 13.7841 20.5 12 20.5C10.2159 20.5 8.56023 19.9503 7.193 19.0111C6.58915 18.5963 6.33109 17.8062 6.68219 17.1632C7.41001 15.8302 8.90973 15 12 15C15.0903 15 16.59 15.8303 17.3178 17.1632C17.6689 17.8062 17.4108 18.5964 16.807 19.0112Z" fill="#ff4013"></path>
                  <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3432 6 9.00004 7.34315 9.00004 9C9.00004 10.6569 10.3432 12 12 12Z" fill="#ff4013"></path>
                </g>
              </svg>
              <h4 className="font-semibold text-lg">{member.name}</h4>
              <p className="text-sm text-gray-500 mb-4">{member.role}</p>
              <div className="flex gap-2 text-gray-400">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-linkedin-in"></i>
              </div>
            </div>
          ))}
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default AboutUs;