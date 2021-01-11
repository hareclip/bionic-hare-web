export default function Layout({ children }) {
  return (
    <div>
      <div className="w-100 bg-red-500 text-white p-3">
        <p>Navbar</p>
      </div>
      <div className="md:container md:mx-auto">
        {children}
      </div>
    </div>
  );
}