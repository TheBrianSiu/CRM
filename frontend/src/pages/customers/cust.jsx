import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
} from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { openDB } from 'idb';
import Fuse from 'fuse.js';
import { useAuth0 } from '@auth0/auth0-react';
import { Table } from './component/theme/table';
import { Pagination, totalPages, switchPage } from '@/utils';
import Navbar from './component/utils/navbar';
import {
  retreiveCustDataLocal,
  fetchCustDataAndStoreLocal,
} from '@/data/index-db';

function Customers() {
  const { user } = useAuth0();
  const [Istheme, setIsthem] = useState('All');
  const navigate = useNavigate();
  const [Userdata, setUserdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [lastItemIndex, setLastItemIndex] = useState(itemsPerPage);

  // retrieve data and put into local
  useEffect(() => {
    // initalize the DB exclusively for Netlify hosting coz it doesn't have on calling another fucntion
    const db = openDB('customers', 1, {
      upgrade(db) {
        db.createObjectStore('cust', { keyPath: 'id' });
      },
    });
    const fetchData = async () => {
      await fetchCustDataAndStoreLocal(user.sub);
    };
    fetchData();
  }, []);

  // retreieve from local
  useEffect(() => {
    const storeCust = async () => {
      await retreiveCustDataLocal(setUserdata);
    };
    storeCust();
  }, [Userdata]);

  // navigation
  function adduser() {
    navigate('add');
  }

  // search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const options = {
    keys: [
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'addressCity',
      'addressState',
      'propertyType',
      'locationPreference',
      'status',
    ],
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

  // switching pages
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
            Customer Table
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
          {Istheme === 'All' ? (
            <Table currentItems={currentItems} Userdata={Userdata} />
          ) : null}
          <div className="mt-4 flex justify-center">
            {Istheme === 'All' ? (
              <Pagination
                currentPage={currentPage}
                filteredUserdataLength={filteredUserdata.length}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                indexOfLastItem={indexOfLastItem}
                handlePrevPage={() =>
                  switchPage(
                    'prev',
                    currentPage,
                    totalPages(filteredUserdata.length, itemsPerPage),
                    setCurrentPage,
                  )
                }
                handleNextPage={() =>
                  switchPage(
                    'next',
                    currentPage,
                    totalPages(filteredUserdata.length, itemsPerPage),
                    setCurrentPage,
                  )
                }
              />
            ) : null}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Customers;
