import Cart from "@heroicons/react/outline/ShoppingCartIcon";
import Menu from "@heroicons/react/outline/MenuIcon";
import UserIcon from "@heroicons/react/outline/UserIcon";
const Nav = ({ cart }) => {
  // const [searchVal, setsearchVal] = useState(null);
  // function for toggling dropdown menu
  function dropdownClick() {
    let state = document.getElementById("dropdown").className;
    let btn = document.getElementById("toggler");

    if (state == "hidden sm:hidden") {
      document.getElementById("dropdown").className = "flex sm:hidden";
      btn.className = "bg-[#34A19C] rounded-md sm:hidden";
    } else {
      document.getElementById("dropdown").className = "hidden sm:hidden";
      btn.className =
        "bg-[#00a59c] rounded-md shadow-sm shadow-gray-500 sm:hidden";
    }
  }

  function searchProd(event) {
    console.log(event);
  }
  return (
    <div className="flex flex-col m-0 w-full sticky top-0 z-50">
      <div className="bg-medi z-50 w-full px-6 h-20 flex justify-between items-center">
        <div className="w-3/4 space-x-4 inline-flex justify-start items-center">
          <img className="h-12" src="./images/logo.jpg" alt="" />
          <div className="sm:flex sm:w-full hidden ">
            <input
              className="w-5/6 rounded-sm focus:outline focus:outline-2 focus:outline-offset-0 py-1 px-2 focus:outline-blue-500 placeholder:italic "
              type="search"
              name="find_prod"
              id="prod_search"
              placeholder="Search"
              onChange={searchProd}
            />
            <button className="flex items-center uppercase font-light text-sm h-8 text-green-300 justify-center mx-2 px-5 py-2 outline outline-2 rounded outline-green-500">
              Search
            </button>
          </div>
        </div>
        <div className="flex space-x-3 text-white text-[1.05rem] items-center">
          <a className="inline-flex relative" href="/cart">
            <Cart className="w-6" />
            Cart
            <span className="ml-1">{cart.length}</span>
            {/* <div className="h-9 bg-white absolute top-8">
              {cart.map((cat) => {
                return <div>{cat}</div>;
              })}
            </div> */}
          </a>
          <a className="inline-flex" href="#">
            <UserIcon className="w-6" />
            Login/SignUp
          </a>
          <button
            onClick={dropdownClick}
            id="toggler"
            className="bg-[#00a59c] rounded-md shadow-sm shadow-gray-500 sm:hidden"
          >
            <Menu className="w-10" color="white" />
          </button>
        </div>
      </div>
      <div id="dropdown" className="hidden sm:hidden">
        <div className="flex bg-medi w-full p-3 mx-auto">
          <input
            className="w-5/6 rounded-sm focus:outline focus:outline-2 focus:outline-offset-0 py-1 px-2 focus:outline-blue-500 placeholder:italic "
            type="search"
            name="find_prod"
            id="prod_search"
            placeholder="Search"
          />
          <button className="flex items-center uppercase font-light text-sm h-8 text-green-300 justify-center mx-2 px-5 py-2 outline outline-2 rounded outline-green-500">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
