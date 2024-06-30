export default interface FlashcardArrayProps {
  cards: Array<{
    id: string;
    frontHTML: string | JSX.Element;
    backHTML: string | JSX.Element;
    frontCardStyle?: React.CSSProperties;
    frontContentStyle?: React.CSSProperties;
    backCardStyle?: React.CSSProperties;
    backContentStyle?: React.CSSProperties;
    className?: string;
    height?: string;
    width?: string;
    borderRadius?: string;
    style?: React.CSSProperties;
  }>;
  controls?: boolean;
  forwardRef?: React.MutableRefObject<{
    nextCard: () => void;
    prevCard: () => void;
    resetArray: () => void;
  }> | null;
  showCount?: boolean;
  frontCardStyle?: React.CSSProperties;
  frontContentStyle?: React.CSSProperties;
  backCardStyle?: React.CSSProperties;
  backContentStyle?: React.CSSProperties;
  FlashcardArrayStyle?: React.CSSProperties;
  onCardChange?: (id: any, index: number) => void;
  onCardFlip?: (id: any, index: number, state: boolean) => void;
  currentCardFlipRef?: React.MutableRefObject<() => void>;
  cycle?: boolean;
}
