export const PageLoading = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <div className="spinner border-t-4 border-primary rounded-full h-12 w-12 animate-spin mx-auto"></div>
      <p className="mt-4 text-primary font-semibold">Loading...</p>
    </div>
  );
};
