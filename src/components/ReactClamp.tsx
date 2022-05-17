import React, { useEffect, useRef, useState } from "react";

type Props = React.PropsWithChildren<{
  maxLines: number;
  expanded?: boolean;
  ellipsis?: string;
  renderAfter?(): JSX.Element;
}>;

const ReactClamp: React.FC<Props> = ({
  ellipsis = "...",
  maxLines,
  expanded,
  children,
  renderAfter,
}) => {
  const text = children as string
  const [realText, setRealText] = useState(text)
  const contentRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    processText();
  }, []);

  function processText() {
    if (!text) return;
    applyChange(text);
    search();
  }

  function search(...range: number[]) {
    const offset = (textRef.current as any).textContent.length;
    const [from = 0, to = offset] = range;
    if (to - from <= 3) {
      stepToFit(from);
      return;
    }

    const target = Math.floor((to + from) / 2);
    applyChange(getClampedText(target));
    if (isOverflow()) {
      search(from, target);
    } else {
      search(target, to);
    }
  }

  function applyChange(textContent: string) {
    (textRef.current as any).textContent = textContent;
  }

  function stepToFit(offset: number) {
    clamp(fill(offset));
  }

  function fill(offset: number) {
    while (!isOverflow() || getNumberOfLines() < 2) {
      moveEdge(++offset);
    }
    return offset;
  }

  function clamp(offset: number) {
    while (isOverflow() && getNumberOfLines() > 1 && offset > 0) {
      moveEdge(--offset);
    }
    setRealText(getClampedText(offset))
  }

  function getClampedText(offset: number) {
    return `${text.slice(0, offset)}${ellipsis}`;
  }

  function isOverflow() {
    return getNumberOfLines() > maxLines;
  }

  function getNumberOfLines() {
    return contentRef.current ? contentRef.current.getClientRects().length : 0;
  }

  function moveEdge(offset: number) {
    (textRef.current as any).textContent = getClampedText(offset);
  }

  return (
    <span ref={contentRef}>
      <span ref={textRef} aria-label={text}>
        {expanded ? text : realText}
      </span>
      {renderAfter?.()}
    </span>
  );
};

export default ReactClamp;
