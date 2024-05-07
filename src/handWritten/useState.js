const useState = (initialValue) => {
    const valueRef = useRef(initialValue);
    const setValue = (param) => {
        if (typeof param === 'function') {
            valueRef.current = param(valueRef.current)
        } else {
            valueRef.current = param
        }
    }

    // 触发重新渲染
    dispatchAction()

    return [valueRef.current, setValue]
}