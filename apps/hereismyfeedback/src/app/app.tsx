import { useGlobal } from "../GlobalProvider";

export function App() {
  const { connect, accessToken } = useGlobal();
  const socket = connect(accessToken);
  socket.on("news", function (data) {
    console.log(data);
  });

  // return <div className={styles.app}>test</div>;
  return (
    <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
      <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
        <h1 className="text-2xl font-bold mb-8">Form With Floating Labels</h1>
        <form id="form" noValidate>
          <div className="relative z-0 w-full mb-5">
            <input
              type="text"
              name="name"
              placeholder=" "
              required
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <label
              htmlFor="name"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Enter name
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Name is required
            </span>
          </div>

          <div className="relative z-0 w-full mb-5">
            <input
              type="email"
              name="email"
              placeholder=" "
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <label
              htmlFor="email"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Enter email address
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Email address is required
            </span>
          </div>

          <div className="relative z-0 w-full mb-5">
            <input
              type="password"
              name="password"
              placeholder=" "
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <label
              htmlFor="password"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Enter password
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Password is required
            </span>
          </div>

          <fieldset className="relative z-0 w-full p-px mb-5">
            <legend className="absolute text-gray-500 transform scale-75 -top-3 origin-0">
              Choose an option
            </legend>
            <div className="block pt-3 pb-2 space-x-4">
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="1"
                  className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                />
                Option 1
              </label>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="2"
                  className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                />
                Option 2
              </label>
            </div>
            <span className="text-sm text-red-600 hidden" id="error">
              Option has to be selected
            </span>
          </fieldset>

          <div className="relative z-0 w-full mb-5">
            <select
              name="select"
              value=""
              onClick={() => {
                console.log("clicked");
              }}
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            >
              <option value="" selected disabled hidden></option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
              <option value="4">Option 4</option>
              <option value="5">Option 5</option>
            </select>
            <label
              htmlFor="select"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Select an option
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Option has to be selected
            </span>
          </div>

          <div className="flex flex-row space-x-4">
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="date"
                placeholder=" "
                onClick={() => {
                  console.log("clicked");
                }}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              <label
                htmlFor="date"
                className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Date
              </label>
              <span className="text-sm text-red-600 hidden" id="error">
                Date is required
              </span>
            </div>
            <div className="relative z-0 w-full">
              <input
                type="text"
                name="time"
                placeholder=" "
                onClick={() => {
                  console.log("clicked");
                }}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              <label
                htmlFor="time"
                className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Time
              </label>
              <span className="text-sm text-red-600 hidden" id="error">
                Time is required
              </span>
            </div>
          </div>

          <div className="relative z-0 w-full mb-5">
            <input
              type="number"
              name="money"
              placeholder=" "
              className="pt-3 pb-2 pl-5 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <div className="absolute top-0 left-0 mt-3 ml-1 text-gray-400">
              $
            </div>
            <label
              htmlFor="money"
              className="absolute duration-300 top-3 left-5 -z-1 origin-0 text-gray-500"
            >
              Amount
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Amount is required
            </span>
          </div>

          <div className="relative z-0 w-full mb-5">
            <input
              type="text"
              name="duration"
              placeholder=" "
              className="pt-3 pb-2 pr-12 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-400">
              min
            </div>
            <label
              htmlFor="duration"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Duration
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Duration is required
            </span>
          </div>

          <button
            id="button"
            type="button"
            className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
          >
            Toggle Error
          </button>
        </form>
      </div>
    </div>
  );
}
