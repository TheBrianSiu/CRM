import { updatestatus } from "../../api/api";

export const HandleUpdate = (id, status) => {
  updatestatus(id,status)
    .then(function (data) {})
    .catch((err) => {
      alert(err);
    });
};
