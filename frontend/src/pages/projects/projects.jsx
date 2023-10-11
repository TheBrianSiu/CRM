import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./component/utils/navbar";
import TaskBoard from "./component/theme/taskboard";
import Table from "./component/theme/table";
import { SwitchPage, performSearch,Pagination, totalPages } from "@/utils";
import { RetreiveDataLocal, fetchDataAndStoreLocal } from "@/data/indexdb";

const Projects = () => {
  const [Istheme, setIsthem] = useState("All");
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [lastItemIndex, setLastItemIndex] = useState(itemsPerPage);
  

  //retrieve data and put into local
  useEffect(() => {
    const fetchData = async () => {
      await fetchDataAndStoreLocal();
    }
    fetchData();
  }, []);

  // retreieve from local
  useEffect(() => {
    const storeTasks = async () => {
      await RetreiveDataLocal(setTasks);
    };
    storeTasks();
  }, [tasks]);

  //search engine
  const filteredUserdata = performSearch(tasks, searchQuery);

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
            <Table currentItems={currentItems} tasks={tasks} />
          ) : (
            <TaskBoard tasks={tasks} columns={columns} />
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
                  SwitchPage("prev", currentPage, totalPages(filteredUserdata.length,itemsPerPage), setCurrentPage)
                }
                handleNextPage={() =>
                  SwitchPage("next", currentPage, totalPages(filteredUserdata.length,itemsPerPage) , setCurrentPage)
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
