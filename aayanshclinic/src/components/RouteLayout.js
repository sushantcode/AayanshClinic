import Navbar from "./Navbar";
import AdminNavbar from "../admin/AdminNavbar"
import { Route } from "react-router-dom";
import Footer from "./Footer";

// wrapper component
const RouteLayout = (props)=> {
    const { component: RoutedComponent, path, layout, ...rest } = props;

    // render actual Route from react-router
    const renderingComponent = (
      <Route
        {...rest}
        render={props => (
           <RoutedComponent {...props} />
        )}
      />
    );
  
    // depends on the layout, you can wrap Route component in different layouts
    switch (layout) {
      case "Nav": {
        return (
          <>
              <Navbar />
              {renderingComponent}
              <Footer />
          </>
        )
      }
      case "": {
        if (path === "/admin") {
            return (
                <>
                    {renderingComponent}
                    <Footer />
                </>
            )
        }
        else {
            return (
                <>
                    <AdminNavbar />
                    {renderingComponent}
                    <Footer />
                </>
            )
        }
      }
      default: {
        return (
            <>
                <Navbar />
                {renderingComponent}
                <Footer />
            </>
        )
      }
    }
  };

  export default RouteLayout;