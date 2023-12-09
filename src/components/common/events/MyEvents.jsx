import { useEffect, useState } from "react"
import axios from "../../../services/axios";
import localStorage from "../../../services/localStorage";
import { useDispatch } from "react-redux";
import { setLoader } from '../../../redux/user';
import arrowIcon from "./../../../images/icon_arrow.png";
import moment from 'moment';

const MyEvents = () => {
  const dispatch = useDispatch();
  const [myEvents, setEvents] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"))

  useEffect(() => {
    dispatch(setLoader({ loader: true }))
    fetchMyEvents();
  }, [])

  const fetchMyEvents = async () => {
    try {
      const response = await axios.getRequest("fetchMyEvents", true);
      dispatch(setLoader({ loader: false }))

      if (response && response.success && response.events) {

        for (let i = 0; i < response.events.length; i++) {
          let current = response.events[i];
          const data = createFormatedDate(current);

          response.events[i].formattedDate = data.formattedDate;
          response.events[i].formattedDateRange = data.formattedDateRange;

        }

        setEvents(response.events);
      }
    } catch (err) {
      dispatch(setLoader({ loader: false }))

    }
  }

  const createFormatedDate = (myEvent) => {

    const formattedDate = moment(myEvent.date).format('DD-MMM');
    const startDate = moment(myEvent.startDate);
    const endDate = moment(myEvent.endDate);
    // const formattedDateRange = `${startTime.format('ddd')}, ${startDate.format('h:mma')} - ${endDate.format('h:mma')}`;
    const formattedDateRange = `${startDate.format('ddd')}, ${myEvent.startTime} - ${myEvent.endTime}`
    return { formattedDate, formattedDateRange };
  }


  return (
    <div className="joinevent" id="myEvents">

      <div className="listEvents">

        {myEvents.length > 0 ? (
          myEvents.map((event, index) => {
            return (
              <div className="event">
                <div className="img"> <img src={event.image} /> </div>
                <h1>{event.formattedDate}</h1>;
                <div className="event-wrap">
                  <div className="eventDetails">
                    <h2>{event.name}</h2>
                    <p>{event.formattedDateRange}</p>
                    <p>{event.location}</p>
                  </div>
                  <img src={arrowIcon} alt="arrow Icon" />
                </div>
              </div>
            )
          })) : (
          <h1>No Events to Show</h1>
        )
        }

      </div>
    </div>
  )
}

export default MyEvents
