import { authClient } from '@/lib/auth-client' //import the auth client
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const Route = createFileRoute('/signIn')({
  component: RouteComponent,
})

function RouteComponent() {

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate() 
  const { toast } = useToast()

  const signIn = async (values: z.infer<typeof signInSchema>) => {
    let email = values.email;
    let password = values.password;
    
    const { data, error } = await authClient.signIn.email(
      { email, password },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          console.log('sign in success')
          navigate({ to: '/' })
        },
        onError: (ctx) => {
          toast({
            title: 'Error',
            description: `${ctx?.error?.message}`,
            variant: 'destructive',
          })
        },
      },
    )
    if (error) {
      return
    }

    if (data) {
      // You might need to set the session in your auth state management
      console.log('Session established:', data)
    }

  }
  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-0 pb-4">
          <CardTitle className="text-xl font-bold text-center">
            Sign In
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Enter your details to sign in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(signIn)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        type="email"
                        {...field}
                        className="h-9"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="h-9"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-9">
                Sign In
              </Button>
            </form>
          </Form>
          <div className="text-center text-sm mt-2">
            Don't have an account?{" "}
            <Link
              to="/signUp"
              className="underline text-primary hover:text-primary/80 text-sm"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
