import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";

import "./ModalBase.scss";
import { ReactElement } from "react";

interface ModalProps {
   children: ReactElement;
   closeModal: () => void;
}

export default function AddTaskModel(props: ModalProps) {
   const dispatch = useDispatch();

   return (
      <div className="modal">
         {props.children}
         <MdClose className="close-modal" onClick={props.closeModal} />
      </div>
   );
}
