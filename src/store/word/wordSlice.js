import { createSlice } from '@reduxjs/toolkit';

export const wordSlice = createSlice({

    name: 'word',
    initialState:{
        status: 'checking',
        words: [{
            id: new Date().getTime(),
            word: 'Hello',
            meaning: 'Hola',
        }],
    },
    reducers: {
        insertWord: (state, { payload }) => {
            state.words.push(payload);
        },
        deleteWord: (state, { payload }) => {
            state.words = state.words.filter( word => word.id !== payload );
        },
    }    
});


export const { insertWord, deleteWord } = wordSlice.actions;