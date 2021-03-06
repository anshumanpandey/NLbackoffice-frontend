import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import Users from "../users/Users.page";
import DocsPage from "./docs/DocsPage";
import { LayoutSplashScreen } from "../../../_metronic";
import { connect } from "react-redux";
import BookingsPage from "../bookings/Bookings.page";
import ScheduledNotification from "../scheduledNotification/ScheduledNotification.page";
import PostsPage from "../posts/Posts.page";
import ReviewsPage from "../reviews/Reviews.page";

const GoogleMaterialPage = lazy(() =>
  import("./google-material/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./react-bootstrap/ReactBootstrapPage")
);

function HomePage(props) {
  // useEffect(() => {
  //   console.log('Home page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect
  
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/builder" component={Builder} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users/:id?" component={Users} />
        <Route path="/bookings" component={BookingsPage} />
        <Route path="/scheduledNotification" component={ScheduledNotification} />
        <Route path="/posts" component={PostsPage} />
        <Route path="/reviews" component={ReviewsPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/docs" component={DocsPage} />
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}

const mapStateToProps = ({ auth: { user } }) => ({
  user
});

export default connect(mapStateToProps)(HomePage);
