import React from "react";
import { BarChart3, FileText, TrendingUp, FolderOpen } from "lucide-react";

const icons = {
  blue: BarChart3,
  yellow: FileText,
  green: TrendingUp,
  purple: FolderOpen,
};

const StatsCard = ({ title, value, color }) => {
  const Icon = icons[color] || BarChart3;
  const bgGradient = {
    blue: "from-blue-500 to-blue-600",
    yellow: "from-yellow-500 to-yellow-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <div
      className={`bg-gradient-to-br ${bgGradient[color]} text-white rounded-xl p-6 shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-${color}-100 text-sm`}>{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
        </div>
        <Icon className={`w-12 h-12 text-${color}-200 opacity-80`} />
      </div>
    </div>
  );
};

export default StatsCard;
