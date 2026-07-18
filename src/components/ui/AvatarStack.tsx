type AvatarStackProps = {
  people: string[];
  extra?: number;
};

export function AvatarStack({ people, extra }: AvatarStackProps) {
  return (
    <div className="avatar-stack" aria-label="Equipo asignado">
      {people.map((person, index) => (
        <span className="avatar" key={`${person}-${index}`}>
          {person}
        </span>
      ))}
      {extra ? <span className="avatar avatar--extra">+{extra}</span> : null}
    </div>
  );
}
