import Image from "next/image";

interface AuthHeaderProps {
  title: string;
}

const AuthHeader = ({ title }: AuthHeaderProps) => {
  return (
    <>
      <h3 className="text-center font-bold text-user-primary">{title}</h3>
    </>
  );
};

export default AuthHeader;