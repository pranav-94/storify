import React from "react";

interface props{
    data: string
}

const NeonBorderCard: React.FC<props> = ({data}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative p-1 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 animate-rotate border-overlay" />
        <div className="relative bg-black rounded-2xl p-8 text-white w-80 z-10">
          {/* <h1 className="text-3xl font-bold mb-4"></h1> */}
          <p className="text-gray-300">
              {data}
          </p>
        </div>
      </div>

      {/* Inline styles */}
      <style jsx>{`
        .border-overlay {
          background: linear-gradient(
            270deg,
            #ff00ff,
            #00ffff,
            #00ff00,
            #ffff00,
            #ff0000,
            #ff00ff
          );
          background-size: 600% 600%;
          filter: blur(8px);
          z-index: 0;
        }
        .animate-rotate {
          animation: rotateBorder 6s linear infinite;
        }
        @keyframes rotateBorder {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default NeonBorderCard