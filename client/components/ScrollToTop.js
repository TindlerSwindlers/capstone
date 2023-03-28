import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { Button } from "../../public/Styles";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) {
      setVisible(true);
    } else if (scrolled <= 200) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button
      style={{
        display: visible ? "inline" : "none",
      }}
    >
      <FaArrowCircleUp onClick={scrollToTop} />
      Scroll to top
    </Button>
  );
};

export default ScrollButton;
