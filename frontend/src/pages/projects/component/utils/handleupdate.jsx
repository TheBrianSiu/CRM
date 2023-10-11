import { updatestatus } from "@/data/projects-data";

export const HandleUpdate = (id, status) => {
  updatestatus(id, status)
    .catch((err) => {
      alert(err);
    });
};
