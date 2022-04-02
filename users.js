import names from 'random-names-generator';

const users = [...Array(10)].map((value, index) => {
  return {
    userId: index + 1,
    firstName: names.random(),
    lastName: names.random(),
  };
});

export default users;
