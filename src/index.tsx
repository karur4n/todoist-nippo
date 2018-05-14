import * as React from "react"
import * as ReactDOM from "react-dom"
import Root from "./Root"

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root")

  if (rootEl) {
    ReactDOM.render(<Root />, rootEl)
  }
})
