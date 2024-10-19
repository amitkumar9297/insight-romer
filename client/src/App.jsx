import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/home/Home";
import BlogDetail from "./pages/blogDetail/BlogDetail";
import { Provider } from "react-redux";
import store from "./store/store";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/profile/Profile";
import EditPost from "./pages/EditPost";
import About from "./pages/About";
import Services from "./pages/Services";
import News from "./pages/discover/News";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/updatePost/:id" element={<EditPost />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/news" element={<News />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
