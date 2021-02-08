import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  // baseURL: 'https://medication-track.herokuapp.com/api/',
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json, text/csv",
  },
});

export default axiosInstance;

export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// var csrftoken = getCookie('csrftoken');

// export const CSRFToken = () => {
//   return (
//     <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken} />
//   );
// };


// package.json 
//  "proxy": "http://127.0.0.1:8000",