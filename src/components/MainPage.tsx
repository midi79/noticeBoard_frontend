import { Outlet } from "react-router-dom";
import Header from "./common/sections/Header";
import Navigator from "./common/sections/Navigator";
import Footer from "./common/sections/Footer";

const MainPage = () => {
    return (
        <div>
            <Header />
            <Navigator />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainPage;
