export default function Button(props) {
  const { label, icon, onClick, type, href } = props;

  const buttonElement = href ? (
    <a
      type={type}
      href={href}
      onClick={onClick}
      {...props}
      style={{
        display: "inline-block",
      }}
    >
      <div className="flex items-center gap-1">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
    </a>
  ) : (
    <button onClick={onClick} type={type} {...props}>
      <div className="flex items-center gap-1">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
    </button>
  );

  return buttonElement;
}
