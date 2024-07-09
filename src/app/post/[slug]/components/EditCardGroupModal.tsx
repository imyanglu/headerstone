import { Modal } from '@/app/components';

type EditCardGroupModal = {
  visible: boolean;
};

const EditCardGroupModal = ({ visible }: EditCardGroupModal) => {
  return (
    <Modal visible={visible}>
      <div className="text-[#fff] py-[20px] px-[8px]">
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
      </div>
    </Modal>
  );
};
export default EditCardGroupModal;
