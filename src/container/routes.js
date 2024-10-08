import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const PageLayout = lazy(() => import("../pages/Layout"));
const SignIn = lazy(() => import("../pages/SignIn"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const DashboardOverview = lazy(() => import("../pages/Dashboard/DashboardOverview"));
const SelectLocations = lazy(() => import("../pages/Dashboard/SelectLocations"));
const Campaigns = lazy(() => import("../pages/Campaigns"));
const EditCampaign = lazy(() => import("../pages/Campaigns/EditCampaign"));
const ViewCampaign = lazy(() => import("../pages/Campaigns/ViewCampaign"));
const CampaignApplication = lazy(() => import("../pages/Campaigns/CampaignApplication"));
const ApplicationStatus = lazy(() => import("../pages/Campaigns/ApplicationStatus"));
const Brand = lazy(() => import("../pages/Brand"));
const ViewBrand = lazy(() => import("../pages/Brand/ViewBrand"));
const EditBrand = lazy(() => import("../pages/Brand/EditBrand"));
const Creator = lazy(() => import("../pages/Creator"));
const AddCreator = lazy(() => import("../pages/Creator/AddCreator"));
const ViewCreator = lazy(() => import("../pages/Creator/ViewCreator"));
const Kyc = lazy(() => import("../pages/Kyc"));
const ViewKyc = lazy(() => import("../pages/Kyc/ViewKyc"));
const Payments = lazy(() => import("../pages/Payments"));
const Mastertransactionlist = lazy(() => import("../pages/Payments/Mastertransactionlist"));
const PaymentsStatus = lazy(() => import("../pages/Payments/PaymentsStatus"));
const PaymentsRejectionReason = lazy(() => import("../pages/Payments/PaymentsRejectionReason"));
const BacketList = lazy(() => import("../pages/Payments/BacketList"))
const BacketDetails = lazy(() => import("../pages/Payments/BacketDetails"))
const Sidebar = lazy(() => import("../components/layout/Sidebar"));
const SelectCreatorsBy = lazy(() => import("../pages/Campaigns/SelectCreatorsBy"));
const SelectCreatorsLocation = lazy(() => import("../pages/Campaigns/SelectCreatorsLocation"));

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path ='/' element={<Navigate replace to='/signin' />} />
      {/* <Route path="/" element={<Navigate replace to="/dashboard" />}></Route> */}
        <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path="/" element={<PageLayout />}>
          <Route path='/' element={<Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/dashboard-overview" element={<PrivateRoute><DashboardOverview /></PrivateRoute>} />
          <Route path="/select-locations" element={<PrivateRoute><SelectLocations /></PrivateRoute>} />
          <Route path="/campaigns" element={<PrivateRoute><Campaigns /></PrivateRoute>} />
          <Route path="/view-applications" element={<PrivateRoute><Campaigns /></PrivateRoute>} />
          <Route path="/add-campaign" element={<PrivateRoute><EditCampaign /></PrivateRoute>} />
          <Route path="/view-campaign/:campaignId" element={<PrivateRoute><ViewCampaign /></PrivateRoute>} />
          {/* <Route path="/view-campaign" element={<ViewCampaign />} /> */}
          <Route path="/edit-campaign/:campaignId" element={<PrivateRoute><EditCampaign /></PrivateRoute>} />
          <Route path="/campaign-application/:campaignId" element={<PrivateRoute><CampaignApplication /></PrivateRoute>} />
          <Route path="/application-status/:id/:creatorId" element={<PrivateRoute><ApplicationStatus /></PrivateRoute>} />
          <Route path="/brands" element={<PrivateRoute><Brand /></PrivateRoute>} />
          <Route path="/select-creators-by" element={<PrivateRoute><SelectCreatorsBy /></PrivateRoute>} />
          <Route path="/select-creators-location" element={<PrivateRoute><SelectCreatorsLocation /></PrivateRoute>} />
          <Route path="/view-brand/:brandId" element={<PrivateRoute><ViewBrand /></PrivateRoute>} />
          <Route path="/add-brand" element={<PrivateRoute><EditBrand /></PrivateRoute>} />
          <Route path="/edit-brand/:brandId" element={<PrivateRoute><EditBrand /></PrivateRoute>} />
          <Route path="/creator" element={<PrivateRoute><Creator /></PrivateRoute>} />
          <Route path="/add-creator" element={<PrivateRoute><AddCreator /></PrivateRoute>} />
          <Route path="/view-creator/:creatorId" element={<PrivateRoute><ViewCreator /></PrivateRoute>} />
          <Route path="/kyc" element={<PrivateRoute><Kyc /></PrivateRoute>} />
          <Route path="/view-kyc/:kycId" element={<PrivateRoute><ViewKyc /></PrivateRoute>} />
          <Route path="/payments" element={<PrivateRoute><Payments /></PrivateRoute>} />
          <Route path="/mastertransactionlist" element={<PrivateRoute><Mastertransactionlist /></PrivateRoute>} />
          <Route path="/payments-approved/:payment" element={<PrivateRoute><PaymentsStatus /></PrivateRoute>} />
          <Route path="/payments-rejection-reason/:rejectId" element={<PrivateRoute><PaymentsRejectionReason /></PrivateRoute>} />
          <Route path="/backet-list" element={<PrivateRoute><BacketList/></PrivateRoute>} />
          <Route path="/backet-details/:backetId/:campaignId" element={<PrivateRoute><BacketDetails/></PrivateRoute>} />
          <Route path="/hyperlocal" element={<PrivateRoute><Campaigns /></PrivateRoute>} />
          <Route path="/view-hyper/:campaignId" element={<PrivateRoute><ViewCampaign/></PrivateRoute>}/>
          <Route path="/hyper-applications/:creatorId" element={<PrivateRoute><AddCreator/></PrivateRoute>}/>
          <Route path="/campaign-applications/:creatorId" element={<PrivateRoute><AddCreator /></PrivateRoute>} />
          <Route path="/application-status/:id/:creatorId" element={<PrivateRoute><ApplicationStatus /></PrivateRoute>} />
          <Route path="/hyper-local-campaign" element={<PrivateRoute><EditCampaign /></PrivateRoute>} />

          <Route path="/sidebar" element={<PrivateRoute><Sidebar/></PrivateRoute>}/>
        </Route>
        <Route path="*" element={<Navigate replace to="/" />}></Route>
      </Routes>
      
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Routing;
