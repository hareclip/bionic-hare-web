export default function Layout({ children }) {
  return (
    <div>
      <div className="md:container md:mx-auto p-5">
        {children}
      </div>
      <div className="w-100 bg-red-500 text-white p-3">
        <p>Footer</p>
      </div>
    </div>
  );
}