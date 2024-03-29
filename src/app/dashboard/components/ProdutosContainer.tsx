interface ProdutosContainerProps {
  children: React.ReactNode;
}

export default function ProdutosContainer({
  children,
}: ProdutosContainerProps) {
  return (
    <div className="w-full border-2 border-[#333] my-5 p-5 max-h-[300px] overflow-y-scroll overflow-x-hidden">
      {children}
    </div>
  );
}
