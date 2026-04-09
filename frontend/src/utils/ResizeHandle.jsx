import { useEffect, useRef } from "react";

const ResizeHandle = ({ setSidebarWidth }) => {
  const isDragging = useRef(false);

  useEffect(() => {

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;

      const newWidth = e.clientX;

      if (newWidth >= 220 && newWidth <= 500) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "default";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    
  }, []);

  return (
    <div
      onMouseDown={() => {
        isDragging.current = true;
        document.body.style.cursor = "col-resize";
      }}
      className="w-1 hover:w-1.5 bg-white/10 hover:bg-indigo-500 cursor-col-resize transition-all"
    />

  );
};

export default ResizeHandle;