const enableDisableTextBox = (ddlModels) => {
  const selectedValue = ddlModels.options[ddlModels.selectedIndex].value;
  const scope = document.getElementById("scope");
  if (selectedValue === "controller") {
    scope.style.display = "none"
    scope.required = false
  } else {
    scope.style.display = "initial"
    scope.focus()
    scope.required = true
  }
}

window.onload = function() {
  const scopeForm = document.getElementById("scopeForm").value
  const scope = document.getElementById("scope");
  if (scopeForm === "controller") {
    scope.style.display = "none"
    scope.required = false
  } else {
    scope.style.display = "initial"
    scope.required = true
    scope.focus()
  }
}