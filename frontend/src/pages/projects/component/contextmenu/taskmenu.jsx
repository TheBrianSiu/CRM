import { useNavigate } from 'react-router-dom';
import { deleteProjectWithRelatedData } from '@/data/projects-data';
import { Item, Menu, Separator} from 'react-contexify';
import  styles from '../styles/taskmenu.css'
import 'react-contexify/dist/ReactContexify.css';

function TaskMenu({ task }) {
  const navigate = useNavigate();

  const handleEditRedirect = (id) => {
    navigate(`edit/${id}`);
  };

  return (
    <div>
      <Menu id={task.projectId} animation="scale" className={styles.TaskMenu}>
        <Item id={1} onClick={() => handleEditRedirect(task.projectId)}>
          <span aria-label="Edit">✏️&nbsp;&nbsp;Edit</span>
        </Item>
        <Separator/>
        <Item id={2} onClick={() => deleteProjectWithRelatedData(task.projectId)}>
          <span aria-label="Delete">🗑️&nbsp;&nbsp;Delete</span>
        </Item>
      </Menu>
    </div>
  );
}

export default TaskMenu;
