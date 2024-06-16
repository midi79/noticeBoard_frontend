import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { boardListData } from "../components/data/list";
import BoardListPage from "../components/pages/board/BoardListPage";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { format } from "date-fns";
import * as httpModule from "../components/common/util/http";

const queryClient = new QueryClient();

describe("BoardListPage component", () => {
    beforeEach(() => {
        queryClient.clear();
    });

    beforeAll(() => {
        jest.spyOn(httpModule, "getBoards").mockImplementation(jest.fn());
        jest.spyOn(httpModule, "deleteBoards").mockImplementation(jest.fn());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = () =>
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <BoardListPage testData={boardListData} />
                </BrowserRouter>
            </QueryClientProvider>
        );

    //Mocking necessary functions and components
    jest.mock("../components/common/widget/IconButton", () => ({ title, onClickHandler }: any) => (
        <button onClick={onClickHandler}>{title}</button>
    ));

    jest.mock("../components/common/widget/Checkbox", () => ({ isChecked, checkHandler, type }: any) => (
        <input type="checkbox" checked={isChecked} onChange={checkHandler} data-testid={type} />
    ));

    jest.mock("../components/common/widget/Toggle", () => ({ isChecked, checkHandler, type }: any) => (
        <input type="checkbox" checked={isChecked} onChange={checkHandler} data-testid={type} />
    ));

    jest.mock("../components/common/widget/Button", () => ({ title, type, onClick }: any) => (
        <button type={type} onClick={onClick}>
            {title}
        </button>
    ));

    jest.mock("../components/common/util/datetime", () => ({
        DateTimeConverter: ({ date }: any) => <span>{new Date(date).toLocaleDateString()}</span>,
    }));

    // jest.mock("../components/common/util/http", () => ({
    //     deleteBoards: jest.fn(),
    //     getBoards: jest.fn().mockResolvedValue({ content: boardListData, totalPages: 2 }),
    //     updateBoardFavorite: jest.fn(),
    // }));

    test("renders board list page with correct data", async () => {
        const mockGetBoards = httpModule.getBoards as jest.MockedFunction<typeof httpModule.getBoards>;
        mockGetBoards.mockResolvedValueOnce({ content: boardListData, totalPages: 2 });

        renderComponent();

        // Check for page title
        expect(screen.getByText("Notice Board")).toBeInTheDocument();

        // Check for table headers
        const headers = ["✓", "FAV", "ID", "TITLE", "WRITER", "EDIT-DATE", "COUNT"];
        headers.forEach((header) => {
            expect(screen.getByText(header)).toBeInTheDocument();
        });

        // Check for each column items' length greater than 0
        boardListData.forEach((item) => {
            expect(screen.getAllByText(new RegExp(item.id.toString(), "i")).length).toBeGreaterThan(0);
            expect(screen.getAllByText(new RegExp(item.title, "i")).length).toBeGreaterThan(0);
            expect(screen.getAllByText(new RegExp(item.writer, "i")).length).toBeGreaterThan(0);
            expect(
                screen.getAllByText(new RegExp(format(new Date(item.editDate), "dd/MM/yyyy HH:mm"), "i")).length
            ).toBeGreaterThan(0);
            expect(screen.getAllByText(new RegExp(item.count.toString(), "i")).length).toBeGreaterThan(0);
            expect(item.favorite).toBeDefined();
        });

        // Check for list items
        boardListData.forEach((item) => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
            expect(screen.getByText(item.id)).toBeInTheDocument();
        });
    });

    test("handles select all checkbox", async () => {
        renderComponent();

        const selectAllCheckbox = screen.getByTestId("all");
        await act(async () => {
            userEvent.click(selectAllCheckbox);
        });

        await waitFor(() => {
            const checkboxes = screen.getAllByTestId("check");
            checkboxes.forEach((checkbox) => {
                expect(checkbox).toBeChecked();
            });
        });
    });

    test("Verify checkbox checked", async () => {
        renderComponent();

        const checkboxes = screen.getAllByTestId("check");

        await act(async () => {
            userEvent.click(checkboxes[0]);
        });

        await waitFor(() => {
            expect(checkboxes[0]).toBeChecked();
        });
    });

    test("handles search functionality", async () => {
        const mockGetBoards = httpModule.getBoards as jest.MockedFunction<typeof httpModule.getBoards>;
        mockGetBoards.mockResolvedValueOnce({ content: boardListData, totalPages: 2 });

        renderComponent();

        const searchInput = screen.getByPlaceholderText("Search");
        await act(async () => {
            userEvent.type(searchInput, "React test 01");
        });

        await waitFor(() => expect(searchInput).toHaveValue("React test 01"));
        fireEvent.submit(screen.getByText("Search"));

        await waitFor(() => {
            expect(mockGetBoards).toHaveBeenCalledWith(
                expect.objectContaining({
                    page: 0,
                    size: 15,
                    searchOption: "title",
                    searchTerm: "React test 01",
                    fromDate: null,
                    toDate: null,
                })
            );
        });
    });

    test("handles pagination", async () => {
        // Mock the getBoards function to return paginated data
        const mockGetBoards = httpModule.getBoards as jest.MockedFunction<typeof httpModule.getBoards>;
        mockGetBoards.mockResolvedValueOnce({ content: boardListData.slice(0, 5), totalPages: 3 });
        mockGetBoards.mockResolvedValueOnce({ content: boardListData.slice(5, 10), totalPages: 3 });

        renderComponent();

        // Wait for the list to be rendered
        await waitFor(() => expect(screen.getByText("React test 01")).toBeInTheDocument());

        // Find and click the next page button
        const nextPageButton = screen.getByText("Next");
        await act(async () => {
            userEvent.click(nextPageButton);
        });

        // Assert getBoards has been called with the new page
        await waitFor(() => {
            expect(mockGetBoards).toHaveBeenCalledTimes(2);
            expect(mockGetBoards).toHaveBeenCalledWith(expect.objectContaining({ page: 1 }));
        });

        // Assert the new data is displayed
        expect(screen.getByText("React test 06")).toBeInTheDocument();
    });
});
