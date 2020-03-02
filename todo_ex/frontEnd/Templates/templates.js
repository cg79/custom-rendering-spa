const listTemplate = `
    <div id="list-form">
    <div class="dropDown ">
      <select class="select-css title pointerCursor"
        >Select a category<i class="fa fa-angle-right"></i>
        <div class="option"><option value="default">Select a Category</option></div></select
      >
      <span class="title-flex">Workshops</span>
      <div class="menu pointerCursor hide"></div>
    </div>

        <button id="add-workshop" class="add-workshop" name="add-workshop">Add Workshop</button>
        <div id="list-container"></div>
    </div>
`
const editTemplate = `
    <div id="edit-add-form">
        <button id="goto-list">Go to List</button>
      <form class="form1-flex" method="GET">
        <ul class="flex-outer">
          <li>
            <label for="title">Title</label>
            <input type="text" id="title" placeholder="Enter the title of the workshop" />
          </li>
          <li>
            <label for="startDate">Starting Date</label>
            <input type="date" id="startDate" placeholder="Enter the starting date of the workshop" />
          </li>
          <li>
            <label for="endDate">Ending Date</label>
            <input type="date" id="endDate" placeholder="Enter the ending date of the workshop" />
          </li>
          <li>
            <label for="startTime">Starting Time</label>
            <input type="time" id="startTime" placeholder="Enter the starting time of the workshop" />
          </li>
          <li>
            <label for="endTime">Ending Time</label>
            <input type="time" id="endTime" placeholder="Enter the ending time of the workshop" />
          </li>
          <li>
            <label for="location">Location</label>
            <input type="text" id="location" placeholder="Enter the location of the workshop" />
          </li>
          <li>
            <label for="category">Category</label>
            <input type="text" id="category" placeholder="Enter the category of the workshop" />
          </li>
          <input type="hidden" id="id" />
          <li>
            <div id="add">
              <button hash="#div2">add</button>
            </div>

            <div id="update">
              <button>update</button>
            </div>
            <button id="backTo-list" type="button">back</button>
          </li>
        </ul>
      </form>
    </div>
`
