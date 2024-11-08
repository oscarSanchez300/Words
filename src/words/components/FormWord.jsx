import { useRef } from "react";
import { useForm, useWord } from "../../hooks";


const formValue = {
    id: '',
    word: '',
    meanWord: ''
}

export const FormWord = () => {

    const inputWord = useRef();
    const inputMeaning = useRef();

    const { startInsertWord } = useWord();
    const { word, meanWord, onInputChange, onResetForm } = useForm(formValue);

    const onFormCreateWord = (event) => {
        event.preventDefault();
        
        if(word.length == 0){
            inputWord.current.classList.add('is-invalid');
            inputWord.current.focus();
            return;
        }
        inputWord.current.classList.remove('is-invalid');
        
        if(meanWord.length === 0){
            inputMeaning.current.classList.add('is-invalid');
            inputMeaning.current.focus();
            return;
        }
        inputMeaning.current.classList.remove('is-invalid');

        startInsertWord({
            word,
            meaning: meanWord,
            onResetForm,
            inputWord,
        });
           
    }

    return(
        <form onSubmit={e => onFormCreateWord(e)}>

            <input 
                ref={inputWord}
                type="text"
                className="form-control mb-2"
                placeholder="Word in english"
                name="word"
                value={word}
                onChange={onInputChange} 
            />

            <input 
                ref={inputMeaning}
                type="text"
                className="form-control mb-2"
                placeholder="Its meaning"
                name="meanWord"
                value={meanWord}
                onChange={onInputChange} 
            />

            <button type="submit" className="btn btn-outline-primary mt-2">Save</button>
        </form>
    )

}