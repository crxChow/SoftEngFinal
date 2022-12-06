import Model from "../model/model";

export default function Edit({ curModel }) {
  console.log(curModel);
  const projects = curModel.projects;
  let val;

  function handleMove() {
    let EditModel = new Model();
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
