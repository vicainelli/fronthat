const postAJobFormValidator = {
  name: (name) => {
    if (name.length < 3) {
      return ['Name must be at least 3 characters.'];
    }
    return [];
  },
  email: (email) => {
    const isInvalidEmail = () => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return !re.test(email);
    };
    if (isInvalidEmail()) {
      return ['Please enter a valid email address.'];
    }
    return [];
  }
};
export default postAJobFormValidator;
