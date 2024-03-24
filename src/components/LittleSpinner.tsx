export default function Spinner() {
  return (
    <div className="flex items-center ms-5">
      <div
        className="inline spinner-border animate-spin w-5 h-5 border-2 border-t-main-green rounded-full"
        role="status"
      />
    </div>
  );
}
