import { useMutation, useQueryClient } from "react-query";
import * as Api from "../apis";
import { useAppContext } from "../contexts/AppContext";

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(Api.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Logged out Success!", type: "SUCCESS" });
      // navigate("/login");
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
