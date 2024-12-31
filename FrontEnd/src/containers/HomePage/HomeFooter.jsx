import React from "react";
import { FormattedMessage } from "react-intl";

const HomeFooter = () => {
  return (
    <div className="home-footer section-share">
      <p>
        &copy; 2024 Kaiser. More information, please visit my GitHub.
        <a href="https://github.com/kaiser527" target="_blank">
          {"\t"}
          &#8594; Click here &#8592;
        </a>
      </p>
    </div>
  );
};

export default HomeFooter;
