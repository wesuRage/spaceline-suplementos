export default function ItemsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap flex-1-[200px] w-full max-w-[1250px] bg-black p-2 m-4 border-2 border-[#333] rounded-3xl ">
      {children}
    </div>
  );
}
