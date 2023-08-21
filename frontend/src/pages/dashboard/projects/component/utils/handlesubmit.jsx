export const HandleSubmit = (taskitem) => {
    fetch(`http://localhost:8080/projects-table/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskitem),
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
