import React, { useState } from "react";
import { storage } from "../firebase/firebaseConfig"; // ✅ Import Firebase Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../Component/AuthContext";

const Profile = () => {
  const { currentUser } = useAuth();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async () => {
    if (!image) return;

    const storageRef = ref(storage, `profile_pictures/${currentUser.uid}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    setImageUrl(url);
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Profile" />}
    </div>
  );
};

export default Profile;
