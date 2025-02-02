import {
  Link,
  Outlet,
  createRootRouteWithContext,
  redirect,
  useRouterState,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Meta, Scripts } from '@tanstack/start'
import * as React from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import { authClient } from "@/lib/auth-client" 
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { Avatar, AvatarFallback } from "~/components/ui/avatar"
import { Loader2 } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { data: session, isPending, error } = authClient.useSession();
  const router = useRouterState();

  return (
    <html>
      <head>
        <Meta />
      </head>
      <body className="min-h-screen flex flex-col items-center">

        {router.location.pathname === '/signIn' || router.location.pathname === '/signUp' ? 
        (
          <></>
        ) :
        (
          <header className="fixed top-0 w-full border-b">
          <div className="flex h-16 items-center justify-between p-4">
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-lg font-semibold tracking-tight"
              >
                <span className="text-primary">TanStack</span> Start
              </Link>
              <nav className="flex items-center gap-4 text-sm">
                <Link
                  to="/posts"
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    "text-foreground/60 [&.active]:text-foreground"
                  )}
                >
                  Posts
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : session ? (
                <div className="flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {session.user.email?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="outline"
                    onClick={() => authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          redirect({ to: "/" })
                        },
                      },
                    })}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button asChild variant="ghost">
                    <Link to="/signIn">
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/signUp">
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </header>
        )
        }



        <main className="container pt-20 h-full mx-auto max-w-4xl">
        {children}
        </main>

        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Toaster /> 
        <Scripts />
      </body>
    </html>
  )
}
