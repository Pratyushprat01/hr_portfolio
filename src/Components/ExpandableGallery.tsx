import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  images: string[];
}

export default function ExpandableGallery({ images }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      {/* 🔥 MAIN STRIP */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          width: "90%",
          margin: "80px auto",
          height: "420px",
        }}
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setActive(i)}
            style={{
              flex: 1,
              minWidth: 0,
              borderRadius: "20px",
              overflow: "hidden",
              cursor: "pointer",
              position: "relative",
            }}
            animate={{
              flex:
                hovered === null
                  ? 1
                  : hovered === i
                  ? 4   // 👈 expansion size (balanced)
                  : 0.6, // 👈 shrink others
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            {/* IMAGE */}
            <img
              src={img}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* DARK EFFECT */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                background: "black",
              }}
              animate={{
                opacity:
                  hovered === i || hovered === null ? 0 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      {/* 🔥 FULL SCREEN */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            onClick={() => setActive(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.9)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={images[active]}
              style={{
                maxWidth: "85%",
                maxHeight: "85%",
                borderRadius: "16px",
              }}
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}