import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBannerUpdate } from "../utils/BannerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB in bytes
const MAX_DESCRIPTION_LENGTH = 12; // 12 characters
const MIN_DESCRIPTION_LENGTH = 4; // 4 characters

const Dashboard = ({ isOpen }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [timer, setTimer] = useState(60);
  const [inputTimer, setInputTimer] = useState(60);
  const { triggerUpdate } = useBannerUpdate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const storedVisibility = localStorage.getItem("bannerIsVisible");
    setIsVisible(
      storedVisibility === null ? true : JSON.parse(storedVisibility)
    );
    const storedTimer = localStorage.getItem("bannerTimer");
    const parsedTimer = storedTimer === null ? 60 : parseInt(storedTimer, 10);
    setTimer(parsedTimer);
    setInputTimer(parsedTimer);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      toast.error("Image size should not exceed 4MB");
      e.target.value = null; // Reset the input
    } else {
      setImage(file);
    }
  };

  const handleVisibilityToggle = async () => {
    const newVisibility = !isVisible;
    try {
      setIsVisible(newVisibility);
      localStorage.setItem("bannerIsVisible", JSON.stringify(newVisibility));
      triggerUpdate();
      toast.success(
        `Banner visibility ${newVisibility ? "enabled" : "disabled"}`
      );
    } catch (error) {
      toast.error("Failed to update banner visibility. Please try again.");
      // Revert the visibility state
      setIsVisible(!newVisibility);
      localStorage.setItem("bannerIsVisible", JSON.stringify(!newVisibility));
    }
  };

  const handleInputTimerChange = (e) => {
    setInputTimer(parseInt(e.target.value, 10));
  };

  const handleTimerUpdate = () => {
    if (inputTimer >= 5 && inputTimer <= 300) {
      setTimer(inputTimer);
      localStorage.setItem("bannerTimer", inputTimer.toString());
      triggerUpdate();
      toast.success(`Banner timer updated to ${inputTimer} seconds`);
    } else {
      toast.error("Timer must be between 5 and 300 seconds");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that description and image are provided
    if (!description || !image) {
      toast.error("Please provide both a description and an image.");
      return;
    }

    // Check for description length
    if (description.length < MIN_DESCRIPTION_LENGTH) {
      toast.error(
        `Description should be atleast ${MIN_DESCRIPTION_LENGTH} characters`
      );
      return;
    }

    // Check for description length
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      toast.error(
        `Description should not exceed ${MAX_DESCRIPTION_LENGTH} characters`
      );
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await fetch(`${API_URL}/api/banner`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        toast.success("Banner Settings updated successfully!");
        setDescription("");
        setImage(null);
        // Reset the file input
        document.querySelector('input[type="file"]').value = "";
        triggerUpdate();
      }
    } catch (error) {
      toast.error("Failed to update Banner Settings. Please try again.");
    }
  };

  return (
    <div className={`dashboard ${isOpen ? "open" : ""}`}>
      <h2 className="form-heading">Banner Settings</h2>

      <div className="visibility-control">
        <span>Banner Visibility</span>
        <button
          onClick={handleVisibilityToggle}
          className="visibility-toggle"
          aria-label={isVisible ? "Disable banner" : "Enable banner"}
        >
          <FontAwesomeIcon
            icon={isVisible ? faToggleOn : faToggleOff}
            size="sm"
            color={isVisible ? "#4CAF50" : "#ccc"}
          />
        </button>
      </div>

      <div className="timer-control">
        <span>Banner Timer (seconds)</span>
        <div className="inner-timer-control">
          <input
            type="number"
            min="5"
            max="300"
            // value={inputTimer}
            onChange={handleInputTimerChange}
          />
          <button onClick={handleTimerUpdate} className="update-timer-btn">
            Update Timer
          </button>
        </div>
      </div>

      {/* Form for Description and image */}
      <form onSubmit={handleSubmit}>
        <label>
          Banner Description
          <input
            type="text"
            placeholder="Write banner Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Banner Image
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </label>
        <button type="submit">Add new Banner</button>
      </form>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Dashboard;
