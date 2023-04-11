import axios from "axios";

const loginRest = async (username, secret) => {
  return await axios.get("https://api.chatengine.io/users/me/", {
    headers: {
      "Project-ID": 'a668d539-1ce9-4b3d-8a97-d92c97f07535',
      "User-Name": username,
      "User-Secret": secret,
    },
  });
};

const signupRest = async (username, secret, email, first_name, last_name) => {
    console.log('MASUK SINI')
  return await axios.post(
    "https://api.chatengine.io/users/",
    { username, secret, email, first_name, last_name },
    { headers: { "Private-Key": 'f9fd5622-4e2e-4ab3-81d6-31df6b9681eb' } }
  );
};

export { loginRest, signupRest }; 