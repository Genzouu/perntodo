import { useSelector } from "react-redux";

import "./Overlay.scss";
import ModalBase from "./ModalBase";
import { StateType } from "../redux/reducers";
import AddTodoEntryModal from "./AddTodoEntryModal";

export default function Overlay() {
   const modalStates = useSelector((state: StateType) => state.modalState);

   return (
      <>
         {modalStates.addTodoEntryModalState || modalStates.addTodoListModalState ? (
            <div className="overlay">
               <ModalBase children={modalStates.addTodoEntryModalState ? <AddTodoEntryModal /> : <></>} />
            </div>
         ) : null}
      </>
   );
}
