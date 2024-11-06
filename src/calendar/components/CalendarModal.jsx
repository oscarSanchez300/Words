import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { es } from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';
import { FabDelete } from './FabDelete';


registerLocale('es', es);

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();

    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [ formSubmitted, setFormSubmitted ] = useState(false);


    const [ formValues, setFormValues ] = useState({
        title: 'Oscar',
        notes: 'Sanchez',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    // mongodb+srv://racso:sysofosr31@calendardb.n8ahlkd.mongodb.net/


    const titleClass = useMemo(() => {
     
        if(!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid';


    }, [formValues.title, formSubmitted]);


    useEffect(() => {

        if(activeEvent !== null){
              setFormValues({...activeEvent});
        }

    }, [activeEvent])


    const onInputChanged = ({target}) => {
        setFormValues(
            {
                ...formValues,
                [target.name] : target.value,
            }
        )
    }


    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event,
        })
    }



    const onCloseModal = () => {
        closeDateModal();
    }


    const onSubmit = async( event ) => {
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds( formValues.end, formValues.start);

        if( isNaN(difference)  || difference <= 0){
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        if(formValues.title.length <= 0) return;

        console.log(formValues);

        await startSavingEvent(formValues );
        closeDateModal();   
        setFormSubmitted(false);     


    }

    return(
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >

            <div className="row">
                <div className="col-6">        
                    <h4> Nuevo evento </h4>
                </div>
                <div className="col-6">        
                    <a
                        className="btn btn-outline-danger btn-block float-end"
                        onClick={onCloseModal}
                    >
                        <i className="fa fa-times"></i>
                    </a>
                </div>
            </div>

            <hr />
            <form className="container" onSubmit={onSubmit}>
                

                <div className="row mb-2">
                    <label className="form-label">Fecha y hora inicio</label>
                    <DatePicker
                     selected={formValues.start}
                     className='form-control'
                     onChange={ (event) => onDateChanged(event, 'start')}
                     dateFormat="Pp"
                     showTimeSelect
                     timeIntervals={30}
                     locale="es"
                     timeCaption='Hora'
                    /> 
                </div>

                <div className="row mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                     minDate={formValues.start}
                     selected={formValues.end}
                     className='form-control'
                     onChange={ (event) => onDateChanged(event, 'end')}
                     dateFormat="Pp"
                     showTimeSelect
                     timeIntervals={30}
                     locale="es"
                     timeCaption='Hora'

                    /> 
                </div>

                <hr />
                <div className="row mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${ titleClass }`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="row mb-3">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChanged}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

                {/* <a
                    className="btn btn-outline-danger btn-block float-end"
                    onClick={onCloseModal}
                >
                    <i className="fa fa-times"></i>
                    <span> Cerrar</span>
                </a> */}

                
            </form>
            <FabDelete />

        </Modal>
    )
}