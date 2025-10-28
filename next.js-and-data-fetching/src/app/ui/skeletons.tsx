import "./skeletons.css";

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function JobItemSkeleton() {
  return (
    <li className="default-colors p-4 border border-gray-300 rounded-lg shadow-md">
      <div className="w-full text-xl font-semibold mb-2 h-5 w-5 rounded-md blurred-text" />
      <div className="w-full mb-4 h-7 w-20 rounded-md blurred-text" />
      <div className="w-full h-7 w-20 rounded-md blurred-text" />
    </li>
  );
}

export function JobInfoSkeleton() {
  return (
    <div className="p-6 pl-0">
      <h2 className="w-20 h-7 blurred-text text-2xl font-bold mb-4"></h2>
      <p className="w-64 h-20 blurred-text mb-4"></p>
      <h3 className="w-32 h-7 blurred-text text-xl font-sem ibold mb-2"></h3>
      <ul className="list-disc list-inside">
        <li className="mt-2 w-48 h-4 blurred-text"></li>
        <li className="mt-2 w-48 h-4 blurred-text"></li>
        <li className="mt-2 w-48 h-4 blurred-text"></li>
      </ul>
    </div>
  );
}

export function JobsListSkeleton() {
  return (
    <ul className="w-full space-y-4 pt-4">
      <JobItemSkeleton />
      <JobItemSkeleton />
      <JobItemSkeleton />
      <JobItemSkeleton />
    </ul>
  );
}
