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
import Test from "./Test"

// function getDefaultRouteForRole(role) {
//   switch (role) {
//     case "admin":
//       return "/admin"
//     case "voter":
//       return "/voter"
//     case "elecom":
//       return "/elecom"
//   }
// }

function App() {
  const { isAuthenticated, user } = useAuthStore()
  const role = user?.role

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/admin",
      // element: isAuthenticated && role === "admin" ? <AdminLayout /> : <Navigate to="/login" />
      element: isAuthenticated ? <AdminLayout /> : <Navigate to="/login" />,
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
      // element: isAuthenticated && role === "elecom" ? <ElecomLayout /> : <Navigate to="/login" />,
      element: isAuthenticated ? <ElecomLayout /> : <Navigate to="/login" />,
      children: [
        {
          index: true,
          element: <Elecom />
        }
      ]
    },
    {
      path: "/voter",
      element: isAuthenticated && role === "voter" ? <VotersLayout /> : <Navigate to="/login" />,
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
          element: <VoterProfile />
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
      <RouterProvider router={router} />
    </>
  )
}

export default App
