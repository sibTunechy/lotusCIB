import React from "react";

const EyeRedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="30" height="30" rx="8" fill="#FFEDEC" />
      <path
        d="M16.2407 9.57324H13.7607C10.7673 9.57324 8.33398 12.0066 8.33398 14.9999C8.33398 17.9932 10.7673 20.4266 13.7607 20.4266H16.2407C19.234 20.4266 21.6673 17.9932 21.6673 14.9999C21.6673 12.0066 19.234 9.57324 16.2407 9.57324ZM16.2407 17.9466C14.614 17.9466 13.294 16.6266 13.294 14.9999C13.294 13.3732 14.614 12.0532 16.2407 12.0532C17.8673 12.0532 19.1873 13.3732 19.1873 14.9999C19.1873 16.6266 17.8673 17.9466 16.2407 17.9466Z"
        fill="#C02337"
      />
    </svg>
  );
};

export default EyeRedIcon;
