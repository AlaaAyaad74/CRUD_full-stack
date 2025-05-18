import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import type { IModalForm } from "../lib/interfaces.ts";

function ModalForm({
  isOpen,
  onClose,
  mode,
  onSubmit,
  clientData,
}: IModalForm) {
  const [rate, setRate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [isactive, setIsactive] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const clientData = {
        name,
        email,
        job,
        rate: Number(rate),
        isactive,
      };
      await onSubmit(clientData);
    } catch (err) {
      console.log(err);
    }
    onClose();
  };
  useEffect(() => {
    if (mode === "edit" && clientData) {
      setName(clientData.name);
      setEmail(clientData.email);
      setJob(clientData.job);
      setRate(clientData.rate.toString());
      setIsactive(clientData.isactive);
    } else {
      setName("");
      setEmail("");
      setJob("");
      setRate("");
      setIsactive(false);
    }
  }, [clientData, mode]);
  return (
    <>
      <dialog id="my_modal_2" className="modal" open={isOpen}>
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? "Edit Client" : "Client Details"}
          </h3>

          <form onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center my-4 gap-2 w-full">
              Name
              <input
                type="text"
                className="grow"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </label>
            <label className="input input-bordered flex items-center my-4 gap-2 w-full">
              Email
              <input
                type="text"
                className="grow"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </label>
            <label className="input input-bordered flex items-center my-4 gap-2 w-full">
              Job
              <input
                type="text"
                className="grow"
                value={job}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setJob(e.target.value)
                }
              />
            </label>

            {/* ++ made this anumber */}
            <div className="flex mb-4 justify-between">
              <label className="input input-bordered flex mr-4 items-center gap-2 w-full">
                Rate
                <input
                  type="number"
                  className="grow"
                  value={rate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRate(e.target.value)
                  }
                />
              </label>

              <select
                className="select select-bordered w-full max-w-xs"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setIsactive(e.target.value === "Active")
                }
              >
                <option>Inactive</option>
                <option>Active</option>
              </select>
            </div>
            <button type="submit" className=" btn btn-success">
              {mode === "edit" ? "Save Changes" : "Add Client"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
export default ModalForm;
/**to push*/
