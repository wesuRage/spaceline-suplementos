export default function Spinner() {
  return (
    <div className="h-[500px] flex justify-center items-center">
      <div
        className="spinner-border animate-spin block w-14 h-14 border-4 border-t-main-green rounded-full"
        role="status"
      />
    </div>
  );
}
