import { useState } from "react"
import { Form, Input, Button, Steps } from "antd";
import axios from "../../../services/axios";


const CreateEvent = () => {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [currentStep, setCurrentStep] = useState(0)
    const reset = () => {

        setName("");
        setLocation("");
        setDate("");
        setStartTime("");
        setEndTime("");

    }

    const submit = async () => {
        try {
            const obj = {
                name,
                location,
                date,
                startTime,
                endTime
            }
            console.log("obj", obj)
            const response = await axios.postRequest("createEvent", obj, true);

            if (response && response.success) {
                alert("Event added successfully");
                reset();
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="addpost">
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
                    <Form.Item label="Name">
                        <Input placeholder="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </Form.Item>
                }

                {
                    currentStep == 1 &&
                    <>
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
                    </>
                }

                {
                    currentStep == 2 && 
                    <>
                        MEdia libraby
                    </>
                }

                {
                    currentStep == 3 &&
                    <>
                         <Button type="primary" onClick={submit}>Submit</Button>
                    </>
                }
                <Button type="" onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep == 0}>Previous</Button>
                <Button type="primary" onClick={() => {setCurrentStep(currentStep + 1)}} disabled={currentStep == 3} >Next</Button>
               
            </Form>

        </div>
    )
}

export default CreateEvent
