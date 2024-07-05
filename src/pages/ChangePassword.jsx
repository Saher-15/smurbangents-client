import React, { useState, useEffect } from "react";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";
import axios from "axios"; // Import Axios

const ChangePassword = () => {
    const [userFormData, setUserFormData] = useState({

        oldPassword: "", // Initialize with empty string
        newPassword: "", // Initialize with empty string
    });

    useEffect(() => {
        // Retrieve user data from local storage
        const userData = localStorage.getItem("user_Data");

        if (userData) {
            const parsedUserData = JSON.parse(userData);
            setUserFormData({
                ...parsedUserData,
                oldPassword: "",
                newPassword: "",
            });
        } else {
            toast.error("User data not found in local storage");
        }
    }, []);

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            // Check if new password and confirmation password match
            if (userFormData.newPassword !== userFormData.confirmPassword) {
                toast.error("New password and confirmation password do not match");
                return;
            }
    
            // Create an object with only oldPassword and newPassword
            const requestData = {
                oldPassword: userFormData.oldPassword,
                newPassword: userFormData.newPassword
            };

            // Make an HTTP request to update user password
            await axios.patch(`https://siwarafashion-server-59dda37c29fa.herokuapp.com/user/change_password/${localStorage.getItem("id")}`, requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Handle success
            toast.success("Password changed successfully");
        } catch (error) {
            // Handle error
            toast.error("Failed to change password");
        }
    };
    

    return (
        <>
            <SectionTitle title="Change Password" path="Home | Change Password" />
            <form className="max-w-7xl mx-auto text-center px-10" onSubmit={updateProfile}>
                <div className="grid grid-cols-3 max-lg:grid-cols-1">
                    {/* Add fields for old password, new password, and confirmation password */}
                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">Old Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            value={userFormData.oldPassword}
                            onChange={(e) => setUserFormData({ ...userFormData, oldPassword: e.target.value })}
                        />
                    </div>

                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">New Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            value={userFormData.newPassword}
                            onChange={(e) => setUserFormData({ ...userFormData, newPassword: e.target.value })}
                        />
                    </div>

                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            value={userFormData.confirmPassword}
                            onChange={(e) => setUserFormData({ ...userFormData, confirmPassword: e.target.value })}
                        />
                    </div>
                </div>
                <button
                    className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
                    onClick={updateProfile}
                >
                    Change Password
                </button>

            </form>
        </>
    );
};

export default ChangePassword;
