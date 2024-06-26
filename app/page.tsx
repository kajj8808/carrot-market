export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen px-5 bg-gray-100 ">
      <div className="flex flex-col w-full max-w-screen-sm gap-2 p-5 bg-white shadow-md rounded-3xl">
        <input
          className="w-full py-3 pl-5 transition-shadow bg-gray-200 rounded-full outline-none ring ring-transparent ring-offset-2 focus:ring-orange-500 focus:ring-offset-2 placeholder:drop-shadow "
          type="text"
          placeholder="Search here..."
        />
        <button className="py-2 font-medium text-white transition-transform bg-black rounded-full outline-none active:scale-90 focus:scale-90">
          Search
        </button>
      </div>
    </main>
  );
}
