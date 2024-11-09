import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons"; 
import "../Styles/ScrollToTop.css"; 

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Détecter le défilement
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Effet de défilement fluide
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={`scroll-to-top ${isVisible ? "visible" : ""}`}>
      {isVisible && (
        <Button
          type="primary"
          shape="circle"
          onClick={scrollToTop}
          className="scroll-top-btn"
        >
          <ArrowUpOutlined 
            style = 
            {{
              fontSize: "20px", 
              fontWeight: 800, 
            }}
          />
        </Button>
      )}
    </div>
  );
}
