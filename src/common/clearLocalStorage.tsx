const clearLocalStorageExceptToken = () => {
    const token = localStorage.getItem('token');
    localStorage.clear();
  
    if (token !== null) {
      localStorage.setItem('token', token);
    }
  };
  
  clearLocalStorageExceptToken();
  