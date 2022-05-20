// This part use for clear all data - clear localstorage and reload web again
let ClearAlldata = () => {

  let handleClearAll = () => {
    localStorage.clear("todos");
  }

return (
<button 
  className="btn btn2-danger" onClick={() => {
    const confirmBox = window.confirm(
      "Do you really want to delete all the data?"
    )
    if (confirmBox === true) {
        handleClearAll();
        window.location.reload();
    }
  }
}>Delete All in the list
</button>
)
}

export default ClearAlldata;