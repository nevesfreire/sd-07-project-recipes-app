const HandleStateChange = ({ target: { name, value } }) => {
  setState({ ...state, [name]: value });
};

export default HandleStateChange;
