import React from "react";

const EyeGreenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="30" height="30" rx="8" fill="#E8FFFF" />
      <path
        d="M16.2407 9.57324H13.7607C10.7673 9.57324 8.33398 12.0066 8.33398 14.9999C8.33398 17.9932 10.7673 20.4266 13.7607 20.4266H16.2407C19.234 20.4266 21.6673 17.9932 21.6673 14.9999C21.6673 12.0066 19.234 9.57324 16.2407 9.57324ZM13.7607 17.9466C12.134 17.9466 10.814 16.6266 10.814 14.9999C10.814 13.3732 12.134 12.0532 13.7607 12.0532C15.3873 12.0532 16.7073 13.3732 16.7073 14.9999C16.7073 16.6266 15.3873 17.9466 13.7607 17.9466Z"
        fill="#0BA259"
      />
    </svg>
  );
};

export default EyeGreenIcon;
