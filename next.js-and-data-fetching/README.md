# Next.js & Data Fetching

## Job application

You will create a job search website.

## General Rules

- Put all components in the `ui` folder.
- Put all the actions and fetching functions in the `lib` folder.
- Don't forget to commit all your changes before submitting your solution.
- You can find all the "skeleton" components in the file `ui/skeletons.tsx`.

### Home Page

1. Create a `page.tsx` file for the home page.
2. This page consists of basic information about this website:

```tsx
<section className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
  <h1 className="text-4xl text-center font-bold mb-4">
    Welcome to Job Search Website
  </h1>
  <p className="text-lg mb-8">Find your dream job here!</p>
  {/* Here you put a <Link> */}
</section>
```

A `layout.tsx` file has been created for you; you just need to provide `page.tsx` with the correct content.

3. Under the paragraph with text `"Find your dream job here!"`, add a `next/link` link component to get to the job search page. This link should lead to the `/job` page.

```tsx
<Link
  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
  href="/job"
>
  Go to Job Search Page
</Link>
```

## Job Search Page

1. Create a `/job` route with the `layout.tsx` and `page.tsx` files.
   `layout.tsx` content:

```tsx
<div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
  <div className="w-full flex-none md:w-64">
    <SideNav />
  </div>

  <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
</div>
```

The `<SideNav>` component already exists in the `ui/job-search` folder.

2. Add a heading to the page `Job Search for All`.
3. `<JobSearch />` component. Create a client component called `JobSearch`: `src/ui/job/job-search.tsx`. This component will be used to search for a specific job.

   - Add it to the page after the heading.
   - This component must include a `label` linked to `input` by the `htmlFor` and `id` attributes. This linking will be checked in tests.
   - The search query must be synced with page search params (please refer to the `useSearchParams`, `usePathname`, and `useRouter` hooks). When a search query changes, the search params of the page should change as well. All this logic must be implemented inside the `<JobSearch />` component.
   - The name of a query param in the page URL for a search term should be `query`.

4. `<JobsList />` component. Create a server component called `JobsList`: `src/ui/job/jobs-list.tsx`.
   - It must be a Server Component.
   - It must load and show a job list. In the `lib/data.ts`, a function called `fetchJobsList` has been prepared for you. Please use it to load data.
   - When fetching a job list, you must stream a fallback component instead of `JobsList`. The fallback component `<JobsListSkeleton />`, which you can find in `ui/skeletons.tsx` file, has been prepared for you.
   - This component should reflect changes to the search and show jobs that fit the search query. The search query must be passed as a parameter for the `fetchJobsList` function.
   - Each job item in the list must have:
     - A heading with the name of a job
     - A paragraph with a short description
     - A `<Link>` to the Job Details page: `/job/:[jobId]`. For instance, for a job with the id `x45-wtt-2334`, the path should be `/job/x45-wtt-2334`.

## Job Details Page

1. Create a dynamic route `job/[id]` with a `page.tsx` file.

2. This page should consist of:

   - A heading with a `"Job Details"` text
   - A `<JobInfo />` component. The job `id` should be taken from the page params, and passed inside a `<JobInfo />` component.

3. `<JobInfo />` component. Create a server component called `JobInfo`. This component shows a heading, the long job description, and the requirements for the job.
   - It must be a Server Component.
   - It must take a job `id` as prop.
   - It must load and show a job list. In `lib/data.ts`, a function called `fetchJobInfo` has been prepared for you. Please use it to load data.
   - When fetching a job list, you must stream a fallback component instead of `JobInfo`. The fallback component `<JobInfoSkeleton />`, which you can find in the file `ui/skeletons.tsx`, has been prepared for you.
   - This component must show:
     - A heading with a job title
     - A paragraph with a long job description
     - A list (`<ul>`) of the job requirements
   - If job with this `[id]` doesn't exist you should show a `not-found` page.

## Create a Job Page

1. Create a `job/create` route with the `layout.tsx` and `page.tsx` files.

2. It should consist of a heading with the following text: `"Here you can create a job listing."`

3. It should have a form for creating a job.

   - The form should be a Server Component.
   - Required form fields: `Job Title`, `Short Description`, `Requirements`.
   - Each field should include a `label` linked to `input` by the `htmlFor` and `id` attributes. This linking will be checked in tests. Please use text above for labels text.
   - Each `input/textarea` field should have a `name` attribute: `jobTitle`, `shortDescription`, `requirements`.
   - You should use the existing form action `createJobPosition` from `src/app/lib/actions.ts`.
   - A form should have a submit button.
   - If an error occurs when creating a job, the user should see an error page. Please create an `error.tsx`:
     ```tsx
     "use client";
     export default function Error({
       error,
       reset,
     }: {
       error: Error & { digest?: string };
       reset: () => void;
     }) {
       return (
         <main className="flex h-full flex-col items-center justify-center">
           <h2 className="text-center">{error.message}</h2>
           <button
             className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
             onClick={
               // Attempt to recover by trying to re-render the invoices route
               () => reset()
             }
           >
             Try again
           </button>
         </main>
       );
     }
     ```

## Where to put your code

The foundation of your `React/Next` application has already been prepared. This means that all the required dependencies have been added and everything is already set up, so you don't need to start the `React/Next` project  yourself.
 
To run the application in development mode, just run it in the terminal (`command line, Bash, Git Bash`):

```bash
npm start
```

This starts the application and updates it when you change something. See [Local Development](./docs/LOCAL_DEVELOPMENT_REACT_NEXT.md) for more information.

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).
