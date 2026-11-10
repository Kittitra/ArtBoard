import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";


const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="app-container">
          <Navbar />
          <main className="flex flex-row w-full h-screen">
            <Sidebar />
            {children}
          </main> 
    </div>
  );
};

export default Layout;