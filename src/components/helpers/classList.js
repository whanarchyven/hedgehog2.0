export const classList = (...args) => {
    return args.filter(Boolean).join(" ");
}