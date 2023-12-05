import { Card, Space, Button } from "antd";
import { Outlet, Link } from "react-router-dom"
import { Radio, Tabs } from 'antd';
import { useState } from "react";
import MypostVolunteer from './MyPosts';
import SinglePostView from "./../elderly/SinglePostView";
import axios from "../../services/axios";
import { useEffect } from "react";
import localStorage from "../../services/localStorage";
import Silver from '../../images/silver.jpeg';
import Bronze from '../../images/gold.jpeg';
import Gold from '../../images/WhatsApp Image 2023-12-03 at 10.21.19 PM.jpeg';
import rewardIcon from './../../images/rewardIcon.png';
import apply from './../../images/apply.png';
import notIcon from "./../../images/icon_notification.png";


import { useDispatch } from "react-redux";
import { setLoader } from '../../redux/user';
import Swal from "sweetalert2";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [pendingPosts, setPendingRequest] = useState([]);
  const [approvedPosts, setApprovedRequest] = useState([]);
  const [completedPosts, setCompletedPosts] = useState([]);

  const [pendingCounter, setPendingCounter] = useState(0);
  const [approvedCounter, setApprovedCounter] = useState(0);
  const [completedCounter, setCompletedCounter] = useState(0);

  const [currentPost, setCurrentPost] = useState({});
  const [volProfile, setVolProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState();
  const [singleView, setSingleView] = useState(false);

  useEffect(() => {

    dispatch(setLoader({ loader: true }));
    fetchId();

    // fetchMyPosts();

  }, []);

  const [formData, setFormData] = useState({
    profilePhoto: "",
    name: "",
    // lName: "",
    age: "",
    gender: "male",
    contactNumber: "",
    interest: "",
    emergencyContact: ""
  });


  const fetchUserProfile = async () => {
    try {
      const getProfile = await axios.getRequest("user", true);
      setFormData(getProfile);

    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };



  const fetchId = () => {
    const userId = localStorage.getItem('userId');
    setUserId(userId);
    fetchPost();
    fetchVolUserProfile();
  }

  const filterPosts = (allPosts) => {
    const userId = localStorage.getItem('userId');
    let approvedPosts = [];
    let completedRequest = [];
    allPosts.forEach((post, index) => {
      if (post.acceptedVolunteerId == userId && post.status == "COMPLETED") {
        completedRequest.push(post);
      } else if (post.acceptedVolunteerId == userId && post.status == "BOOKED") {
        approvedPosts.push(post);
      }
    });

    setApprovedRequest(approvedPosts);
    setCompletedPosts(completedRequest);
    setApprovedCounter(approvedPosts.length);
    setCompletedCounter(completedRequest.length);
  }


  const fetchPost = async () => {
    try {
      const response = await axios.postRequest("fetchpost", {}, true);
      const volActivePost = await axios.getRequest("volunteerPosts", true);

      dispatch(setLoader({ loader: false }));
      if (response && response.success) {
        setPosts(response.posts);
        setPendingCounter(response.posts.length)
      }
      if (volActivePost && volActivePost.success) {
        filterPosts(volActivePost.data);
      }

    } catch (err) {
      dispatch(setLoader({ loader: false }));
      console.log(err)
    }
  };



  const sendRequest = async (postId, index) => {
    try {

      Swal.fire({
        title: "Confirmation",
        text: "Do you want to send the invitation"

      }).then(async (data) => {

        if (data.isConfirmed) {
          dispatch(setLoader({ loader: true }));
          const response = await axios.putRequest("sendInvitation", { postId }, true);
          dispatch(setLoader({ loader: false }));

          if (response.success == true) {
            let newPosts = [...posts];
            newPosts[index].invitations = response.updatePost.invitations;
            setPosts(newPosts);
          }
        }
      })

    } catch (err) {
      dispatch(setLoader({ loader: false }));
      console.log(err)
    }
  };

  const fetchVolUserProfile = async () => {
    try {
      let getVolProfile = await axios.getRequest("user", true);
      if (getVolProfile) {
        setVolProfile(getVolProfile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const volunteerName = volProfile ? volProfile.name : "Guest";


  return (
    <div id="volunteerDashboard">
      {
        singleView == false && (
          <div className="dashBoardVolunteer">
            <div className="dashBoardVolunteerHeader">
              <h1>Hi, {volProfile ? volProfile.name : ""}</h1>
              <div id="volHeader">
                <div className="rewardPoints">
                  <img src={rewardIcon} alt="reward" />
                  <h2 className="pointsDash">Your Points: {volProfile?.point ?? 0}</h2>
                </div>
                <img src={notIcon} alt="notification icon" />
                <Link to='/volunteer/profile' id="volProfile">
                  <p>{volProfile && volProfile.name ? volProfile.name.charAt(0) : ""}</p>
                </Link>
              </div>
            </div>
            <div className="dashVolunteerNav">
              <div className="dashVolunteerEvent">
                <h1>All Tasks</h1>
                <div className="allTasksCount">{pendingCounter}</div>
              </div>
              <div className="dashVolunteerUnanswered">
                <h1>Active Tasks</h1>
                <div className="activeTasks">{approvedCounter}</div>
              </div>
              <div className="dashVolunteerPending">
                <h1>Rewards</h1>
                {volProfile && (
                  <>
                    <img
                      src={
                        volProfile.point >= 400
                          ? Silver
                          : volProfile.point >= 200
                            ? Gold
                            : Bronze
                      }
                      alt="Rewards"
                    />
                  </>
                )}
                <h2>
                  Next Medal: {volProfile ? `${volProfile.point ?? 0} / ${volProfile.point <= 200 ? 200 : volProfile.point <= 400 ? 400 : 600}` : ''}
                </h2>


              </div>
            </div>

            <div id="postsSection">
              <div id="postsSectionNav">
                <h1>My Tasks</h1>
              </div>

              <Tabs className="tabs"
                defaultActiveKey="1"
                type="card"
                size={"middle"}
                items={
                  [
                    {

                      label: `All Posts(${pendingCounter})`,
                      key: "1",
                      // children: <MypostVolunteer posts={posts} fetchPost={fetchPost} sendRequest={sendRequest} />,
                      children: (
                        <>
                          <MypostVolunteer posts={posts} fetchPost={fetchPost} sendRequest={sendRequest} />
                          {posts.length === 0 && <div className="noPost">No Posts To Show</div>}
                        </>
                      ),
                    },
                    {
                      label: `Active Posts(${approvedCounter})`,
                      key: "2",
                      // children: <MypostVolunteer posts={approvedPosts} fetchPost={fetchPost} />,
                      children: (
                        <>
                          <MypostVolunteer posts={approvedPosts} fetchPost={fetchPost} />
                          {approvedPosts.length === 0 && <div className="noPost">No Active Posts</div>}
                        </>
                      ),
                    },
                    {
                      label: `History(${completedCounter})`,
                      key: "3",
                      // children: <MypostVolunteer posts={completedPosts} fetchPost={fetchPost} />,
                      children: (
                        <>
                          <MypostVolunteer posts={completedPosts} fetchPost={fetchPost} />
                          {completedPosts.length === 0 && <div className="noPost">No History Posts</div>}
                        </>
                      ),
                    },
                  ]
                }
              />

            </div>
          </div>
        )
      }


      {
        singleView == true && (
          <div>
            <SinglePostView fetchPost={fetchPost} />
            {/* <SinglePostView currentPost={currentPost} fetchMyPosts={fetchMyPosts} /> */}

          </div>
        )
      }
      {/* <div className="list-posts">
        <Space direction="vertical">

          {
            posts.map((post, index) => {
              return (
                <Card
                  key={`card-${index}`}
                >
                  <div className="volPostCard">
                    <div className="servicePostDetails">
                      <div className="seniorProfilePhoto">
                        <Link to='/elder/profile'><img src={post?.userId.profilePhoto} alt="" /></Link>

                      </div>
                      <div >
                        <h1>{post.serviceTitle}</h1>
                        <Link to='/elder/profile'><h2 className="seniorProfileLink">{post?.userId.name}</h2></Link>
                        <h2>{post.address}</h2>
                        <h2>{new Date(post.date).getDate()}/{new Date(post.date).getMonth()}/{new Date(post.date).getFullYear()} at: {post.time}</h2>
                      </div>
                    </div>
                    <div className="responseButton">
                      {post.invitations.map((invite) => invite.user).indexOf(userId) > -1 ? (
                        <button type="default" disabled className="reviewButton">
                          Review</button>
                      ) : (

                        // apply

                        <button id="applyBtn" type="default"
                          onClick={() => {
                            // if (post.status === "PENDING") {
                              sendRequest(post._id, index);
                              // post.status = "BOOKED";
                            // }
                          }}>
                          <img src={apply} alt="" />
                        </button>
                      )}
                    </div>

                  </div>
                </Card>
              )
            })
          }
        </Space>
      </div> */}
    </div>


  )
}

export default Dashboard
