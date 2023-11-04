import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios';
import SingleView from "./SingleView";

const JoinEvent = () => {

  const [activeEvens, setActiveEvents] = useState([]);
  const [singleView, setSingleView] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.getRequest("eventList", true);
      if (response && response.success) {
        console.log(response)
        setActiveEvents(response.events)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = (index) => {
    setSingleView(true);
    setCurrentEvent(activeEvens[index]);
  }

  return (
    <div>
      {
        singleView == false ? (
        <div id='joinevent'>
          <h2>Events</h2>
          <div className='event-list'>
            {
              activeEvens.map((event, index) => {
                return (
                  <div className='event' onClick={handleClick(index)} >
                    <div className='image'>
                      <img src={event.image} />
                    </div>
                    <div>
                      <p><strong>{event.date}</strong></p>
                    </div>
                    <div className='details'>
                      <h2>{event.name}</h2>
                      <p>{event.startTime} - {event.endTime} </p>
                      <p>{event.location}</p>
                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>
      ) : <div> <SingleView currentEvent={currentEvent}/> </div>
      }
    </div>
  )
}

export default JoinEvent
