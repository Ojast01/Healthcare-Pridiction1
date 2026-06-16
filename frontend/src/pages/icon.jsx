/**
 * A floating, glossy 3D-styled icon tile.
 * Wrap any lucide-react icon to get a tilted gradient card with depth and a hover "settle" effect.
 *
 * Usage:
 *   <Icon3D icon={<Zap className="h-6 w-6 text-white" />} from="#2dd4bf" to="#0d9488" />
 */
export function Icon3D({ icon, from, to, className = '' }) {
  const style = {};
  if (from) style['--icon-3d-from'] = from;
  if (to) style['--icon-3d-to'] = to;

  return (
    <div className={`icon-3d ${className}`} style={style}>
      {icon}
    </div>
  );
}