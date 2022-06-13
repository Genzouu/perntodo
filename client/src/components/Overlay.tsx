import { useSelector } from "react-redux";

import "./Overlay.scss";
import ModalBase from "./ModalBase";
import { StateType } from "../redux/reducers";
import AddTodoEntryModal from "./AddTodoEntryModal";
import AddTodoListModal from "./AddTodoListModal";
import { useDispatch } from "react-redux";
import { toggleAddTodoEntryModal, toggleAddTodoListModal } from "../redux/slices/modalStateSlice";

export default function Overlay() {
   const modalStates = useSelector((state: StateType) => state.modalState);
   const dispatch = useDispatch();

   return (
      <>
         {modalStates.addTodoEntryModalState || modalStates.addTodoListModalState ? (
            <div className="overlay">
               <ModalBase
                  children={modalStates.addTodoEntryModalState ? <AddTodoEntryModal /> : <AddTodoListModal />}
                  closeModal={
                     modalStates.addTodoEntryModalState
                        ? () => dispatch(toggleAddTodoEntryModal())
                        : () => dispatch(toggleAddTodoListModal())
                  }
               />
            </div>
         ) : null}
      </>
   );
}
