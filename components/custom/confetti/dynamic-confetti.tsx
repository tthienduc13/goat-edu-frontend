import dynamic from "next/dynamic";
import { useEffect } from "react";
interface Props {
  show: boolean;
}

const Confetti = dynamic<Props>(() => import("./confetti"), {
  ssr: false,
});

export default function DynamicConfetti(props: Props & { sound?: boolean }) {
  // const [play] = useSound("./yay.wav", { volume: 0.25 });

  // useEffect(() => {
  //   if (props.show && props.sound) {
  //     play();
  //   }
  // }, [props.show, props.sound, play]);

  return <Confetti show={props.show} />;
}
