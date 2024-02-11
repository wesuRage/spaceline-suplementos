interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="flex justify-center w-full max-w-[1250px] p-5 md:m-4 sm:my-4">
      {children}
    </div>
  );
}
