export default function ItemsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap justify-around flex-1-[200px] w-full max-w-[1250px] bg-black p-2 md:m-4 sm:my-4 md:border-2 sm:border-y-2 border-[#333] md:rounded-3xl ">
      {children}
    </div>
  );
}
