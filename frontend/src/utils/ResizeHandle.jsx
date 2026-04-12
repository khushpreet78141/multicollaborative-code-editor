import { useEffect, useRef, useState } from "react";

const ResizeHandle = ({ setSidebarWidth }) => {
  const isDragging = useRef(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;

      const newWidth = e.clientX;

      if (newWidth >= 150 && newWidth <= window.innerWidth * 0.8) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        setActive(false);
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto";
      }
    };

    if (active) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [active, setSidebarWidth]);

  return (
    <>
      <div
        onMouseDown={(e) => {
          isDragging.current = true;
          setActive(true);
          document.body.style.cursor = "col-resize";
          document.body.style.userSelect = "none";
          e.preventDefault();
        }}
        className="w-1 hover:w-1.5 bg-white/10 hover:bg-indigo-500 cursor-col-resize transition-all z-50 h-full"
      />
      {active && (
        <div
          className="fixed inset-0 z-[9999] cursor-col-resize"
          style={{ background: "transparent" }}
        />
      )}
    </>
  );
};

export default ResizeHandle;