const ViewProfile = ( {user }) => {

    

  return (
    <div id="viewProfile">
        <h1>{user.name}</h1>
        <div className="topBar">
            <div className="left">
                <img src={user.profilePhoto}/>
            </div>
            <div className="about">
                I am a student who want to help our society.
            </div>
        </div>
        <div className="otherDetails">
            <p> <b>Gender</b> : {user.gender} </p>
        </div>
        <div>

        </div>
    </div>
  )
}

export default ViewProfile
