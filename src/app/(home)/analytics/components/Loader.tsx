export default function Loader() {
  return (
    <div className="flex justify-center items-center h-48">
      <div className="flex space-x-2 animate-pulse">
        <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></span>
        <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></span>
        <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  );
}