import { NavLink, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const userNamesById = { 1: "John" };

const DynamicUserBreadcrumb = ({ match }: { match: any }) => (
    <span>{match}</span>
);

const CustomPropsBreadcrumb = ({ someProp }: { someProp: string }) => <span>{someProp}</span>;

// define custom breadcrumbs for certain routes.
// breadcrumbs can be components or strings.
const routes = [
    { path: "/", breadcrumb: "Home" },
    { path: "/users", breadcrumb: "Users" },
    { path: "/users/:userId", breadcrumb: DynamicUserBreadcrumb },
    { path: "/example", breadcrumb: "Custom Example" }
];

// map & render your breadcrumb components however you want.
export const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs(routes);
    const location = useLocation();

    // console.log(object);

    return (
        <>
            {breadcrumbs.map(({ match, breadcrumb }) => (
                <NavLink key={match.pathname} to={match.pathname}>
                    {breadcrumb} /&nbsp;
                </NavLink>
            ))}
        </>
    );
};