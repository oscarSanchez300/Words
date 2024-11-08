import { useWord } from "../../hooks";


export const DeleteWord = ({id}) => {

    const { startDeleteWord  } = useWord();
    const deleteWordR = (idWord) => startDeleteWord( idWord );

    return(
        <button 
            style={{marginLeft: '20px'}} 
            className="btn btn-sm btn-outline-danger" 
            onClick={ () => deleteWordR(id)}>
            Delete
        </button>
)
}