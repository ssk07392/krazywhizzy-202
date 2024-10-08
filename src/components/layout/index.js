import React from 'react';
import { Outlet } from 'react-router-dom';
import PageLayout from '../../pages/Layout';

// const Header = lazy(() => import('./header'))
// const Footer = lazy(() => import('./footer'))

const Layout = () => {

	return (
		<>
			{/* <Header /> */}
			<PageLayout />
			<main>
				<Outlet />
			</main>
			{/* <Footer /> */}
		</>
	)
}

export default Layout;