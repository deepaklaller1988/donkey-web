

interface ButtonProps {
  id: string;
  onClick: () => void;
}

const SignInButton: React.FC<ButtonProps> = ({ id, onClick }) => {
  return (
    <button id={id} className="text-white font-semibold p-2 px-6 rounded-full border-2 border-white transition hover:bg-white hover:text-black" onClick={onClick}>
     Sign In
    </button>
  );
};

export default SignInButton;
