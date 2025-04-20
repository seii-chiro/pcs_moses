import { createBrowserRouter, Navigate, RouterProvider } from "react-router"
import Login from "./pages/Login"
import { useAuthStore } from "./stores/useAuthStore"
import AdminLayout from "./layouts/AdminLayout"
import ElecomLayout from "./layouts/ElecomLayout"
import VotersLayout from "./layouts/VotersLayout"
import Voter from "./pages/voters/Voter"
import Elecom from "./pages/elecom/Elecom"
import NotFoundPage from "./pages/NotFoundPage"
import Landing from "./pages/Landing"
import Admin from "./pages/admin/Admin"
import VotingScreen from "./pages/voters/VotingScreen"
import VoterProfile from "./pages/voters/components/VoterProfile"
import Precinct from "./pages/admin/pages/manageprecinct"
import ReviewPage from "./pages/voters/ReviewPage"
import Success from "./pages/voters/components/Success"
import VoteTracker from "./pages/voters/VoteTracker"
import Position from "./pages/admin/pages/Position"
import Profile from "./pages/admin/components/Profile"
import Candidates from "./pages/admin/components/Candidates"
import LocationSection from "./pages/admin/components/Location"
import Initialization from "./pages/elecom/pages/Initialization"
import Settings from "./pages/elecom/pages/Settings"
import Test from "./Test"
import { Toaster } from 'sonner'
import { useTokenStore } from "./stores/useTokenStore"
import { useQuery } from "@tanstack/react-query"

const getVoters = async (token) => {
  const response = await fetch('http://localhost:8000/api/voters/', {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch Voters")
  }
  const userData = await response.json();
  return userData;
}

function App() {
  const { isAuthenticated, user } = useAuthStore()
  const token = useTokenStore()?.token
  const role = user?.role

  const { data: voters, isLoading: votersLoading } = useQuery({
    queryKey: ['get-voters'],
    queryFn: () => getVoters(token)
  })

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/admin",
      element: isAuthenticated && role === 1 ? <AdminLayout /> : <Navigate to="/login" />,
      // element: isAuthenticated ? <AdminLayout /> : <Navigate to="/login" />,
      children: [
        {
          index: true,
          element: <Admin />
        },
        {
          path: 'precinct',
          element: <Precinct />,
        },
        {
          path: 'position',
          element: <Position />
        },
        {
          path: 'profile',
          element: <Profile />,
        },
        {
          path: 'candidates',
          element: <Candidates />,
        },
        {
          path: 'locations',
          element: <LocationSection />,
        },
      ]
    },
    {
      path: "/elecom",
      element: isAuthenticated && role === 2 ? <ElecomLayout /> : <Navigate to="/login" />,
      // element: isAuthenticated ? <ElecomLayout /> : <Navigate to="/login" />,
      children: [
        {
          index: true,
          element: <Elecom />
        },
        {
          path: 'initialization',
          element: <Initialization />
        },
        {
          path: 'settings',
          element: <Settings />
        }
      ]
    },
    {
      path: "/voter",
      element: isAuthenticated && [3, 4, 5, 6].includes(role) ? <VotersLayout /> : <Navigate to="/login" />,
      children: [
        {
          index: true,
          element: <Voter />
        },
        {
          path: 'vote',
          element: <VotingScreen />
        },
        {
          path: 'profile',
          element: <VoterProfile voters={voters} votersLoading={votersLoading}/>
        },
        {
          path: 'vote/review',
          element: <ReviewPage />
        },
        {
          path: 'vote/success',
          element: <Success />
        },
        {
          path: 'track',
          element: <VoteTracker />
        }
      ]
    },
    {
      path: "/",
      // element: <Navigate to={isAuthenticated ? getDefaultRouteForRole(role) : "/login"} />
      element: <Landing />
    },
    {
      path: "*",
      element: <NotFoundPage />
    },
    {
      path: "test",
      element: <Test />
    }
  ])

  return (
    <>
      <Toaster richColors position="top-right" />
      <RouterProvider router={router} />
    </>
  )
}

export default App
