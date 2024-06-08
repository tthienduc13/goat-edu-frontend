import { Skeleton } from "@/components/ui/skeleton";

export const SubjectLoading = () => {
  return (
    <div>
      <Skeleton className="h-9 pb-2 w-[150px]" />
      <div className="w-full grid gap-y-4 grid-cols-4">
        <div className="flex flex-col justify-center">
          <div className="w-[280px] p-4 shadow-xl rounded-2xl">
            <Skeleton className="w-full h-[150px] rounded-2xl" />
            <div className="mt-4">
              <Skeleton className="h-5 w-[60px]" />
            </div>
            <Skeleton className="mt-2 h-4" />
            <Skeleton className="mt-4 h-7" />
            <Skeleton className="h-[100px] mt-3" />
            <div className="mt-3">
              <Skeleton className="h-5 w-[60px]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="w-[280px] p-4 shadow-xl rounded-2xl">
            <Skeleton className="w-full h-[150px] rounded-2xl" />
            <div className="mt-4">
              <Skeleton className="h-5 w-[60px]" />
            </div>
            <Skeleton className="mt-2 h-4" />
            <Skeleton className="mt-4 h-7" />
            <Skeleton className="h-[100px] mt-3" />
            <div className="mt-3">
              <Skeleton className="h-5 w-[60px]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="w-[280px] p-4 shadow-xl rounded-2xl">
            <Skeleton className="w-full h-[150px] rounded-2xl" />
            <div className="mt-4">
              <Skeleton className="h-5 w-[60px]" />
            </div>
            <Skeleton className="mt-2 h-4" />
            <Skeleton className="mt-4 h-7" />
            <Skeleton className="h-[100px] mt-3" />
            <div className="mt-3">
              <Skeleton className="h-5 w-[60px]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="w-[280px] p-4 shadow-xl rounded-2xl">
            <Skeleton className="w-full h-[150px] rounded-2xl" />
            <div className="mt-4">
              <Skeleton className="h-5 w-[60px]" />
            </div>
            <Skeleton className="mt-2 h-4" />
            <Skeleton className="mt-4 h-7" />
            <Skeleton className="h-[100px] mt-3" />
            <div className="mt-3">
              <Skeleton className="h-5 w-[60px]" />
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="">
    //   <Skeleton className="h-9 mb-4 w-40" />
    //   <div className="grid grid-cols-3 ">
    //     <div className="flex flex-col  mb-8 mr-4">
    //       <Skeleton className="w-[350px] h-[171px]" />
    //       <Skeleton className="h-7 my-3" />
    //     </div>
    //     <div className="flex flex-col  mb-8 mr-4">
    //       <Skeleton className="w-[350px] h-[171px]" />
    //       <Skeleton className="h-7 my-3" />
    //     </div>
    //     <div className="flex flex-col  mb-8 mr-4">
    //       <Skeleton className="w-[350px] h-[171px]" />
    //       <Skeleton className="h-7 my-3" />
    //     </div>
    //   </div>
    // </div>
  );
};
