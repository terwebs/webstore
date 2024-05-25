import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
// import { Header, Navbar, Loading } from "../components";

export default function HomeLayoutPage() {
  const naviation = useNavigation();
  const isPageLoading = naviation.state === "loading";
  return (
    <>
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-elements py-20">
          <Outlet />
        </section>
      )}
    </>
  );
}
