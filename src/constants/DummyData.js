import { ApplicationMenu, BrandMenu, BucketMenu, CampaignMenu, CreatorMenu, DashboardMenu, KycMenu, MasterMenu, PaymentsMenu } from "../svg";

export const Sidermenu = [
  {
    id: 1,
    menuId: 1,
    menulist: 'Dashboard',
    menuicon: <DashboardMenu />,
    menupath: '/dashboard',
    submenu: false,
  },
  {
    id: 2,
    menuId: 2,
    menulist: 'Campaigns',
    menuicon: <CampaignMenu />,
    menupath: '/campaigns',
    submenu: true,
    submenulist: [
      // { id: 11, matchpath:'/campaigns' , menuId: 14, name: 'View Applications ', icon: <ApplicationMenu />, submenupath: '/campaign-applications', },
      { id: 11, matchpath: '/campaigns', menuId: 4, name: 'View Applications', icon: <ApplicationMenu />, submenupath: '/view-applications', },
    ]
  },
  {
    id: 3,
    menuId: 7,
    menulist: 'Brands',
    menuicon: <BrandMenu />,
    menupath: '/brands',
    submenu: false,
  },
  {
    id: 4,
    menuId: 8,
    menulist: 'Creators',
    menuicon: <CreatorMenu />,
    menupath: '/creator',
    submenu: false,
  },
  {
    id: 5,
    menuId: 9,
    menulist: 'KYCs',
    menuicon: <KycMenu svgFill="#ffffff" />,
    menupath: '/kyc',
    submenu: false,
  },
  {
    id: 7,
    menuId: 10,
    menulist: 'Payments',
    menuicon: <PaymentsMenu />,
    menupath: '/payments',
    submenu: false,
    submenulist: [
      // { id: 1, menuId: 3, name: 'Master Transaction', icon: <MasterMenu />, submenupath: '/mastertransactionlist', },
      // { id: 11, matchpath: '/payments', menuId: 4, name: 'Bucket Transaction', icon: <BucketMenu />, submenupath: '/backet-list', },
    ]
  },
  { id: 8, menuId: 11, menulist: 'Master Transaction', menuicon: <MasterMenu />, menupath: '/mastertransactionlist', submenu: false },
  { id: 9, menuId: 12, menulist: 'Bucket Transaction', menuicon: <BucketMenu />, menupath: '/backet-list', submenu: false },
  {
    id: 6,
    menuId: 10,
    menulist: 'Hyper Local',
    menuicon: <CampaignMenu />,
    menupath: '/hyperlocal',
    submenu: false,
    // submenulist: [
    //   { menuId: 3, name: 'Applications 1', icon: <ApplicationMenu />, submenupath: '', }
    // ]
  },
]