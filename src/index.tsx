import * as React from "react"
import * as ReactDOM from "react-dom"
import Container from "./Container"

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root")

  if (rootEl) {
    ReactDOM.render(<Container />, rootEl)
  }
})
