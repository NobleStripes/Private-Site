import Image from "next/image";

// Temporary mock data until Google Drive integration
const mockImages = [
  { id: 1, src: "/squirrel_biker.png", alt: "Squirrel Biker" },
  { id: 2, src: "/dog_detective.png", alt: "Dog Detective" },
  { id: 3, src: "/cat_wizard.png", alt: "Cat Wizard" },
];

export default function Home() {
  return (
    <div className="masonry-grid animate-fade-in">
      {mockImages.map((img) => (
        <div key={img.id} className="masonry-item">
          <Image
            src={img.src}
            alt={img.alt}
            width={600}
            height={800} // providing an approximate aspect ratio
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      ))}
    </div>
  );
}
