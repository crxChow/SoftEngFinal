import Model from "../model/model";

export default function Edit({ curModel }) {
  console.log(curModel);
  
  let val;

  function handleMove() {
    let EditModel = Object.assign({}, curModel);
    console.log(EditModel);
  }

  function handleChange() {
    console.log("change");
  }

  return (
    <form onSubmit={handleMove()}>
      <label>
        Name:
        <input type="text" value={val} onChange={handleChange()} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
