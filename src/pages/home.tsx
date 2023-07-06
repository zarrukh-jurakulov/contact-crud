import { useEffect, useState } from "react";
import {
  deleteContact,
  fetchContacts,
  fetchContactsCount,
} from "../services/contactService";
import { ContactType } from "../types/contactTypes";
import UpdateContactModal from "../components/updateContactModal";
import { capitalize } from "../utils/textFormatter";
import CreateContactModal from "../components/createContactModal";
import Loading from "../components/loading";
import Pagination from "../components/pagination";

const Home = () => {
  const [userId, setUserId] = useState<string>("");
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [contactCount, setContactCount] = useState<number>();
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [datasPerPage, setDatasPerPage] = useState(3);

  // Get Contact List

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const values: any = await fetchContacts();
      // indexOfFirstData, datasPerPage
      setData(values);
      setIsLoading(false);
    };
    getData();
  }, []);

  // Filter data

  const handleSearch = (e: any) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };

  useEffect(() => {
    const getContactCount = async () => {
      const values: any = await fetchContactsCount();
      const count = values.count;
      setContactCount(count);
    };

    getContactCount();
  }, []);

  const filterData = data?.filter((el: any) => {
    if (search === "") {
      return el;
    } else {
      return el.name.toLowerCase().includes(search);
    }
  });

  // Handle Pagination

  const indexOfLastData = currentPage * datasPerPage;
  const indexOfFirstData = indexOfLastData - datasPerPage;
  const currentDatas = filterData?.slice(indexOfFirstData, indexOfLastData);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Delete Contact

  const handleConfirmDelete = (id: string) => {
    if (confirm("Are you sure to delete ?") === true) {
      deleteContact(id);
    } else {
      console.log("Deletion cancelled");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col mt-3 d-flex align-items-center justify-content-between">
          <h3>My Contacts</h3>
          <input
            type="search"
            placeholder="Search by Name"
            className="form-control w-50"
            onChange={handleSearch}
            value={search}
          />
          <select onChange={(e: any) => setDatasPerPage(e.target.value)}>
            <option value={20}>20</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={5}>5</option>
            <option value={3}>3</option>
          </select>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsCreateOpen(true)}
          >
            + Create New Contact
          </button>
        </div>
      </div>
      <table className="table table-hover border mt-3">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Company</th>
            <th scope="col">Type</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentDatas?.map((contact: ContactType) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.company}</td>
              <td>{capitalize(contact.type)}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <span
                  className="text-info"
                  onClick={() => {
                    setUserId(contact.id), setIsUpdateOpen(true);
                  }}
                >
                  Edit
                </span>

                <span
                  className="text-danger ms-3"
                  onClick={() => handleConfirmDelete(contact.id)}
                >
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        datasPerPage={datasPerPage}
        totalData={contactCount}
        paginate={paginate}
      />
      {userId && isUpdateOpen && (
        <UpdateContactModal
          userId={userId}
          isOpen={isUpdateOpen}
          onClose={() => setIsUpdateOpen(false)}
        />
      )}
      {isCreateOpen && (
        <CreateContactModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
