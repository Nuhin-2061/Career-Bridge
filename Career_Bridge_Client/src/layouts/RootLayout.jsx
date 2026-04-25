import { Outlet } from "react-router";
import NavBar from "../pages/Shared/NavBar";
import Footer from "../pages/Shared/Footer";


const RootLayout = () => {
    return (
        <div>
            <div className="px-4 md:px-16 lg:px-24 xl:px-32">
                <NavBar></NavBar>
                <Outlet></Outlet>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;