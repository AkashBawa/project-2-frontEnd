import loadingGif from "./../../public/images/loading_black bg_opacity.gif";
const Loader = () => {
    return (
        <div className="loader overlay">
            <div className="modalContent">
                <img src={loadingGif} alt="myloader" />
            </div>
        </div>
    )
}

export default Loader
