import { updateStatus } from '@/data/projects-data';

export const HandleUpdate = (id, status) => {
  updateStatus(id, status).catch((err) => {
    alert(err);
  });
};
