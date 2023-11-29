import { useEffect, useState } from "react";
import { Card, Space, Button, Modal, Rate, Input } from "antd";
import axios from "../../services/axios";
import IconApply from './../../images/icon_accept.png';
import Edit from './../../images/edit.png';
import moment from "moment";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import localStorage from "../../services/localStorage";

const MyPostVolunteer = ({ posts, fetchMyPosts, sendRequest }) => {

  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
  }, []);

  const checkInvitationSent = (post) => {
    if(post.invitations && post.invitations.length > 0) {
      const index = post.invitations.map((invi) => invi.user).indexOf(userId);
      if(index > -1) {
        return true;
      } else {
        return false;
      }
    }
  }


  return (
    <div id="mypostID" className="volunteerMyPost">
      {
        posts.map((post, postIndex) => {
          return (

            <Card
              key={`card-${postIndex}`}
              id="myPostsCard"
            >
              <div className="cardBody" >

                <div className="eventDetails">
                  <h1>{post.serviceTitle}</h1>
                  <h2>{post.address}</h2>

                  <div className="myPostDT">
                    <h2>
                      {moment(post.date).format("D MMMM")} {moment(post.time, "HH:mm").format("h:mm A")} - {moment(post.endTime, "HH:mm").format("h:mm A")}
                    </h2>
                  </div>
                </div>

                {
                  post.status == "PENDING" && <>

                    { 
                      checkInvitationSent(post) ? <div className="appliedDiv">
                        <p>Applied</p>
                      </div> :
                       <div className="deleteEditSection" >
                        <div className="myPostDelete" onClick={() => sendRequest(post._id, postIndex)} >
                          <img src={IconApply} alt="ApplyPost" />
                        </div>
                      </div>
                    }
                  </>
                }
                {/* {
                  post.status == "BOOKED" && <>
                    <div className="deleteEditSection">



                      <div className="Review">
                        <>
                          <Button type="primary" onClick={showModal}>
                            Review
                          </Button>
                          <Modal
                            title="How Somchai did it?"
                            open={open}
                            onOk={ () => {handleOk (postIndex)}}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                          >
                            <Space>
                              <Rate
                                tooltips={desc}
                                onChange={(value) => setRating(Math.ceil(value))}
                                value={rating}
                              />
                            </Space>
                            <TextArea rows={4} placeholder="Review" maxLength={100} />
                          </Modal>
                        </>
                      </div>
                    </div>
                  </>
                } */}

              </div>
            </Card>
          )
        })
      }


      {/* Delete Confirmation Modal */}
      {/* <Modal
        title="Delete Post"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal> */}

    </div>
  )
}

export default MyPostVolunteer;

