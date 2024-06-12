import ReactDOM from "react-dom/client";
import "./index.css";
import MainPage from "./components/MainPage.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/pages/error/ErrorPage.tsx";
import BoardListPage from "./components/pages/board/BoardListPage.tsx";
import CalendarPage from "./components/pages/calendar/CalendarPage.tsx";
import IntroPage from "./components/pages/intro/IntroPage.tsx";
import BoardEditPage from "./components/pages/board/BoardEditPage.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./components/common/util/http.ts";
import BoardViewPage from "./components/pages/board/BoardViewPage.tsx";
import BoardVerifyPasswordPage from "./components/pages/board/BoardVerifyPasswordPage.tsx";

const router = createBrowserRouter([
    {
        path: "",
        element: <MainPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <IntroPage />,
            },
            {
                path: "pages/board",
                element: <BoardListPage />,
            },
            {
                path: "pages/board/edit",
                element: <BoardEditPage />,
            },
            {
                path: "pages/board/:id",
                element: <BoardViewPage />,
            },
            {
                path: "pages/board/edit/:id",
                element: <BoardEditPage />,
            },
            {
                path: "pages/board/verify/password/:id",
                element: <BoardVerifyPasswordPage />,
            },
            {
                path: "pages/calendar",
                element: <CalendarPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
);
