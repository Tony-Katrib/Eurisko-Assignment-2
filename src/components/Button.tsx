interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'danger' | 'secondary' | 'icon';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({ children, variant = 'primary', onClick, type = 'button', disabled = false, }: ButtonProps) {
  const base = 'px-base py-sm rounded-sm font-normal transition duration-200 shadow-sm';
  const styles = {
    primary: 'bg-primary text-white flex items-center justify-center hover:bg-blue-800 dark:bg-dark_primary dark:text-white dark:hover:bg-dark_primaryHover',
    secondary: 'bg-white text-primary hover:bg-secondary dark:bg-dark dark:text-white dark:hover:bg-gray-800',
    danger: 'bg-danger text-white hover:bg-dangerHover dark:bg-dark_danger dark:text-white dark:hover:bg-dark_dangerHover',
    icon: 'text-primary hover:bg-blue-800 p-xs flex items-center justify-center dark:hover:bg-dark_primaryHover',
  };

  const disabledStyle = 'opacity-50 cursor-not-allowed';

  return (
    <button onClick={onClick} type={type} disabled={disabled} className={`${base} ${styles[variant]} ${disabled ? disabledStyle : ''}`}>
      {children}
    </button>
  );
}