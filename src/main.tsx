import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SWRConfig } from "swr";
import axios from "axios";
import HomePage from "./pages";
import api from "./lib/axios"; 
import { Notifications } from "@mantine/notifications";
import BooksPage from "./pages/books";
import OrderPage from "./pages/ordering-page";
import BookByIdPage from "./pages/book-by-id";
import BookEditById from "./pages/book-edit-by-id";
import { ModalsProvider } from "@mantine/modals";
import BookCreatePage from "./pages/book-create";
import Staff_OrderPage from "./pages/staff-ordering";
import Order_Detail from "./pages/order-detail";

const theme = createTheme({
  primaryColor: "orange",
  fontFamily: '"Noto Sans Thai Looped", sans-serif',
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/books",
    element: <BooksPage />,
  },
  {
    path: "/books/create",
    element: <BookCreatePage />,
  },
  {
    path: "/books/:bookId",
    element: <BookByIdPage />,
  },
  {
    path: "/books/:bookId/edit",
    element: <BookEditById />,
  },
  {
    path: "/ordering-page",
    element: <OrderPage />,
  },
  {
    path: "/staff-ordering",
    element: <Staff_OrderPage />,
  },
  {
    path: "/orders/:orderId",
    element: <Order_Detail />,
  },
]);

if (import.meta.env.VITE_API_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
}
// if (import.meta.env.VITE_API_SECRET) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${import.meta.env.VITE_API_SECRET}`;
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (url: string) => api.get(url).then((res) => res.data),
      }}
    >
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </SWRConfig>
  </React.StrictMode>
);
