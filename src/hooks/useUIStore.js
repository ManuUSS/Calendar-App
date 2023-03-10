import { useDispatch, useSelector } from "react-redux"
import { onClsoeDateModal, onOpenDateModal } from '../store';

export const useUIStore = () => {

    const dispatch = useDispatch();
    const { isDateModalOpen } = useSelector( state => state.ui )

    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }

    const closeDateModal = () => {
        dispatch( onClsoeDateModal() );
    }

    const toggleDateModal = () => {
        isDateModalOpen ? closeDateModal() : openDateModal()
    }

    return {
        isDateModalOpen,

        openDateModal,
        closeDateModal,
        toggleDateModal
    }

}