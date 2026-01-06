import React from "react";

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "white",
    padding: "20px",
    textAlign: "center",
    marginTop: "50px",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  links: {
    marginTop: "10px",
  },
  link: {
    color: "#64B5F6",
    textDecoration: "none",
    margin: "0 15px",
  },
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={{ margin: "0 0 10px 0" }}>
        © 2025 Dev Stack Bank. All rights reserved.
      </p>
      <div style={styles.links}>
        <a href="#" style={styles.link}>
          Privacy Policy
        </a>
        <a href="#" style={styles.link}>
          Terms of Service
        </a>
        <a href="#" style={styles.link}>
          Contact Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;
