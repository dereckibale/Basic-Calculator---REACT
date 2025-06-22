function Button({ num, onPress }) {
  let if_Clicked = (n) => {
    onPress(n);
  };
  return (
    <>
      <button className="button" onClick={() => if_Clicked(num)}>
        {num}
      </button>
    </>
  );
}

export default Button;
