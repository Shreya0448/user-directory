const BASE_URL = 'https://jsonplaceholder.typicode.com';
const TIMEZONE_BASE_URL = 'https://worldtimeapi.org/api/timezone'

async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  return response.json();
}

async function getUserDetails(userId) {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  return response.json();
}

async function getPostsData() {
  const response = await fetch(`${BASE_URL}/posts`);
  return response.json();
}

async function getCountries() {
    const response = await fetch(`${TIMEZONE_BASE_URL}`);
    return response.json();
}

async function getTimer(location) {
    const response = await fetch(`${TIMEZONE_BASE_URL}/${location}`);
    return response.json();
}
    
const api = {
  getUsers,
  getUserDetails,
  getPostsData,
  getCountries,
  getTimer
};

export default api;
