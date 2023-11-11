import { FC, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AuthLayout as LandingLayout, System as SystemLayout } from "../../layouts";
import {
  Categories,
  Category,
  Dashboard,
  NotFound,
  Place,
  PlaceCreate,
  Places,
  Profile,
  Request,
  Requests,
  SignIn,
  Staff,
  User,
  Users,
} from "../../pages";
import { withCheckAuthorization, withCheckRole } from "../../hocs";
import { useApi, useAuthorization } from "../../hooks";

interface IProps {}

export const Router: FC<IProps> = (): JSX.Element => {
  const api = useApi();
  const { isAuthorized, setUser } = useAuthorization();

  useEffect(() => {
    if (isAuthorized) {
      api.account.get({}).then((user) => setUser(user));
    }
  }, []);

  const PageDashboardWithCheckAuthorization = withCheckAuthorization(Dashboard);
  const PageUsersWithCheckAuthorization = withCheckAuthorization(Users);
  const PageUserWithCheckAuthorization = withCheckAuthorization(User);
  const PagePlacesWithCheckAuthorization = withCheckAuthorization(Places);
  const PagePlaceWithCheckAuthorization = withCheckAuthorization(Place);
  const PagePlaceCreateWithCheckAuthorization = withCheckAuthorization(PlaceCreate);
  const PageCategoryWithCheckAuthorization = withCheckAuthorization(Category);
  const PageCategoriesWithCheckAuthorization = withCheckAuthorization(Categories);
  const PageRequestWithCheckAuthorization = withCheckAuthorization(Request);
  const PageRequestsWithCheckAuthorization = withCheckAuthorization(Requests);
  const PageProfileWithCheckAuthorization = withCheckAuthorization(Profile);
  const PageStaffWithCheckAuthorization = withCheckAuthorization(withCheckRole(Staff, "SuperAdmin"));

  return (
    <HashRouter>
      {isAuthorized ? <SystemLayout>
          <Routes>
            <Route path="/" element={<PageDashboardWithCheckAuthorization />} />
            <Route path="/users" element={<PageUsersWithCheckAuthorization />} />
            <Route path="/user/:userId" element={<PageUserWithCheckAuthorization />} />
            <Route path="/place/all" element={<PagePlacesWithCheckAuthorization/>} />
            <Route path="/place/:placeId" element={<PagePlaceWithCheckAuthorization/>} />
            <Route path="/place/create" element={<PagePlaceCreateWithCheckAuthorization/>} />
            <Route path="/categories" element={<PageCategoriesWithCheckAuthorization/>} />
            <Route path="/category/:categoryId" element={<PageCategoryWithCheckAuthorization/>} />
            <Route path="/requests" element={<PageRequestsWithCheckAuthorization/>} />
            <Route path="/request/:requestId" element={<PageRequestWithCheckAuthorization/>} />
            <Route path="/profile" element={<PageProfileWithCheckAuthorization />} />
            <Route path="/staff" element={<PageStaffWithCheckAuthorization />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SystemLayout>
        :
        <LandingLayout>
          <Routes>
            <Route path="/" element={<PageDashboardWithCheckAuthorization />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LandingLayout>
      }
    </HashRouter>
  );
};
