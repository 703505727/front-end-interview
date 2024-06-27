const usePrevious = (state) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
};
