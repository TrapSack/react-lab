interface IInfoModalProps {
  type: string;
  text: string;
  show: boolean;
}

export default function InfoModal(props: IInfoModalProps) {
  const infoModalStyles = {
    backgroundColor: props.type === "success" ? "#36b336" : "#6986d4",
  };
  if (!props.show) return null;
  return (
    <div className="info-modal" style={infoModalStyles}>
      {props.text}
    </div>
  );
}
