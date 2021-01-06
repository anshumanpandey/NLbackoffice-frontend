import React, { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import { DatePicker } from "@material-ui/pickers";
import OrderStatisticsChart from "../../widgets/OrderStatisticsChart";
import LatestUpdates from "../../widgets/LatestUpdates";
import useAxios from 'axios-hooks'
import { metronic } from "../../../_metronic";
import QuickStatsChart from "../../widgets/QuickStatsChart";
import { CircularProgress } from "@material-ui/core";

export default function Dashboard() {
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="row row-full-height">
            <Portlet fluidHeight={true}>
              <PortletBody>
                <h1 style={{ textAlign: 'center'}}>Welcome to NextLevel back office</h1>
              </PortletBody>
            </Portlet>
          </div>
        </div>
      </div>

    </>
  );
}
