import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Footer = () => {
  // Animation variants for smooth staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  const socialLinks = [
    { icon: assets.instagram_logo, alt: "Instagram" },
    { icon: assets.facebook_logo, alt: "Facebook" },
    { icon: assets.twitter_logo, alt: "Twitter" },
    { icon: assets.gmail_logo, alt: "Gmail" },
  ];

  const companyLinks = ["Home", "Browse Cars", "List Your Car", "About Us"];
  const supportLinks = [
    "Help Center",
    "Terms of service",
    "Privacy Policy",
    "Insurance",
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="text-gray-500 text-sm pt-8 px-6 md:px-16 lg:px-24 xl:px-32"
    >
      <motion.div
        variants={containerVariants}
        className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor md:gap-6"
      >
        {/* Company Info Section */}
        <motion.div variants={sectionVariants} className="max-w-80">
          <motion.img
            src={assets.logo}
            alt="logo"
            className="mb-4 h-8 md:h-9"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <motion.p variants={linkVariants} className="text-sm leading-relaxed">
            Varun Devlops offers premium car rental services, combining luxury,
            comfort, and reliability for every journey. Drive your dreams with
            us!
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="flex items-center gap-3 mt-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href="#"
                variants={socialIconVariants}
                whileHover={{
                  scale: 1.2,
                  y: -3,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <img src={social.icon} className="w-5 h-5" alt={social.alt} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Company Links Section */}
        <motion.div variants={sectionVariants}>
          <motion.h2
            variants={linkVariants}
            className="text-lg text-gray-800 font-medium"
          >
            COMPANY
          </motion.h2>
          <motion.ul
            variants={containerVariants}
            className="mt-3 flex flex-col gap-2 text-sm"
          >
            {companyLinks.map((link, index) => (
              <motion.li
                key={index}
                variants={linkVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href="#"
                  className="hover:text-gray-800 transition-colors duration-200"
                >
                  {link}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Support Links Section */}
        <motion.div variants={sectionVariants}>
          <motion.h2
            variants={linkVariants}
            className="text-base text-gray-800 font-medium"
          >
            SUPPORT
          </motion.h2>
          <motion.ul
            variants={containerVariants}
            className="mt-3 flex flex-col gap-2 text-sm"
          >
            {supportLinks.map((link, index) => (
              <motion.li
                key={index}
                variants={linkVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href="#"
                  className="hover:text-gray-800 transition-colors duration-200"
                >
                  {link}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Contact Section */}
        <motion.div variants={sectionVariants}>
          <motion.h2
            variants={linkVariants}
            className="text-base text-gray-800 font-medium"
          >
            CONTACT
          </motion.h2>
          <motion.ul
            variants={containerVariants}
            className="mt-3 flex flex-col gap-2 text-sm"
          >
            {[
              "Varun Devlops HQ",
              "Hyderabad, Telangana, India",
              "+91 98765 43210",
              "support@varundevlops.com",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={linkVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* Bottom Section */}
      <motion.hr
        className="border-gray-300 mt-8"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      />

      <motion.div
        variants={containerVariants}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5"
      >
        <motion.p variants={linkVariants} className="text-sm">
          © {new Date().getFullYear()} Varun Devlops. All rights reserved.
        </motion.p>

        <motion.ul
          variants={containerVariants}
          className="flex items-center gap-4"
        >
          {["Privacy", "Terms", "Cookies"].map((item, index) => (
            <motion.li
              key={index}
              variants={linkVariants}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <a
                href="#"
                className="hover:text-gray-800 transition-colors duration-200"
              >
                {item}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
