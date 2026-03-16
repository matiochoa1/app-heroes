import { Outlet } from "react-router";

export const AdminLayout = () => {
  return (
    <>
      <div className="bg-blue-500 text-white">
        <Outlet />
      </div>
    </>
  );
};
