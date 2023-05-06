import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" component={<BaseLayout />}>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/project/:id" element={<Project />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
