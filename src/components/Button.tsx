type ButtonProps = {
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const Button = ({ type = 'button', onClick, children, className }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-4 bg-violet-700 text-white rounded hover:bg-violet-800 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
