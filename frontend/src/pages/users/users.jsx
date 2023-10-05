import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@/utils/pagiantion";
import Fuse from "fuse.js";
import { retrieveData } from "../../data/users-data";
import Navbar from "./component/utils/navbar";
import { Table } from "./component/theme/table";

export function Users() {
  const [Istheme, setIsthem] = useState("All");
  const navigate = useNavigate();
  const [Userdata, setUserdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [lastItemIndex, setLastItemIndex] = useState(itemsPerPage);

  // retrieve data
  useEffect(() => {
    retrieveData()
      .then((data) => setUserdata(data))
      .catch((error) => console.error(error));
  }, []);

  // navigation
  function adduser() {
    navigate("add");
  }

  // search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const options = {
    keys: ["first_name", "last_name", "email", "phone_number", "status"],
    threshold: 0.3,
    location: 0,
    distance: 100,
    includeMatches: true,
    includeScore: true,
    useExtendedSearch: true,
  };

  const fuse = new Fuse(Userdata, options);

  const filteredUserdata = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : Userdata;

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
            Users Table
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
            <Table currentItems={currentItems} Userdata={Userdata} />
          ) : null}
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
}

export default Users;