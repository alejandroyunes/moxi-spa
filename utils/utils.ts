export const setDarkMode = (mode: boolean) => {
  const theme = mode ? "dark" : "light"

  document.documentElement.setAttribute("data-color-scheme", theme)
  localStorage.setItem("theme", theme)
}
