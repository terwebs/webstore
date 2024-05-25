import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

export default function PagintationContainer() {
  const { response } = useLoaderData();
  const { limit, skip, total } = response.data;

  const totalPages = Math.ceil(total / limit);
  const page = 1 + Math.ceil(skip / limit);
  const pages = Array.from({ length: totalPages }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("skip", (pageNumber - 1) * limit);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (totalPages < 2) return null;
  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        {page !== 1 ? (
          <button
            className="btn btn-xs sm:btn-md join-item"
            onClick={() => {
              let prevPage = page - 1;
              if (prevPage < 1) prevPage = totalPages;
              handlePageChange(prevPage);
            }}
          >
            Prev
          </button>
        ) : null}
        {pages.map((pageNumber) => {
          return (
            <button
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page
                  ? "bg-base-300 border-base-300 text-primary font-bold"
                  : ""
              }`}
              onClick={() => handlePageChange(pageNumber)}
              key={pageNumber}
            >
              {pageNumber}
            </button>
          );
        })}
        {page !== totalPages ? (
          <button
            className="btn btn-xs sm:btn-md join-item"
            onClick={() => {
              let nextPage = page + 1;
              if (nextPage > totalPages) nextPage = totalPages;
              handlePageChange(nextPage);
            }}
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}
