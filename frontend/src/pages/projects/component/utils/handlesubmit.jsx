import { addprojects } from "@/data/projects-data";

export const HandleSubmit = (taskitem) => {
  addprojects(taskitem)
    .catch((err) => {
      alert(err);
    });
};
