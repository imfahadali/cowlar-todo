import XMark from "../assets/xmark-solid.svg";
interface IModalMsgProps {
  message: string;
  setIsOpen: (val: boolean) => void;
}

const ModalMsg = ({ setIsOpen, message }: IModalMsgProps) => {
  return (
    <div
      className="w-screen h-screen bg-black/[0.2]  absolute top-0 left-0 z-40"
      onClick={() => setIsOpen(false)}
    >
      <div className="w-fit h-auto bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 px-5 py-3 flex flex-col relative rounded">
        <img
          src={XMark}
          width={11}
          className="absolute right-5 cursor-pointer"
          onClick={setIsOpen.bind(null, false)}
        />
        <span className="py-8">{message}</span>
      </div>
    </div>
  );
};

export default ModalMsg;
