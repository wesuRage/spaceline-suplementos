export default function ItemsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl w-full bg-black p-2 m-4">
      <div className="flex flex-wrap flex-1-[200px]">{children}</div>
    </div>
  );
}
