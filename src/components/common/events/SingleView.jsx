import { useState } from "react";
import axios from "../../../services/axios";
import { Modal } from "antd";


const SingleView = ({ currentEvent, changeScreen }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const joinEvent = async () => {
    console.log(currentEvent._id)
    const response = await axios.postRequest("joinEvent", { eventId: currentEvent._id }, true);
    console.log("response ", response)
    if (response && response.success) {
      setIsModalOpen(true)
    }
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (

    <div className="singleEvent" id="singleEvent">
      <Modal className="textAlignCenter" open={isModalOpen} footer={[]}>
        <h2 className="textAlignCenter textCapital">{currentEvent.name}</h2>
        <p>Your event has been received, we will get back to you as soon as possible</p>
        <button type="primary" className="darkBtn" onClick={handleOk}>Close</button>
      </Modal>
      <div>
        <img src={currentEvent.image} />
      </div>

      <h1>{currentEvent.name}</h1>

      <div className="Details">
        <p>{currentEvent.specialNote}</p>

        <p>{currentEvent.startTime} - {currentEvent.endTime} </p>
        <p>{currentEvent.location}</p>
      </div>

      <div className="buttons">
        <button className="lightBtn" onClick={() => { changeScreen(false) }}> Cancel </button>
        <button className="darkBtn" onClick={() => { joinEvent() }}> Join </button>
      </div>
    </div>
  )
}

export default SingleView
