import React from "react";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center mb-4">
            <img
              src="https://merosathitv.com/wp-content/uploads/2025/11/1010-1.png"
              alt="Mero Sathi Samachar"
              className="w-10 h-10 mr-3"
            />
            <h2 className="text-xl font-bold text-white">मेरो साथी समाचार</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            मेरो साथी समाचार सत्य, निष्पक्ष र विश्वसनीय पत्रकारितामा प्रतिबद्ध
            डिजिटल समाचार माध्यम हो। देश तथा विदेशका ताजा समाचार, विश्लेषण र
            विशेष रिपोर्टहरू समयमै प्रस्तुत गर्छौं।
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">समाचार वर्ग</h3>
          <ul className="space-y-2 text-sm">
            {[
              "राजनीति",
              "अर्थतन्त्र",
              "प्रविधि",
              "खेलकुद",
              "शिक्षा",
              "स्वास्थ्य",
              "पर्यटन",
            ].map((item, i) => (
              <li
                key={i}
                className="hover:text-white cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            नीति तथा सेवा
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition">
              गोपनीयता नीति
            </li>
            <li className="hover:text-white cursor-pointer transition">
              प्रयोगका सर्तहरू
            </li>
            <li className="hover:text-white cursor-pointer transition">
              सम्पादकीय नीति
            </li>
            <li className="hover:text-white cursor-pointer transition">
              विज्ञापन
            </li>
            <li className="hover:text-white cursor-pointer transition">
              करियर
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            सम्पर्क विवरण
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1 text-red-500" />
              नेपाल
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-500" />
              +977-98XXXXXXXX
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-500" />
              info@merosathisamachar.com
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
              <div
                key={i}
                className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition cursor-pointer"
              >
                <Icon className="w-4 h-4 text-white" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-center justify-between text-sm text-gray-500 gap-3">
        <p>
          © {new Date().getFullYear()} मेरो साथी समाचार. सबै अधिकार सुरक्षित।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
