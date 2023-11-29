import { useEffect, useState } from "react"
import axios from "../../../services/axios";
import localStorage from "../../../services/localStorage";
import { useDispatch } from "react-redux";
import { setLoader } from '../../../redux/user';

const MyEvents = () => {

  const dispatch = useDispatch();

  const [myEvents, setEvents] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"))

  useEffect(() => {
    dispatch(setLoader({loader: true}))
    fetchMyEvents();
  }, [])

  const fetchMyEvents = async () => {
    try {
      const response = await axios.getRequest("fetchMyEvents", true);
      dispatch(setLoader({loader: false}))
     
      if (response && response.success && response.events) {
       
        setEvents(response.events);
      }
    } catch (err) {
      dispatch(setLoader({loader: false}))
     
    }
  }

  return (
    <div className="joinevent" id="myEvents">

      <h1>Your Events</h1>
      <div className="listEvents">

        {
          myEvents.map((event, index) => {
            return (
              <div className="event">
                <div className="img"> <img src={event.image}/> </div>
                <h2>{ event.name }</h2>
                <div className="lastLabel"> { event.userId == userId ? "Created" : "Joined"} </div>
              </div>
            )
          })
        }

      </div>
    </div>
  )
}

export default MyEvents
