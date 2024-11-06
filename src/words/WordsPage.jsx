import { Link } from "react-router-dom"
import { useForm } from "../hooks";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertWord, deleteWord } from '../store';


const formValue = {
    id: '',
    word: '',
    meanWord: ''
}


export const WordsPage = () => {

    const { words } = useSelector( state => state.words );
    const dispatch = useDispatch();


    const { word, meanWord, onInputChange, onResetForm } = useForm(formValue);
    
    const inputWord = useRef()
    
    const [stateListWords, seTListWord] = useState([]);


    const onFormCreateWord = (event) => {
            event.preventDefault();
            
            if(word.length == 0){
                document.querySelector('[name=word]').classList.add('is-invalid');
                return;
            }
            document.querySelector('[name=word]').classList.remove('is-invalid');
            
            
            if(meanWord.length === 0){
                document.querySelector('[name=meanWord]').classList.add('is-invalid');
                return;
            }
            document.querySelector('[name=meanWord]').classList.remove('is-invalid');

            // console.log({word, meanWord});

            seTListWord([ ...stateListWords ,{
                id: new Date().getTime(),
                word,
                meaning: meanWord,
            }]);

            dispatch( insertWord({
                id: new Date().getTime(),
                word,
                meaning: meanWord,
            }));

            onResetForm();
            inputWord.current.focus();

    }

    const deleteWordR = (idWord) => {
        const words = stateListWords.filter(element => element.id !== idWord);
        seTListWord(words);
        dispatch( deleteWord( idWord  ) );
    }

    return (
        <div className="container p-3">
            <Link to="/" >Back</Link>
            <h1 className="mt-4 text-center">Words with their meaning</h1>

            <div className="row" style={{marginTop: '100px'}}>
                <div className="col-6">
                    <ul>
                        {
                            words.map( (item) => (
                                <li key={item.id} className="p-2">
                                    <b>{item.word}</b> - <span className="text-primary">{item.meaning}</span> <button style={{marginLeft: '20px'}} className="btn btn-sm btn-outline-danger" onClick={ () => deleteWordR(item.id)}>Delete</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-6 text-center">
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
                                type="text"
                                className="form-control mb-2"
                                placeholder="Its meaning"
                                name="meanWord"
                                value={meanWord}
                                onChange={onInputChange} 
                            />

                            <button type="submit" className="btn btn-outline-primary mt-2">Save</button>
                        </form>
                </div>
            </div>

        </div>
    )

}