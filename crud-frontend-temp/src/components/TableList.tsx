import { useEffect, useState } from "react";
import type { IClientData } from "../lib/interfaces";
import axios from "axios";

function TableList({
  handleOpen,
  searchTerm,
}: {
  handleOpen: (m: string, client?: IClientData) => void;
  searchTerm: string;
}) {
  const [clients, setClients] = useState<IClientData[] | []>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/clients");
        const data = await response.json();
        setClients(data);
      } catch (err) {
        setError("Ann error ocured while ferch data!");
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const filterdData = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
      client.job.toLocaleLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDelete = async (id: number) => {
    const confirmDelet = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (confirmDelet) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/clients/${id}`
        );
        setClients((prev) => prev.filter((client) => client.id !== id));
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      {error && <h1 className="text-red-500 text-center mt-20">{error}</h1>}
      {filterdData.length > 0 && (
        <div className="overflow-x-auto mt-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Job</th>
                <th>Rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="hover:bg-base-300">
              {/* row 1 */}

              {filterdData?.map((client, index) => (
                <tr key={index}>
                  <th>{client?.id}</th>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.job}</td>
                  <td>{client.rate}</td>
                  <td>
                    <button
                      className={`btn rounded-full w-20 
                        ${
                          client?.isactive
                            ? "btn-primary"
                            : "btn-outline btn-primary"
                        }`}
                    >
                      {client?.isactive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleOpen("edit", client)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-accent"
                      onClick={() => handleDelete(client.id || 0)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default TableList;
