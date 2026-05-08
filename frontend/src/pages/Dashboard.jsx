import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 text-center shadow-2xl">

          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-3xl font-bold text-white mx-auto mb-5 shadow-lg shadow-cyan-500/30">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>

          {/* Logo */}
          <h2 className="text-2xl font-bold text-white mb-1">
            Guide<span className="text-cyan-400">X</span>
          </h2>

          {/* Welcome */}
          <p className="text-slate-400 text-sm mb-6">You are logged in successfully</p>

          {/* Divider */}
          <div className="border-t border-white/10 mb-6"></div>

          {/* User Info */}
          <div className="bg-white/5 rounded-xl px-5 py-4 mb-6 text-left space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-sm w-16">Name</span>
              <span className="text-white font-medium text-sm">
                {user.name || "User"}
              </span>
            </div>
            <div className="border-t border-white/10"></div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-sm w-16">Email</span>
              <span className="text-white font-medium text-sm">
                {user.email || "Not available"}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;