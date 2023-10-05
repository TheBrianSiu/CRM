import { updatestatus } from "../data/projects-data";

export const HandleUpdate = (id, status) => {
  updatestatus(id, status)
    .then(function (data) {})
    .catch((err) => {
      alert(err);
    });
};
