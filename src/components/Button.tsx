interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'danger';
  onClick?: () => void;
}

export default function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  const base = 'px-base py-sm rounded-sm font-normal transition duration-200 shadow-sm';
  const styles = {
    primary: 'bg-primary text-white hover:bg-blue-800',
    secondary: 'bg-white text-primary hover:bg-secondary',
    danger: 'bg-danger text-white hover:bg-dangerHover',
    icon: 'text-primary hover:bg-blue-800 p-xs flex items-center justify-center',
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}