async function deleteTag (id) {
  const _id = id.replace('button_', '')
  const response = await fetch(`tags/${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.status === 200) {
    const alertNode = document.getElementById('success_alert')
    alertNode.classList.remove('visually-hidden')
    location.reload()
  } else {
    const alertNode = document.getElementById('danger_alert')
    alertNode.classList.remove('visually-hidden')
  }
}