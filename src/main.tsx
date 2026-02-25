import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/toaster.tsx'
import { UserProvider } from './providers/UserProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <UserProvider>
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
    <App />
    <Toaster />
    </ChakraProvider>
  </StrictMode>
  </UserProvider>
  </BrowserRouter>
)
