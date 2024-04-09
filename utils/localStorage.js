export const addUserToLocalStorage = (user) => {
  console.log(user, 'received in add');
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', user);
  }
};

export const removeUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

export const getUserFromLocalStorage = () => {
  let result;
  if (typeof window !== 'undefined') {
    result = localStorage.getItem('user');
  }

  return result;
};