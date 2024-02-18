import { useBreadCrumb } from "@/context/BreadCrumbContext";
import { ChevronRightIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const DynamicUserBreadcrumb = ({ match }: { match: any }) => {
  const { breadCrumb } = useBreadCrumb()
  if (!breadCrumb) return
  return (
    <span className="font-medium">{breadCrumb?.length > 40 ? `${breadCrumb.split(' ').slice(0, 6).join(' ')}...` : breadCrumb}</span>
  )
};

const routes = [
  { path: "/", breadcrumb: "Home" },
  { path: "/users", breadcrumb: "Users" },
  { path: "/services/:id", breadcrumb: DynamicUserBreadcrumb },
  { path: "/blogs/:id", breadcrumb: DynamicUserBreadcrumb },
  { path: "/gallery/:id", breadcrumb: DynamicUserBreadcrumb },
];

export default function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className="flex items-center">
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <NavLink key={match.pathname} to={match.pathname} className="flex items-center">
          {breadcrumb} {breadcrumbs.length - 1 !== index && <span><ChevronRightIcon size={20} color="#444" /></span>}
        </NavLink>
      ))}
    </div>
  );
};