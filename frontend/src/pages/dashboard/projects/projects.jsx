import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import Navbar from "./component/utils/navbar";
import TaskBoard from "./component/theme/taskboard";
import Table from "./component/theme/table";
import Pagination from "./component/utils/Pagiantion";
import { SwitchPage } from "./component/utils/switchpage";


const Projects = () => {
  const [Istheme, setIsthem] = useState("All");
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [lastItemIndex, setLastItemIndex] = useState(itemsPerPage);

  // retrieve data
  useEffect(() => {
    fetch("http://localhost:8080/projects-with-assignees")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const options = {
    keys: [
      "task_name",
      "assignees.first_name",
      "assignees.last_name",
      "description",
      "est_value",
      "lead_status",
      "priority",
    ],
    threshold: 0.3,
    location: 0,
    distance: 100,
    includeMatches: true,
    includeScore: true,
    useExtendedSearch: true,
  };

  //search engine
  const fuse = new Fuse(tasks, options);

  const filteredUserdata = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : tasks;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // update/generate taskboard column and taskitem function
  useEffect(() => {
    const generateColumns = (leadStatus, backgroundColor) => {
      return {
        id: leadStatus.toLowerCase(),
        lead_status: leadStatus,
        taskIds: filteredUserdata
          .filter((task) => task.lead_status === leadStatus.toLowerCase())
          .map((task) => task.project_id),
        backgroundColor,
      };
    };

    const updatedColumns = [
      generateColumns("New", "#F1F1EF"),
      generateColumns("Prospect", "#E9F3F7"),
      generateColumns("Proposal", "#EEF3ED"),
      generateColumns("Won", "#FAF3DD"),
      generateColumns("Lost", "#FAECEC"),
    ];

    setColumns(updatedColumns);
  }, [filteredUserdata]);

  // navigation
  function adduser() {
    navigate("add");
  }

  //deletion
    function deleteProject(id) {
    if (window.confirm("Do you want to delete the user?")) {
      fetch(`http://localhost:8080/projects/delete/${id}`, {
        method: "PUT",
      })
        .then((response) => response.json())
        .then((data) => {
          removeAssigness(id);
          removeCustomer(id);
          console.log("Response data:", data);
          alert("The task is deleted");
        })
        .catch((error) => console.error(error));
    }
  }
    // delete assignees linkage
    function removeAssigness(project_id){
      fetch(`http://localhost:8080/project-assignee/delete/${project_id}`,{
        method:"DELETE",
        headers: {"Content-Type": "application/json"},
      })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return res.json();
        }
      })
      .then(function (data) {
      })
      .catch((err) => {
        alert(err);
      });
    }
    // delete customers linkage
    function removeCustomer(project_id){
      fetch(`http://localhost:8080/project-customer/delete/${project_id}`,{
        method:"DELETE",
        headers: {"Content-Type": "application/json"},
      })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return res.json();
        }
      })
      .then(function (data) {
      })
      .catch((err) => {
        alert(err);
      });
    }

  // range of item to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUserdata.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div className="mb-8 mt-12 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Project Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
          <Navbar
            adduser={adduser}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            Istheme={Istheme}
            setIstheme={setIsthem}
          />
          {Istheme === "All" ? (
            <Table currentItems={currentItems} tasks={tasks} onDelete={deleteProject} />
          ) : (
            <TaskBoard
              tasks={tasks}
              setTasks={setTasks}
              columns={columns}
              setColumns={setColumns}
            />
          )}
          <div className="mt-4 flex justify-center">
            {Istheme === "All" ? (
              <Pagination
                currentPage={currentPage}
                filteredUserdataLength={filteredUserdata.length}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                indexOfLastItem={indexOfLastItem}
                handlePrevPage={() =>
                  SwitchPage("prev", currentPage, totalPages, setCurrentPage)
                }
                handleNextPage={() =>
                  SwitchPage("next", currentPage, totalPages, setCurrentPage)
                }
              />
            ) : null}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Projects;
