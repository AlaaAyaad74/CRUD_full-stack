import type { ChangeEvent } from "react";
function NavBar({
  onOpen,
  onSearch,
}: {
  onOpen: () => void;
  onSearch: (term: string) => void;
}) {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <div className="navbar bg-base-100 shadow-sm p-4">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Clientsl</a>
      </div>
      <div className="navbar-center">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-48 md:w-auto"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="navbar-end">
        <a className="btn btn-primary" onClick={onOpen}>
          Add Client!
        </a>
      </div>
    </div>
  );
}

export default NavBar;
