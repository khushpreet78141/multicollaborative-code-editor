import { toast } from "react-toastify";
import CustomToast from "../components/CustomToast";

const baseConfig = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: true,
  closeButton: false,
  className: "!bg-transparent !shadow-none !p-0",
};

export const showSuccess = (msg) => {
  toast(
    <CustomToast
      title="Success"
      message={msg}
      type="success"
    />,
    baseConfig
  );
};

export const showError = (msg) => {
  toast(
    <CustomToast
      title="Error"
      message={msg}
      type="error"
    />,
    baseConfig
  );
};

export const showInfo = (msg) => {
  toast(
    <CustomToast
      title="Info"
      message={msg}
      type="info"
    />,
    baseConfig
  );
};