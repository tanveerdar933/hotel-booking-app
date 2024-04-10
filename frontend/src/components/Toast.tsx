import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      return () => clearTimeout(timer);
    }, 5000);
  }, []);
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md text-white max-x-md ${
        type === "SUCCESS" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
