import { useEffect, useState } from "react";
import { Tabs} from 'antd';
import HistoryListPost from "./HistoryListPost";
import axios from "../../../services/axios";


const History = () => {
    
    const [pendingRequest, setPendingRequest] = useState([]);
    const [approvedRequest, setApprovedRequest] = useState([]);
    const [rejectedRequest, setRejectedRequest] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {

        try {   
            let response = await axios.getRequest('volunteerPosts', true);
            if(response && response.success) {
                console.log(response.data);
                setPendingRequest(response.data)
            }
        } catch (err) {
            console.error("err", err)
        }
    }
    
    return (
        <div>
        <Tabs
          defaultActiveKey="1"
          type="card"
          size={"middle"}
          items={
            [
              {
                label: `Pending`,
                key: "1",
                children: <HistoryListPost posts={pendingRequest}/>,
              },
              {
                label: `Approved`,
                key: "2",
                children: <HistoryListPost/>,
              },
              {
                label: `Rejected`,
                key: "3",
                children: <HistoryListPost/>,
              },
          ]
          }
        />
      </div>
    )
}

export default History
