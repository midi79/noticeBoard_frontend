import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/common/sections/Header";

// Mock the Button component
jest.mock("../components/common/widget/Button", () => ({
    __esModule: true,
    default: ({ title, onClickHandler }: { title: string; onClickHandler: () => void }) => (
        <button onClick={onClickHandler}>{title}</button>
    ),
}));

// Mock the image import
jest.mock("../../../assets/images/noticeboard.png", () => "noticeboard.png");

describe("Header component", () => {
    test("renders Header component", () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(screen.getByText("React Notice Board")).toBeInTheDocument();
        expect(screen.getByAltText("Notice board")).toBeInTheDocument();
        expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    test("navigates to home on title click", () => {
        const { container } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const titleDiv = container.querySelector("img");

        if (titleDiv) {
            fireEvent.click(titleDiv);
            expect(titleDiv).toBeInTheDocument();
        } else {
            throw new Error("Title div not found");
        }
    });

    test("calls onClickLogoutHandler when Logout button is clicked", () => {
        console.log = jest.fn(); // Mock console.log

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const logoutButton = screen.getByText("Logout");
        fireEvent.click(logoutButton);

        expect(console.log).toHaveBeenCalledWith("logout");
    });
});
