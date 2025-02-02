import { authClient } from "@/lib/auth-client"; //import the auth client
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "~/components/ui/card";
import { Link } from "@tanstack/react-router";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
})

export const Route = createFileRoute("/signUp")({
  component: RouteComponent,
});

function RouteComponent() {
  const { toast } = useToast()
  const navigate = useNavigate() 

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const signUp = async (values: z.infer<typeof signUpSchema>) => {

    let email = values.email
    let password = values.password
    let name = values.name

    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          console.log("sign up success");
          navigate({ to: '/' })

        },
        onError: (ctx) => {
          toast({
            title: "Error",
            description: `${ctx?.error?.message}`,
            variant: "destructive",
          });
        },
      }
    );

    if(error){
      return;
    }

    if(data){
      console.log('logged in')
    }

  };
  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-0 pb-4">
          <CardTitle className="text-xl font-bold text-center">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Enter your details to sign up
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(signUp)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} className="h-9" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                Sign Up
              </Button>
            </form>
          </Form>
          <div className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link
              to="/signIn"
              className="underline text-primary hover:text-primary/80 text-sm"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
