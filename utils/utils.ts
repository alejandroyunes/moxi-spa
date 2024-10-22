export const setDarkMode = (mode: boolean) => {
  const theme = mode ? "light" : "dark"

  document.documentElement.setAttribute("data-color-scheme", theme)
  localStorage.setItem("theme", theme)
}
