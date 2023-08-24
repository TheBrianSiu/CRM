export const HandleUpdate = (id, status) => {
  fetch(`http://localhost:8080/projects-table/update-status/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([status]),
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      } else {
        return res.json();
      }
    })
    .then(function (data) {})
    .catch((err) => {
      alert(err);
    });
};
