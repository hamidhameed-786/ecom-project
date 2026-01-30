import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Profile() {
  // const { email } = useParams();
  const { sessionId } = useParams();
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(
          `http://localhost:5000/profile/${sessionId}`
        );
        const data = await response.json();
        if (data.ok) {
          setUserEmail(data.email);
        } else {
          console.log(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, [sessionId]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:5000/logout/${sessionId}`);
      const data = await response.json();
      if (data.ok) {
        console.log(data.message);
        navigate("/login");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">Welcome User:</h1>

      <h2 className="text-lg mb-4">
        <span className="font-medium">Email: {userEmail}</span>
      </h2>

      <button
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
