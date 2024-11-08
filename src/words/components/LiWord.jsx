import { DeleteWord } from "./DeleteWord";


export const LiWord = ( {item} ) => {

    const { id, word, meaning } = item; 
    
    return(
        <li className="p-2">
            <b>{word}</b> -- <span className="text-primary">{meaning}</span> <DeleteWord key={id} id={id}  />
        </li>
    )
}