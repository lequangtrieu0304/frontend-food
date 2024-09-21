import Login from "@/auth/Login.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import { QueryClientProvider, QueryClient } from "react-query";
import React from "react";
import Signup from "@/auth/Signup.tsx";
import HereSection from "@/components/HereSection.tsx";
import MainLayout from "@/layout/MainLayout.tsx";
import Profile from "@/components/Profile.tsx";
import Search from "@/components/Search.tsx";
import Cart from "@/components/Cart.tsx";
import RestaurantDetail from "@/components/RestaurantDetail.tsx";
import {useUserStore} from "@/stores/useUserStore.ts";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <MainLayout/>
      </ProtectedRoutes>
    ),
    children: [
      {
        path: '/',
        element: <HereSection />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/search/:text',
        element: <Search />
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetail />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  }
])

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <RouterProvider router={appRouter}>
        </RouterProvider>
      </main>
    </QueryClientProvider>
  )
}

export default App
