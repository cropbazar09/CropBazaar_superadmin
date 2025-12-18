
import VirtualCropRow from "./VirtualCropRow";

export default function VirtualCropList(props) {
  const { crops } = props;

  if (!crops.length) {
    return (
      <p className="text-center text-muted-foreground">
        No virtual crops found
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {crops.map((crop) => (
        <VirtualCropRow
          key={crop.id}
          crop={crop}
          {...props}
        />
      ))}
    </div>
  );
}
