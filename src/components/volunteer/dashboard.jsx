import { Card, Space, Button } from "antd";
import "./dashboard.css"
import { useState } from "react";

import axios from "../../services/axios";
import { useEffect } from "react";

const Dashboard = () => {

  useEffect(() => {
    fetchPost();
  },[]);

  const [posts, setPosts] = useState([
    {
      "date" : "27/12/2023",
      "time": "9AM",
      "serviceTitle": "car wash",
      "location": {
        "coordinates": [
          -122.77862,
          49.16364
        ],
        "type": "Point"
      },
      "serviceType": "outdoor",
      "status": "PENDING",
      "createdAt":  "2023-09-28T01:02:58.498Z"
    }
  ]);

  const fetchPost = async () => {
    try {
      const response = await axios.postRequest("fetchpost", {}, true);
      if(response.success) {
        console.log(response.posts);
        setPosts(response.posts)
      }
      
      // setPosts(response);
    } catch(err) {
      console.log(err)
    }
  }
  return (
    <div className="list-posts">
      <Space direction="vertical">

       {
        posts.map((post, index) => {
          return (
            <Card
            key={`card-${index}`}
            title= {post.serviceTitle}
            extra={<Button type="default">Send Invitation</Button>}
            style={{
              width: "100%",
            }}
          >
            <p>Description</p>
          </Card>
          )
        })
       }
      </Space>
    </div>
  )
}

export default Dashboard
