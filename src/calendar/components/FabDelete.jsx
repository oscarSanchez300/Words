import { useCalendarStore, useUiStore } from "../../hooks"


export const FabDelete = () => {

    const { startDeletingEvent, hasIdActiveEvent } = useCalendarStore();
    const { closeDateModal } = useUiStore();

    const handleDelete = () =>{
        closeDateModal();
        startDeletingEvent();
    }       



return (
    // <button
    //     className="btn btn-danger fab-danger"
    //     onClick={handleDelete}
    //     style={{display : hasIdActiveEvent ? '' : 'none'}}
    // >
    //     <i className="fas fa-trash-alt"></i>
    // </button>
    <button
        className="btn btn-outline-danger btn-block float-end"
        onClick={handleDelete}
        style={{display : hasIdActiveEvent ? '' : 'none', marginTop: '-39px'}}
    >  
        Eliminar &nbsp;
        <i className="fas fa-trash-alt"></i>
    </button>
)

}