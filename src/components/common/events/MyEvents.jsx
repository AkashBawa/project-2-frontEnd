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

        setEvents(response.events);
      }
    } catch (err) {
      dispatch(setLoader({ loader: false }))

    }
  }

  const formattedDate = moment(myEvents.date).format('DD-MMM');
  const startDate = moment(myEvents.startDate);
  const endDate = moment(myEvents.endDate);
  const formattedDateRange = `${startDate.format('ddd')}, ${startDate.format('h:mma')} - ${endDate.format('h:mma')}`;

  return (
    <div className="joinevent" id="myEvents">

      <div className="listEvents">

        {
          myEvents.map((event, index) => {
            return (
              <div className="event">
                <div className="img"> <img src={event.image} /> </div>
                <h1>{formattedDate}</h1>;
                <div className="eventDetails">
                  <h2>{event.name}</h2>
                  <p>{formattedDateRange}</p>
                  <p>{event.location}</p>
                </div>
                <img src={arrowIcon} alt="arrow Icon" />
              </div>
            )
          })
        }

      </div>
    </div>
  )
}

export default MyEvents
