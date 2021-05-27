import { RouteProps } from "./route";
import ProductsView from "../pages/product/productsView";
import Welcome from "../pages/welcome/welcome";
import AppHome from "../pages/public/appHome";
import SignUp from "../pages/signup/signup";
import Login from "../pages/login/login";
import ProducersView from "../pages/producer/producersView";
import UsersView from "../pages/user/usersView";
import Profile from "../pages/profile/profile";
import CreateProduct from "../pages/product/createProduct";
import AdvancedSearch from "../pages/product/advancedSearch";
import ProductDetails from "../pages/product/productDetails";
import ProducerDetails from "../pages/producer/producerDetails";
import AppLayout from "../pages/layout/authorized/appLayout";
import PublicLayout from "../pages/layout/unauthorized/publicLayout";

export const routes: Array<RouteProps> = [
  {
    exact: true,
    path: "/",
    Component: AppHome,
    isPrivate: false,
    Layout: PublicLayout,
  },
  {
    exact: true,
    path: "/signup",
    Component: SignUp,
    isPrivate: false,
    Layout: PublicLayout,
  },
  {
    exact: true,
    path: "/Login",
    Component: Login,
    isPrivate: false,
    Layout: PublicLayout,
  },
  {
    exact: true,
    path: "/welcome",
    Component: Welcome,
    isPrivate: true,
    Layout: AppLayout,
  },
  {
    exact: true,
    path: "/profile",
    Component: Profile,
    isPrivate: true,
    Layout: AppLayout,
  },
  {
    exact: true,
    path: "/products/list",
    Component: ProductsView,
    isPrivate: true,
    Layout: AppLayout,
  },
  {
    exact: true,
    path: "/products/view/:productId",
    Component: ProductDetails,
    isPrivate: true,
    Layout: AppLayout,
  },
  {
    exact: true,
    path: "/search",
    Component: AdvancedSearch,
    isPrivate: true,
    Layout: AppLayout,
  },
  {
    exact: true,
    path: "/products/create",
    Component: CreateProduct,
    isPrivate: true,
    Layout: AppLayout,
  },
  {
    exact: true,
    path: "/producers",
    Component: ProducersView,
    isPrivate: true,
    Layout: AppLayout,
  },
  {
    exact: true,
    path: "/producers/view/:producerId",
    Component: ProducerDetails,
    isPrivate: true,
    Layout: AppLayout,
  },
  {
    exact: true,
    path: "/users",
    Component: UsersView,
    isPrivate: true,
    Layout: AppLayout,
  },
];
