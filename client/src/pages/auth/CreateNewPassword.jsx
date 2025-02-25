import "../../styles/LoginPage.css";

import blackLogo from "../../assets/logo-black.png";
import cornerImage from "../../assets/corner-png.png";
import cornerImage2 from "../../assets/corner-png2.png";
import activeUsers from "../../assets/activeUsers.png";
import arrowleft from "../../assets/arrow-left.svg";

const CreateNewPassword = () => {

    return (

        <div className="login-container">

            <div className="back-btn">
                <a href="/" className="back-link">
                    <img className="arrow-left" src={arrowleft} alt="arrow" />Back
                </a>
            </div>

            <div className="left-container">
                <div className="form-container">
                    <img src={blackLogo} className="blackLogo" alt="corner" draggable="false" />
                    <h2>Lorem Ipsum Dolor Sit Amet</h2>
                    <p className="forgot-p-txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                        lobortis commodo ipsum sit amet pharetra. Quisque nisi diam,</p>

                    <div className="input-group">
                        <label htmlFor="newPassword">Create a new password</label>
                        <input type="password" id="newPassword" name="newPassword" placeholder="Enter your new password" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="newPassword2">Re-enter your new password</label>
                        <input type="password" id="newPassword2" name="newPassword2" placeholder="Re-enter your new password" />
                    </div>

                    <button type="submit" className="sign-in-button">Change Password</button>

                    <div className="divider">
                        <hr />
                    </div>

                    <p className="registerHere">
                        Don't have an account?&nbsp;
                        <a href="/register" className="registerLink">Register here</a>
                    </p>
                </div>
            </div>

            {/* --------------------------------------------------- */}
            <div className="right-container">
                <img src={cornerImage} alt='corner' />
                <img src={cornerImage2} alt='corner2' className="corner2" />
                <div className="text-content">
                    <h2>Lorem Ipsum Dolor Sit Amet</h2>
                    <h2>Dolor Tetus Consectetur</h2>
                    <div className="active-users-container">
                        <img src={activeUsers} alt='activeUsers' />
                        <p>Active users</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur <br />
                        adipiscing elit. Cras iaculis consectetur nisi.<br />
                        Aliquam sagittis lobortis auctor. Ut pulvinar</p>
                    <button className="exploreBtn">Explore Now</button>
                </div>
            </div>

        </div>
    );
};

export default CreateNewPassword;