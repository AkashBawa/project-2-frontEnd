import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios';
import SingleView from "./SingleView";
import { useDispatch } from "react-redux";
import { setLoader } from '../../../redux/user';

const JoinEvent = () => {

  const dispatch = useDispatch();
  const [activeEvens, setActiveEvents] = useState([]);
  const [singleView, setSingleView] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const [monthList, setMonthList] = useState([
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUNE",
    "JULY",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ])
  useEffect(() => {

    dispatch(setLoader({loader: true}));
    fetchEvents();

  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.getRequest("eventList", true);
      dispatch(setLoader({loader: false}))
      if (response && response.success) {
        console.log(response)
        getDateFormat(response.events);
      }
    } catch (err) {
      console.log(err);
      dispatch(setLoader({loader: false}))
    }
  }

  const handleClick = (index) => {
    console.log("index is ", index);
    setSingleView(true);
    setCurrentEvent(activeEvens[index]);
  }

  const getDateFormat = (events) => {

    for(let i = 0; i < events.length; i++) {
      const event = events[i];
      const month =  monthList[new Date(event.date).getMonth()];
      const day = new Date(event.date).getDate();

      events[i].month = month;
      events[i].day = day;
    }
    setActiveEvents(events);
  }

  const changeScreen = (view) => {
    setSingleView(view)
  }

  return (
    <div>
      {
        singleView == false ? (
        <div id='joinevent'>
          <h1>Events</h1>
          <div className='event-list'>
            {
              activeEvens.length != 0 && (
              activeEvens.map((event, index) => {
                return (

                  <div key={"event-" + index } className='event' onClick={() => {handleClick(index)}}>
                    <div className='image'>
                      <img src={event.image} />
                    </div>
                    <div className='middle-date'>
                      <p>
                       <h1>{ event.month}</h1>
                        <h1>{ event.day}</h1>
                      </p>
                    </div>
                    <div className='details'>
                      <h2 className='textCapital'>{event.name}</h2>
                      <p>{event.startTime} - {event.endTime} </p>
                      <p>{event.location}</p>
                    </div>
                  </div>
                )
              })
              )
            }

          </div>
        </div>
      ) : <div> <SingleView currentEvent={currentEvent} changeScreen={changeScreen}/> </div>
      }
    </div>
  )
}

export default JoinEvent
