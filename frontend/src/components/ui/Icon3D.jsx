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
