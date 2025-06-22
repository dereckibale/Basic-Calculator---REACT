function Display({ input, total }) {
  return (
    <>
      <div className="input-display">
        <h3 className="display">{input}</h3>
      </div>
      <div className="total-display">
        <h3 className="display">{total}</h3>
      </div>
    </>
  );
}

export default Display;
