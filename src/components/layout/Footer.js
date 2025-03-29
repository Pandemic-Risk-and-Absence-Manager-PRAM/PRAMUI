const Footer = ({ isOpen }) => {
  return (
    <footer
      className="w-full bg-[#1F3557] dark:bg-gray-800 text-gray-300 text-center text-sm py-2 transition-all"
      style={{ paddingLeft: isOpen ? "280px" : "100px" }}
    >
      &copy; 2024 Pandemic Risk Absence Manager. All rights reserved.
    </footer>
  );
};
export default Footer;
