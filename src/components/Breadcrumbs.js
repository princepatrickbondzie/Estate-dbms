import React from 'react';
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs();
    return (
        <div>
            <div className="breadcrumbs w-[35rem] border-2">
                {breadcrumbs.map(({ breadcrumb, match }, index) => (
                    <div className="bc" key={match.url}>
                        <Link to={match.url || ""}>{breadcrumb}</Link>
                        {index < breadcrumbs.length - 1 && ">"}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Breadcrumbs;
