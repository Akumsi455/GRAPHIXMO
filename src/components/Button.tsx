import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "white" | "outline-primary";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-md shadow-primary/25 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/35",
  secondary:
    "border border-border bg-white text-foreground hover:border-primary/30 hover:bg-primary/5",
  ghost: "text-muted hover:text-foreground hover:bg-primary/5",
  white:
    "bg-white text-primary shadow-lg hover:bg-white/90 hover:shadow-xl",
  "outline-primary":
    "border-2 border-primary/20 bg-primary/5 text-primary hover:border-primary hover:bg-primary/10",
};

const baseStyles =
  "btn-interactive group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  fullWidth?: boolean;
};

const sizeStyles = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className = "",
  children,
  type = "button",
  fullWidth = false,
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  const content = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon
          className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:scale-110"
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
      {Icon && iconPosition === "right" && (
        <Icon
          className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:scale-110"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
