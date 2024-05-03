'use client'

import useAuthentication from "@/hooks/useAuthentication"
import { useRouter } from "next/navigation"


export default function Home() {
  const { logout, user } = useAuthentication();
  const router = useRouter();

  const redirectToLogin = () => {
      router.push('/auth/login');
  };

  return (
      <div>
          <h1>Esta página é a Home</h1>

          {user && (
              <div>
                  <p>Bem-vindo, {user.type}!</p>
                  <button onClick={logout}>Logout</button>
              </div>
          )}
          
          {!user && (
              <div>
                  <p>Por favor, faça login para continuar.</p>
                  <button onClick={redirectToLogin}>Ir para Login</button>
              </div>
          )}
      </div>
  )
}