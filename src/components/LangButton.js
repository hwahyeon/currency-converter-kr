import React, { useState, useEffect } from "react";
import "../styles/_LangButton.scss";

function LanguageSelector() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const currentLanguage = localStorage.getItem("language") || "en";
    setLanguage(currentLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ko" : "en";
    localStorage.setItem("language", newLanguage);
    window.location.reload();
  };

  return (
    <div className="lang">
      <button className="lang__button" onClick={toggleLanguage}>
        {language === "en" ? "한국어" : "English"}
      </button>
    </div>
  );
}

export default LanguageSelector;
