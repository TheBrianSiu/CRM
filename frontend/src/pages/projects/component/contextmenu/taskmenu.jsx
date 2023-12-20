import { useNavigate } from 'react-router-dom';
import '../styles/taskmenu.css';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { deleteProjectWithRelatedData } from '@/data/projects-data';

function TaskMenu({ task }) {
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();

  // edit on the the taskitem
  // const handleEditClick = () => {
  //   setIsEditModalOpen(true);
  // };

  const handleEditRedirect = (id) => {
    // setIsEditModalOpen(false);
    navigate(`edit/${id}`);
  };

  return (
    <div>
      <ContextMenu id={`contextmenu-${task.projectId}`}>
        <MenuItem onClick={() => handleEditRedirect(task.projectId)}>
          <span aria-label="Edit">✏️</span>
          <span>Edit</span>
        </MenuItem>
        <MenuItem onClick={() => deleteProjectWithRelatedData(task.projectId)}>
          <span aria-label="Delete">🗑️</span>
          <span>Delete</span>
        </MenuItem>
      </ContextMenu>
      {/* {isEditModalOpen && (
        <EditModal task={task} onClose={handleCloseEditModal} />
      )} */}
    </div>
  );
}

export default TaskMenu;
