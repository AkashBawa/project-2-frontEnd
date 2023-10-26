import { useEffect, useState } from "react";
import { Tabs } from 'antd';
import HistoryListPost from "./HistoryListPost";
import axios from "../../../services/axios";
import localStorage from "../../../services/localStorage";

const History = () => {

  const [pendingRequest, setPendingRequest] = useState([]);
  const [approvedRequest, setApprovedRequest] = useState([]);
  const [rejectedRequest, setRejectedRequest] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPosts = (allPosts) => {
    let pendingPosts = [];
    let approvedPosts = [];
    let rejectedPosts = [];

    allPosts.forEach((post, index) => {
      if (post.acceptedVolunteerId == userId) {
        approvedPosts.push(post);
      } else {
        const index = getMyIndex(post.invitations);
        if (index != -1) {
          post.invitations[index].status === "PENDING" ? pendingPosts.push(post) : rejectedPosts.push(post);
        }
      }
    });

    setPendingRequest(pendingPosts);
    setApprovedRequest(approvedPosts);
    setRejectedRequest(rejectedPosts);
  }

  const getMyIndex = (invitations) => {
    for (let i = 0; i < invitations.length; i++) {
      if (invitations[i].user === userId) {
        return i;
      }
    }

    return -1;
  }

  const fetchPosts = async () => {

    try {
      let response = await axios.getRequest('volunteerPosts', true);
      if (response && response.success) {
        filterPosts(response.data)
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
              children: <HistoryListPost posts={pendingRequest} />,
            },
            {
              label: `Approved`,
              key: "2",
              children: <HistoryListPost posts={approvedRequest} />,
            },
            {
              label: `Rejected`,
              key: "3",
              children: <HistoryListPost posts={rejectedRequest} />,
            },
          ]
        }
      />
    </div>
  )
}

export default History
