import { Link } from "react-router-dom";

export function Flow() {
    return (
        <>
            <Link to={"/flow-builder"} className="font-medium text-sm items-center text-gray-900 flex transition-all duration-200 group cursor-pointer">
                <span>Builder</span>
            </Link>
        </>
    )
}