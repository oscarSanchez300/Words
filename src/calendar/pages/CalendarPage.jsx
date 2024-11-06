import { useCallback, useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../';

import { getMessagesEs, localizer } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';


import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const DnDCalendar = withDragAndDrop(Calendar);


export const CalendarPage = () => {
    
    const { user } = useAuthStore();
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, startLoadingEvents, startSavingEvent } = useCalendarStore();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        // console.log(event);
        const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid ); 

       const style = {
        backgroundColor: isMyEvent ? '#347CF7' : '#465660',
        borderRadius: '10px',
        opacity: 0.8,
        color: 'white',
       }

       return {
        style
       }

    }

    const onDoubleClick = ( event ) => {
        openDateModal();
    }
    
    
    const onSelect = ( event ) => {
        console.log({click: event});
        setActiveEvent( event );
    }
    
    const onViewChanged = ( event ) => {
        localStorage.setItem('lastView', event);
        setLastView(event);
        // console.log(event);
    }

    const moveEndEvent = (data) => {
        console.log(data);
        startSavingEvent({...data.event, start: data.start, end: data.start} );
    }
    
    const startMoveEvent = (data) => {
        console.log('startMoveEvent');
        console.log(data);
        setActiveEvent( data.event );
    }


    useEffect( () => {
        startLoadingEvents();
    },[])


    return ( 
        <>
            <Navbar />

            <DnDCalendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={getMessagesEs() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
                draggableAccessor={(event) => true}
                onDragStart={startMoveEvent}
                onEventDrop={moveEndEvent}
                // onEventResize={resizeEvent}
                // resizable={true}
                popup
            />

            <CalendarModal />

            <FabAddNew />

            {/* {
                lastView === 'agenda' && <FabDelete />
            } */}

        </>
    )
}