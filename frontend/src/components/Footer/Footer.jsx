import React from "react";

function Footer() {
    return (
        <>

<footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">BookStore</h2>
            <p className="text-sm">Find your favorite books to read or download.</p>
          </div>

          <ul className="flex space-x-4 mb-4 md:mb-0">
            <li>
              <a href="/about" className="hover:text-gray-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-gray-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/help" className="hover:text-gray-400">
                Help
              </a>
            </li>
          </ul>

          <div className="text-sm">
            <p>&copy; 2024 BookStore. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>

        </>
    )
}

export default Footer;