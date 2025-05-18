import axios from "axios";
import NavBar from "./components/NavBar.tsx";
import TableList from "./components/TableList.tsx";
import { useState } from "react";
import ModalForm from "./components/ModalForm.tsx";
import type { IClientData } from "./lib/interfaces.ts";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState<IClientData | null>(null);
  const handleOpen = (mode: string, client?: IClientData) => {
    setClientData(client || null);
    setIsOpen(true);
    setModalMode(mode);
  };

  const handleSubmitMode = async (data: IClientData) => {
    if (modalMode === "add") {
      try {
        await axios.post("http://localhost:5000/api/clients", data);
      } catch (err) {
        console.log((err as Error).message);
      }
    } else {
      try {
        await axios.put(
          `http://localhost:5000/api/clients/${clientData?.id}`,
          data
        );
      } catch (err) {
        console.log((err as Error).message);
      }
    }
    setIsOpen(false);
  };
  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />
      <TableList handleOpen={handleOpen} searchTerm={searchTerm} />
      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        onSubmit={handleSubmitMode}
        clientData={clientData}
      />
    </>
  );
}

export default App;
