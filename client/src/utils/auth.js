export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const decoded = JSON.parse(atob(token.split(".")[1]));
  return decoded.exp * 1000 > Date.now(); // Check token expiry
};
