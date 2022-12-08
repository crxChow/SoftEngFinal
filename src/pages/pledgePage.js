export default function PledgePage({ pledgePageModel, pledgePageEditModel }) {
  const pledgeID = window.location.href.split("/designer/pledge")[1];
  console.log(pledgeID);
  let pledge;
  for (let i = 0; i < pledgePageModel.designer.projects.length; i++) {
    for (
      let j = 0;
      i < pledgePageModel.designer.projects[i].pledge.length;
      j++
    ) {
      if (pledgePageModel.designer.projects[i].pledge[j].PLID === pledgeID) {
        pledge = pledgePageModel.designer.projects[i].pledge[j];
        console.log(pledge);
      }
    }
  }
  return <h1>You got to the page. Cool!</h1>;
}
