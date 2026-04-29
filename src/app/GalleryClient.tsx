"use client";
import { useState } from "react";
import Image from "next/image";

export default function GalleryClient({ initialImages }: { initialImages: any[] }) {
  const [syncing, setSyncing] = useState(false);

  // mock fallback
  const displayImages = initialImages.length > 0 ? initialImages : [
    { id: 'm1', src: "/squirrel_biker.png", alt: "Squirrel Biker" },
    { id: 'm2', src: "/dog_detective.png", alt: "Dog Detective" },
    { id: 'm3', src: "/cat_wizard.png", alt: "Cat Wizard" },
  ];

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/sync", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          alert(`Synced! Added ${data.added} new images.`);
          window.location.reload();
        } else {
          alert("Failed to sync: " + (data.error || "Check console"));
        }
      } else {
         const text = await res.text();
         alert("Server Error: " + text);
      }
    } catch (e) {
      alert("Error syncing.");
    }
    setSyncing(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Your Gallery</h2>
        <button className="btn btn-primary" onClick={handleSync} disabled={syncing}>
          {syncing ? "Syncing..." : "Sync from Drive"}
        </button>
      </div>

      <div className="masonry-grid animate-fade-in">
        {displayImages.map((img: any) => (
          <div key={img.id} className="masonry-item">
            <Image
              src={img.driveId ? `/api/image/${img.driveId}` : img.src}
              alt={img.title || img.alt || "Image"}
              width={600}
              height={800}
              style={{ width: "100%", height: "auto" }}
            />
            {img.title && (
              <div style={{ padding: '1rem', background: 'var(--surface-color)' }}>
                <p style={{ fontWeight: 600 }}>{img.title}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
