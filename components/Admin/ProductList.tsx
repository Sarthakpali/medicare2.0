import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { ProductContext } from "../../contexts";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import { NULL } from "sass";

const ProductList = ({ prods, cats }) => {
  const [products, setProduct] = useState(prods);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [edit, setEdit] = useState(null);
  const [modal, setModal] = useState(null);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + 10;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / 10));
  }, [itemOffset, products]);

  //handle Pagination Click
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios
    
    .post("/api/admin/product", { title, desc, category, price, image })
    console.log(response)
  };

  // handle product filter
  const handleFilter = async (event) => {
    if (event.target.value === "all") {
      products(prods);
    } else {
      const cat = event.target.value;
      console.log(cat);
      const filtered_prods = await prods.filter(
        (item) => item.category === cat
      );
      products(filtered_prods);
      return;
    }
  };

  return (
    <main className="relative w-full pb-8">
      {/* <!--modal content--> */}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {modal && (
        <div
          id="edit_prod"
          className="absolute w-1/3 left-1/3 top-52 bg-white rounded-lg shadow dark:bg-gray-700"
        >
          <div className="flex justify-end p-2">
            <button
              onClick={() => setModal(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <form
            className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
            action="#"
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit Product
            </h3>
            <div>
              <label
                htmlFor="product"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Product
              </label>
              <input
                type="text"
                name="product"
                id="product"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                defaultValue={edit?.title}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Category
              </label>
              <select name="Category" id="Category" value={category || null }
                onChange = {(e) => {
                  setCategory(e.target.value)
                }}
              >
                {cats.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.slug}
                    {...(edit?.category === cat.slug && { selected: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  >
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Price
              </label>
              <input
                type="text"
                name="price"
                id="price"
                value={price}
                defaultValue={edit?.price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="desc"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Description
              </label>
              <input
                type="text"
                name="desc"
                id="desc"
                defaultValue={edit?.desc}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Image
              </label>
              <input
                type="text"
                name="image"
                id="image"
                defaultValue={edit?.image}
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            <button
              type="submit"
              onClick={() => {
                event.preventDefault();
                toast.success("Product Edited Succefully.", {
                  position: "bottom-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              
            >
              Save Changes
            </button>
          </form>
        </div>
      )}

      <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">
            Products
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Let&apos;s grow to your business! Create your product and upload
            here
          </p>
        </div>
        <button
          className="bg-medi-200 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-medi-100 focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={() => {
            setEdit(null), setModal(true);
          }}
        >
          Add New
        </button>
        <div
          className="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        ></div>
      </div>

      {/* display categories here */}
      <ul className="flex gap-x-24 items-center px-4 border-y border-gray-200">
        {cats.map((cat) => {
          return (
            <li key={cat._id}>
              <button
                className="flex gap-x-2 items-center py-5 px-6 
                w-full text-gray-500 hover:text-indigo-600 relative group font-medium"
                value={cat.slug}
                onClick={(event) => handleFilter(event)}
              >
                {cat.title}
                <span className="absolute w-full h-0.5 left-0 bg-indigo-600 rounded bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out" />
              </button>
            </li>
          );
        })}
        <li>
          <button
            className="flex gap-x-2 items-center py-5 px-6 
                w-full text-gray-500 hover:text-indigo-600 relative group font-medium"
            value="all"
            onClick={(event) => handleFilter(event)}
          >
            All
            <span className="absolute w-full h-0.5 left-0 bg-indigo-600 rounded bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out" />
          </button>
        </li>
      </ul>

      <table className="w-full border-b border-gray-200">
        <thead>
          <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
            <td className="pl-10">
              <span> {"  "}</span>
              <div className="flex items-center gap-x-4">
                <span>Product Name</span>
              </div>
            </td>
            <td className="py-4 px-4 text-center">Pricing</td>
            <td className="py-4 px-4 text-center">Orders</td>
          </tr>
        </thead>
        <tbody className="w-fit">
          {currentItems?.map((prod) => {
            return (
              <tr
                key={prod._id}
                //loop for diff products
                className="hover:bg-gray-100 transition-colors group"
              >
                <td className="flex gap-x-4 items-center py-4 pl-10">
                  <Image
                    src={prod.image}
                    alt="Product"
                    height="100px"
                    width="100px"
                    className="w-40 aspect-[3/2] rounded-lg object-cover object-top border border-gray-200"
                  />
                  <div>
                    <a href="#" className="text-lg font-semibold text-gray-700">
                      {prod.title}
                    </a>
                    <div className="font-medium text-gray-400">
                      {" "}
                      {prod.category}{" "}
                    </div>
                  </div>
                </td>
                <td className="font-medium text-center"> ₹{prod.price} </td>
                <td className="font-medium text-center">
                  {" "}
                  {prod?.orders}
                  <div className="hidden group-hover:flex group-hover:w-16 group-hover:items-center group-hover:text-gray-500 group-hover:gap-x-2">
                    <button
                      onClick={async () => {
                        if (modal === true) {
                          setModal(false);
                          console.log(edit);
                        }
                        setEdit(prod);
                        console.log(edit);
                        setModal(true);
                      }}
                      className="p-2 hover:rounded-md hover:bg-gray-200"
                    >
                      <PencilIcon className="w-6 h-6 fill-current" />
                    </button>
                    <button
                      className="p-2 hover:rounded-md hover:bg-gray-200 z-1"
                      onClick={() => {
                        toast.success("Product Deleted!", {
                          position: "bottom-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      }}
                    >
                      <TrashIcon
                        name={prod.slug}
                        className="w-6 h-6 fill-current z-0"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex gap-x-2 justify-center pt-8 ">
        <ReactPaginate
          breakLabel="..."
          containerClassName="flex justify-between list-none pointer items-center h-10 space-x-3"
          activeLinkClassName="text-medi-300 text-white"
          pageLinkClassName="p-2 border-2 rounded-sm  text-medi-100 border-medi-200 hover:bg-medi-200 hover:text-white"
          pageRangeDisplayed={5}
          renderOnZeroPageCount={null}
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          previousLinkClassName={"font-bold"}
          nextLinkClassName={"font-bold"}
          disabledClassName={"text-gray-500 cursor-not-allowed "}
          activeClassName={"text-white "}
        />
      </div>
    </main>
  );
};

export default ProductList;
