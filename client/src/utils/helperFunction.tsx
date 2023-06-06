import { toast, TypeOptions, Id } from "react-toastify";

export const getBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const updateToatify = ({
  type,
  toastId,
}: {
  type: TypeOptions;
  toastId: Id;
}) => {
  const message =
    type.toLowerCase() === "success"
      ? "Database Updated Successfully"
      : "Failed To Update Database";

  toast.update(toastId, {
    render: message,
    type,
    isLoading: false,
    autoClose: 5000,
    closeOnClick: true,
  });
};
