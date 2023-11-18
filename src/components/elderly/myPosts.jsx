import { useEffect, useState } from "react";
import { Card, Space, Button } from "antd";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "../../services/axios";
import "./css/MyPosts.css"
import DeleteImage from './../../images/delete.png';
import Edit from './../../images/edit.png';
import postImage from './../../images/postImage.png';
import moment from "moment";


const MyPosts = ({ posts, fetchMyPosts, changeSingleView , status}) => {

  useEffect(() => {
  }, []);

  // const [isDeleteVisible, setDeleteVisible] = useState(false);

  // const handleDeleteClick = () => {
  //   // Toggle the value of isDeleteVisible
  //   setDeleteVisible(!isDeleteVisible);
  // };


  const findBookedIndex = (post) => {
    const index = post?.invitations.map((invite) => { return invite.status }).indexOf("ACCEPTED");
    return index;
  }



  const responseInvitation = async (postIndex, acceptedUserId, status) => {
    try {
      const postId = posts[postIndex]._id;
      const response = await axios.putRequest("responseInvitation", { postId, acceptedUserId, status }, true);
      console.log(response);
      fetchMyPosts();

    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div >
      {
        posts.map((post, postIndex) => {
          console.log(posts);
          return (

            <Card
              key={`card-${postIndex}`}
              id="myPostsCard"
            >
              <div className="cardBody" onClick={ () => {changeSingleView(post)}}>

                <img className="eventImage" src={postImage} alt="Post Image" />

                <div className="eventDetails">
                  <h2>{post.serviceTitle}</h2>
                  <h3>location</h3>

                  <div className="myPostDT">
                    {moment(post.date).format("D MMMM")} {moment(post.time, "HH:mm").format("h:mm A")} - {moment(post.endTime, "HH:mm").format("h:mm A")}
                  </div>
                </div>
                {
                  post.status == "PENDING" && <>
                    <div className="deleteEditSection">
                      <div className="myPostDelete">
                        <img src={DeleteImage} alt="DeleteImage" />
                      </div>

                      {/* ${isDeleteVisible ? 'Visually-hidden' : ''} */}{/* 
                      <div id= "myPostDelete" className={`myPostDelete`}>
                        <img src={DeleteImage} alt="DeleteImage" />
                        // <img src={DeleteImage} alt="DeleteImage" onClick={handleDeleteClick} />
                      </div> */}

                      <div className="myPostEdit">
                        <img src={Edit} alt="Edit" />
                      </div>
                    </div>
                  </>
                }
                {
                  post.status == "BOOKED" && <>
                   <div className="deleteEditSection">

              

                      <div className="Review">
                        <Link to={`/elder/reviewelder/${post._id}`}><button className="darkBtn">Review</button></Link>
                      </div>
                    </div>
                  </>
                }

                


              </div>
            </Card>
          )
        })
      }
    </div>
  )
}

export default MyPosts;

