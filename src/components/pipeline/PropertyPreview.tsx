type PropertyPreviewProps = {
  imageUrl: string;
  label: string;
};

export function PropertyPreview({ imageUrl, label }: PropertyPreviewProps) {
  return (
    <div className="property-preview">
      <div className="floorplan" aria-hidden="true">
        <span className="floorplan__room floorplan__room--large" />
        <span className="floorplan__room floorplan__room--tall" />
        <span className="floorplan__room floorplan__room--wide" />
        <span className="floorplan__room floorplan__room--small" />
      </div>
      <img src={imageUrl} alt={label} loading="lazy" />
    </div>
  );
}
