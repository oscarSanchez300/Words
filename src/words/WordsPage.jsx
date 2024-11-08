import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { LiWord } from "./components/LiWord";
import { FormWord } from "./components/FormWord";

import './WordsPage.css';

export const WordsPage = () => {

    const { words } = useSelector( state => state.words );
   
    return (
        <div className="container p-3">

            <Link className="btn btn-sm btn-outline-info" to="/" >Back</Link>
            <h1 className="mt-4 text-center">Words with their meaning</h1>

            <div className="row marginTopForm">
                <div className="col-6">
                    <ul>
                        {
                            words.map( (item) => (
                                <LiWord key={item.id} item={item} />
                            ))
                        }
                    </ul>
                </div>
                <div className="col-6 text-center">
                    <FormWord />
                </div>
            </div>

        </div>
    )

}