
import React from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';

const Button = ({ children, onClick, type }: any) => {
  return (
    <div className="w-full mt-6">
      <button id="form-button" onClick={onClick} type={type} className="w-full text-center pbgColor px-6 py-2 rounded-full transition">{children} </button>
    </div>

  );
};

export default Button;
