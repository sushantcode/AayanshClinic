import Navbar from "./Navbar";
import { Route, /*Redirect*/} from "react-router-dom";
import Footer from "./Footer";

// wrapper component
const RouteLayout = props => {
    const { component: RoutedComponent, layout, path, ...rest } = props;
  
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
      case 'Nav': {
        return (
          <>
              <Navbar />
              {renderingComponent}
              <Footer />
          </>
        )
      }
      case '': {
        // if (path === "/admin") {
            // return (
            //     <>
            //         <Redirect to={{
            //             pathname: "/admin-home",
            //             state: { from: props.path }
            //         }}/>
            //     </>
            // )
        // }
        // else {
            return (
                <>
                    {renderingComponent}
                    <Footer />
                </>
            )
        // }
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