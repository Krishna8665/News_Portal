import React from "react";
import StatsCard from "../components/StatsCard";

const Dashboard = () => {
  const stats = { totalNews: 45, drafts: 12, published: 33, categories: 8 };
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total News" value={stats.totalNews} color="blue" />
        <StatsCard title="Drafts" value={stats.drafts} color="yellow" />
        <StatsCard title="Published" value={stats.published} color="green" />
        <StatsCard title="Categories" value={stats.categories} color="purple" />
      </div>
    </div>
  );
};

export default Dashboard;
