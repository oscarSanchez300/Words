import { useDispatch } from 'react-redux';
import { insertWord, deleteWord } from '../store';


export const useWord = () => {

    const dispatch = useDispatch();

    const startInsertWord = async({word ,meaning, onResetForm, inputWord}) => {

        try {

            dispatch( insertWord({
                id: new Date().getTime(),
                word,
                meaning,
            }));

            onResetForm();
            inputWord.current.focus();

        } catch (error) {
            console.log(error);
        }

    }

    const startDeleteWord = async( idWord ) => {
        dispatch( deleteWord( idWord  ) );
    }

    return {
        // Properties

        // Methods
        startInsertWord,
        startDeleteWord,
    }
}