import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ErrorBoundary from './ErrorBoundary'

// Global error handlers to surface runtime errors in production builds
window.addEventListener('error', (ev) => {
	// eslint-disable-next-line no-console
	console.error('Global error:', ev.error || ev.message || ev);
});

window.addEventListener('unhandledrejection', (ev) => {
	// eslint-disable-next-line no-console
	console.error('Unhandled rejection:', ev.reason || ev);
});

createRoot(document.getElementById("root")!).render(
	<ErrorBoundary>
		<App />
	</ErrorBoundary>
);
