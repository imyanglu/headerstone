type Modal = {
  visible: boolean;
  children: React.ReactNode;
};
//
const Modal = ({ visible, children }: Modal) => {
  if (visible)
    return (
      <dialog
        open={visible}
        className="fixed w-[100vw] flex justify-center items-center h-[100vh] inset-0 bg-[#00000080] z-[999]">
        <div className="modal bg-[#3D362F] md:h-[fit-content] h-[100vh]  w-[100vw] md:w-[fit-content] ">
          <div className="modalHead w-full" />
          <div className="modalContainer h-full min-h-[100px] ">{children}</div>
          <div className="modalFoot w-full" />
        </div>
      </dialog>
    );
  return <></>;
};
export default Modal;
