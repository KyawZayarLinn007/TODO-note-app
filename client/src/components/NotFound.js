import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <>
            <div className="not_found_div">
                <img src="./404_Error.svg" alt="404_not_found" className="not_found_svg" />
                <p>Sorry the page you are looking for is not available!</p>
                <Link to="/">
                back to home page
                </Link>
            </div>
        </>
     );
}
 
export default NotFound;