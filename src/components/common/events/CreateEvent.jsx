import { useState } from "react"
import { Form, Input, Button, Steps, Modal } from "antd";
import axios from "../../../services/axios";


const CreateEvent = () => {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [specialNote, setSpecialNote] = useState("");
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const reset = () => {

        setName("");
        setLocation("");
        setDate("");
        setStartTime("");
        setEndTime("");
        setSpecialNote("");
        setSelectedImage(null);
        setCurrentStep(0)

    }

    const handleOk = () => {
        setIsModalOpen(false);
        reset();
    };


    const submit = async () => {
        try {
            const obj = {
                name,
                location,
                date,
                startTime,
                endTime,
                specialNote
            }

            const imgToBase64 = await toBase64(selectedImage);
            if (imgToBase64) {
                obj.image = imgToBase64;
            }
            console.log("obj", obj)
            const response = await axios.postRequest("createEvent", obj, true);

            if (response && response.success) {
                // alert("Event added successfully");
                setIsModalOpen(true);
               
            }

        } catch (err) {
            console.log(err)
        }
    };

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    return (
        <div className="addEvents" id="addEvent">
            <Modal title="" open={isModalOpen} footer={[]}>
                <h2>Event Sent</h2>
                <p>Your event has been received, we will get back to you as soon as possible</p>
                <Button type="primary" onClick={handleOk}>Submit</Button>
            </Modal>
            <Steps
                current={currentStep}
                items={[
                    {
                        title: 'Name',
                        description: "",
                    },
                    {
                        title: 'Enter Details',
                        description: "",
                    },
                    {
                        title: 'Event Media',
                        description: "",
                    },
                    {
                        title: 'Summery',
                        description: "",
                    },
                ]}
            />
            <Form
                name="trigger"
                style={{
                    maxWidth: 400,
                }}
                layout="vertical"
                autoComplete="off"
            >

                {

                    currentStep === 0 &&
                    <div>
                        <h2>Event Name</h2>

                        <Form.Item label="What name would you give your event?">
                            <Input placeholder="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                        </Form.Item>
                    </div>
                }

                {
                    currentStep == 1 &&
                    < div className="detail-section">
                        <h2>Details</h2>
                        <div className="left-side">
                            <Form.Item label="Location" >
                                <Input placeholder="Location" value={location} onChange={(e) => { setLocation(e.target.value) }} />
                            </Form.Item>
                            <Form.Item label="Date">
                                <input type="date" value={date} onChange={(e) => { setDate(e.target.value) }} />
                            </Form.Item>
                            <Form.Item label="Select Start time">
                                <input type="time" value={startTime} onChange={(e) => { setStartTime(e.target.value) }} required />
                            </Form.Item>

                            <Form.Item label="Select End time">
                                <input type="time" value={endTime} onChange={(e) => { setEndTime(e.target.value) }} required />
                            </Form.Item>
                        </div>

                        <div className="right-side">
                            <label htmlFor="special-note" >Special Note</label>
                            <textarea id="special-note" onChange={(e) => { setSpecialNote(e.target.value) }}></textarea>
                        </div>
                    </div>
                }

                {
                    currentStep == 2 &&
                    <>
                        <h2>Event Media</h2>
                        {
                            selectedImage == null && (
                                <div className="take-image">
                                    <input type="file" name="eventImage" onChange={(e) => {
                                        setSelectedImage(e.target.files[0])
                                    }} />
                                </div>
                            )
                        }
                        {
                            selectedImage && (
                                <div>
                                    <img
                                        alt="Event Image"
                                        width={"250px"}
                                        src={URL.createObjectURL(selectedImage)}
                                    />
                                    <br />
                                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                                </div>
                            )
                        }
                    </>
                }

                {
                    currentStep == 3 &&
                    <div className="summery">
                        <h2>Summery</h2>
                        <div className="image-section">
                            <img
                                alt="Event Image"
                                width={"250px"}
                                src={URL.createObjectURL(selectedImage)}
                            />
                        </div>
                        <div className="final-step">
                            <p>{name}</p>
                            <p>{specialNote}</p>
                            <p>{date}</p>
                            <p>Start at {startTime} to {endTime}</p>
                        </div>

                    </div>
                }

                <div className="button-bottom">
                    <button type="" className="lightBtn" onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep == 0}>Previous</button>
                    {
                        currentStep < 3 && <button className="darkBtn"  onClick={() => { setCurrentStep(currentStep + 1) }} disabled={currentStep == 3} >Next</button>
                    }
                    {
                        currentStep == 3 && <button className="darkBtn" onClick={submit}>Submit</button>
                    }
                </div>



            </Form>

        </div>
    )
}

export default CreateEvent
