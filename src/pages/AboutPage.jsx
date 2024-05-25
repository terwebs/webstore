export default function AboutPage() {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl ">
          Welcome to
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              Webstore
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        This is not a real online store, the products displayed here are not for
        sale, they are handcrafted by my aunt and cousin in Managua, Nicaragua.
      </p>
    </>
  );
}
