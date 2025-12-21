import React from "react";
import {
  Clock,
  Activity,
  Heart,
  Globe,
  BookOpen,
  Trophy,
  Cpu,
} from "lucide-react";
import { Link } from "react-router-dom";

// Map category slug → icon
const CATEGORY_ICONS = {
  shikssaa: BookOpen, // शिक्षा
  svaasthy: Heart, // स्वास्थ्य
  raajniiti: Activity, // राजनीति
  pryttn: Globe, // पर्यटन
  khel: Trophy, // खेल
  prvidhi: Cpu, // प्रविधि
  khelkud: Trophy, // खेलकुद
};

// Gradient palette
const CATEGORY_GRADIENTS = [
  ["#F87171", "#FBBF24"], // red → yellow
  ["#60A5FA", "#2563EB"], // blue → dark blue
  ["#34D399", "#10B981"], // green → dark green
  ["#A78BFA", "#7C3AED"], // purple → dark purple
  ["#F472B6", "#DB2777"], // pink → dark pink
  ["#FCD34D", "#F59E0B"], // yellow → orange
  ["#818CF8", "#4F46E5"], // indigo → dark indigo
  ["#FB923C", "#EA580C"], // orange → dark orange
];

// Map slug → deterministic gradient
const getCategoryGradient = (slug = "") => {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  const gradient =
    CATEGORY_GRADIENTS[Math.abs(hash) % CATEGORY_GRADIENTS.length];
  return `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})`;
};

export default function NewsCard({ news, api }) {
  const publishedDate = new Date(news.publishedAt);
  const year = publishedDate.getFullYear();
  const month = ("0" + (publishedDate.getMonth() + 1)).slice(-2);

  // Safe slug for gradient
  const slug = news.category?.slug || "default";

  // Badge gradient
  const categoryGradient = getCategoryGradient(slug);

  // Icon
  const IconComponent = CATEGORY_ICONS[slug] || Activity;

  return (
    <Link to={`/news/news/${year}/${month}/${news.slug}`}>
      <article className="group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300 h-[350px] flex flex-col bg-white">
        {/* Image */}
        <div className="h-48 relative overflow-hidden rounded-t-xl">
          <img
            src={`${api}/uploads/${news.image}`}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Category badge */}
          <div
            style={{ backgroundImage: categoryGradient, color: "#fff" }}
            className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1 transition-transform duration-300 group-hover:scale-110"
          >
            <IconComponent className="w-3 h-3" />
            {news.category?.name || "अनजान"}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-red-600 transition-colors">
              {news.title}
            </h3>
            {news.description && (
              <p className="text-gray-600 text-sm line-clamp-3 mt-1">
                {news.description}
              </p>
            )}
          </div>

          {/* Date */}
          {/* <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
            <Clock className="w-4 h-4" />
            <span>{publishedDate.toLocaleString("ne-NP")}</span>
          </div> */}
        </div>
      </article>
    </Link>
  );
}
