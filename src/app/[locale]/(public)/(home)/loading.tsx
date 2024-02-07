import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="container mx-auto flex flex-col gap-y-unit-10">
      <Skeleton />
    </div>
  );
};

export default Loading;
