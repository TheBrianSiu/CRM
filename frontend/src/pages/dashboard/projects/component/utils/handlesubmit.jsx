import { addprojects } from "../../api/api";

export const HandleSubmit = (taskitem) => {
  addprojects(taskitem)
    .then(function (data) {})
    .catch((err) => {
      alert(err);
    });
};
