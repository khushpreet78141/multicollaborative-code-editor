import React from "react";
import { CheckCircle2, XCircle, Info } from "lucide-react";

const CustomToast = ({ title, message, type }) => {
  const icons = {
    success: <CheckCircle2 className="text-green-400 w-6 h-6" />,
    error: <XCircle className="text-red-400 w-6 h-6" />,
    info: <Info className="text-indigo-400 w-6 h-6" />,
  };

  
  return (
    <div className="relative overflow-hidden flex items-start gap-4 px-5 py-4 rounded-2xl
      min-w-[320px] max-w-[380px]
      bg-[#020617]/95 backdrop-blur-2xl
      border border-white/10
      shadow-[0_12px_40px_rgba(0,0,0,0.7)]
    ">

      {/* subtle gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pointer-events-none" />

      {/* Icon */}
      <div className="mt-1 shrink-0">
        {icons[type]}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <span className="text-base font-semibold text-white">
          {title}
        </span>
        <span className="text-sm text-gray-400 mt-1 leading-relaxed">
          {message}
        </span>
      </div>
    </div>
  );
};

export default CustomToast;