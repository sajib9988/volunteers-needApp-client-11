
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black text-white p-8 mb-2 mx-auto container rounded">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-xl font-bold mb-4">About Us</h2>
                    <p>
                        We are committed to connecting volunteers with opportunities to make a difference in their communities. Join us in our mission to create a positive impact.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                    <ul>
                       
                        <li className="mb-2"><a href="#about" className="hover:underline">About</a></li>
                        <li className="mb-2"><a href="#projects" className="hover:underline">Projects</a></li>
                        <li className="mb-2"><a href="#contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                    <p className="mb-2 flex items-center"><FaMapMarkerAlt className="mr-2" /> 123 Volunteer St, City, Country</p>
                    <p className="mb-2 flex items-center"><FaPhoneAlt className="mr-2" /> (123) 456-7890</p>
                    <p className="mb-2 flex items-center"><FaEnvelope className="mr-2" /> email@volunteer.org</p>
                    <div className="flex space-x-4 mt-4">
                        <a href="#facebook" className="hover:text-gray-400"><FaFacebookF /></a>
                        <a href="#twitter" className="hover:text-gray-400"><FaTwitter /></a>
                        <a href="#instagram" className="hover:text-gray-400"><FaInstagram /></a>
                        <a href="#linkedin" className="hover:text-gray-400"><FaLinkedin /></a>
                    </div>
                </div>
            </div>
            <div className="text-center mt-8">
                &copy; 2024 Volunteer. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
