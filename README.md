# Tanstack Start Template with Drizzle and Better Auth

I wanted to throw together a small template for tanstack start to scaffold up projects quicker. The template includes:

- Tanstack Start
- Tailwind
- [Shadcn](https://ui.shadcn.com/docs)
- [Drizzle](https://orm.drizzle.team/docs/get-started)
- [Better Auth](https://www.better-auth.com/docs/introduction)

## Clone the repo

You can run the below command to better pull down the repo and get started:

```
npx degit https://github.com/ChrisRoach1/Tanstack-Template start-basic
```


## Run the project

First run: 
```
npm install
```

To get up and running you'll need to create a .env file using the example file provided.
Fill out the variables to get started.

Once you have your database connection up and running we'll want to run the following command to migrate our auth tables:

```
npx drizzle-kit push
```

You can refer to the docs above if you need a better migration strategy.


Last run:

```
npm run dev
```

and that should be all you need to get up and running!






















# Welcome to TanStack.com!

This site is built with TanStack Router!

- [TanStack Router Docs](https://tanstack.com/router)

It's deployed automagically with Netlify!

- [Netlify](https://netlify.com/)

## Development

From your terminal:

```sh
pnpm install
pnpm dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Editing and previewing the docs of TanStack projects locally

The documentations for all TanStack projects except for `React Charts` are hosted on [https://tanstack.com](https://tanstack.com), powered by this TanStack Router app.
In production, the markdown doc pages are fetched from the GitHub repos of the projects, but in development they are read from the local file system.

Follow these steps if you want to edit the doc pages of a project (in these steps we'll assume it's [`TanStack/form`](https://github.com/tanstack/form)) and preview them locally :

1. Create a new directory called `tanstack`.

```sh
mkdir tanstack
```

2. Enter the directory and clone this repo and the repo of the project there.

```sh
cd tanstack
git clone git@github.com:TanStack/tanstack.com.git
git clone git@github.com:TanStack/form.git
```

> [!NOTE]
> Your `tanstack` directory should look like this:
>
> ```
> tanstack/
>    |
>    +-- form/
>    |
>    +-- tanstack.com/
> ```

> [!WARNING]
> Make sure the name of the directory in your local file system matches the name of the project's repo. For example, `tanstack/form` must be cloned into `form` (this is the default) instead of `some-other-name`, because that way, the doc pages won't be found.

3. Enter the `tanstack/tanstack.com` directory, install the dependencies and run the app in dev mode:

```sh
cd tanstack.com
pnpm i
# The app will run on https://localhost:3000 by default
pnpm dev
```

4. Now you can visit http://localhost:3000/form/latest/docs/overview in the browser and see the changes you make in `tanstack/form/docs`.

> [!NOTE]
> The updated pages need to be manually reloaded in the browser.

> [!WARNING]
> You will need to update the `docs/config.json` file (in the project's repo) if you add a new doc page!
