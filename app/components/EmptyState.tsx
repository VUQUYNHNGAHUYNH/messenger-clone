const EmptyState = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-slate-200">
      <div className="flex flex-col items-center text-center ">
        <h3 className="mt-2 text-2xl font-semibold ">
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
