import { addProjects } from '@/data/projects-data';

export const HandleSubmit = (taskitem) => {
  addProjects(taskitem).catch((err) => {
    alert(err);
  });
};
