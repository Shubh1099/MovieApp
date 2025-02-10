import { FaUserAlt } from "react-icons/fa";
function NavBar() {
  return (
    <>
      <div className="flex flex-row justify-between  bg-emerald-300 ">
        <h1 className="text-3xl font-mono font-semibold p-4  ">MyMovies</h1>
        <FaUserAlt className="text-3xl  pt-4 " size={40} />
      </div>

      <div className="p-8"></div>
    </>
  );
}

export default NavBar;
