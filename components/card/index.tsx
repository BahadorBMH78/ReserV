import { ReactNode } from "react";

const Card = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="login-box">
      {children}
    </div>
  );
};

export default Card;
