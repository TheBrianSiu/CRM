import { addprojects } from "../data/projects-data";

export const HandleSubmit = (taskitem) => {
  addprojects(taskitem)
    .then(function (data) {})
    .catch((err) => {
      alert(err);
    });
};
