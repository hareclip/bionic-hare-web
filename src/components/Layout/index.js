
/**
 * Site layout container
 * 
 * @param {*} param0 
 */
export default function Layout({ children }) {
  return (
    <div className="md:container md:mx-auto p-5 min-h-screen">
      {children}
    </div>
  );
}