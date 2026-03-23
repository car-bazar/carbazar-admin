import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-photo-view/dist/react-photo-view.css'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Toaster } from './components/ui/toaster'
import { AuthProvider } from './hooks/useAuth'
import Home from './pages/home'

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
			<Footer />
		</>
	)
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<App />
				<Toaster />
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
)
