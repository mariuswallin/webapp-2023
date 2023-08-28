// Uses an object to replace magic strings. This approach is safer and centralizes the values for easy changes.
// Even if "settings" changes to "setting", this will still work.
const sectionEvents = {
  up: "UP",
  down: "DOWN",
  settings: "SETTINGS",
} as const

// TODO: Consider creating a function to handle element retrieval for better code organization. Use this approach for getting data-attributes and other elements, ensuring their existence.
const addQuestionId = document.getElementById("add")
const formId = document.getElementById("question-form")
const questionListId = document.getElementById("question-list")
const saveBtnId = document.getElementById("save")
const panelRightId = document.getElementById("panel-right")

// Used to hold the settings options
const questionSettings: Record<string, Record<string, unknown>> = {}

// Function to update the title of a list item based on a given key
const updateListTitle = (key, value) => {
  // Find the list item using the provided key as a data attribute value
  const listItem = document.querySelector(`[data-pos="${key}"]`)

  // If the list item is not found, exit the function early
  if (!listItem) return

  // TODO: Be cautious. If the HTML structure changes, this might cause errors.
  // Update the inner HTML of the second child element (index 1) of the list item
  // with the provided value. This assumes a specific structure in the HTML.
  listItem.children[1].innerHTML = value
}

// Function to create a new list item for the question list
const createListItem = (index: number) => {
  // Use the index as the identifier for now
  return `
    <li draggable="true" data-pos="${index}"
      class="flex justify-between items-center gap-2 [&>span:nth-of-type(2)]:block [&>span:nth-of-type(2)]:grow cursor-grab">
      <span>${index}</span><span>Placeholder title ${index}
        ... </span><img class="max-w-[1.4rem] w-full pointer-events-none object-cover"
        src="arrow-up-down.svg" />
    </li>`
}

// Function to create the settings panel HTML for a question
const createSettings = (id: string) => {
  // Get settings for the specific question from the global questionSettings object
  const {
    type = "text",
    required = false,
    max_length = "",
    max = false,
  } = questionSettings[id] || {}

  // Generate the settings panel HTML
  return `
    <div id="settings" data-question="${id}" class="sticky top-20 flex flex-col gap-3 mt-8 pl-0">
      <label for="type" class="font-bold">Type (${id})</label>
      <select id="type" name="type" value="${type}">
        <option value="text">Text</option>
        <option value="boolean">Yes / No</option>
        <option value="multiple">Multiple</option>
      </select>
      <section class="flex flex-col gap-3 mt-6">
        <h4 class="font-bold">Settings</h4>
        <div>
          <!-- Set the 'checked' attribute based on whether 'required' is true or false -->
          <input type="checkbox" name="required" id="required" ${
            required && "checked"
          } />
          <label for="required">Required</label>
        </div>
        <div>
          <!-- Set the 'checked' attribute based on whether 'max' is true or false -->
          <input type="checkbox" name="max" id="max" ${max && "checked"} />
          <label for="max">Max length</label>
        </div>
        <div>
          <label for="max_length">Max length</label>
          <!-- Set the value of the 'max_length' input field -->
          <input type="text" name="max_length" id="max_length" value="${max_length}" />
        </div>
        <button type="button" class="bg-red-400 text-white rounded px-6 py-2 w-fit">Delete</button>
      </section>
    </div>`
}

// TODO: Uses the index as id for now. But should use the question when working with React
const createQuestion = (index: number) => {
  // Generate the HTML for a question section
  return `
    <section data-question="${index}" class="px-8 aspect-video w-full bg-white shadow-lg rounded-2xl max-w-3xl h-auto">
      <div class="flex gap-4 justify-end p-6">
        <!-- Button to move the question up in the list -->
        <button type="button" data-event="${sectionEvents.up}"
          class="flex items-center gap-2 border border-black max-w-fit px-8 py-2 cursor-pointer">
          <img src="up.svg" alt="Up arrow to order up" class="pointer-events-none max-w-[1.3rem] w-full object-cover" />
          <span class="sr-only">Up</span>
        </button>
        <!-- Button to move the question down in the list -->
        <button type="button" data-event="${sectionEvents.down}"
          class="flex items-center gap-2 border border-black max-w-fit px-8 py-2 cursor-pointer">
          <img src="down.svg" alt="Down arrow to order down" class="pointer-events-none max-w-[1.3rem] w-full object-cover" />
          <span class="sr-only">Down</span>
        </button>
        <!-- Button to open the settings for the question -->
        <button type="button" data-event="${sectionEvents.settings}"
          class="flex items-center gap-2 border border-black max-w-fit px-8 py-2 cursor-pointer">
          <img alt="Settings question" src="settings.svg" class="pointer-events-none max-w-[1.3rem] w-full object-cover" />
          <span class="sr-only">Settings</span>
        </button>
      </div>
      <div class="flex justify-center items-center py-8 h-auto">
        <div class="grid grid-cols-[max-content_auto] w-full gap-4 ">
          <div class="mr-2">${index}</div>
          <div class="relative flex flex-col gap-1">
            <label class="font-semibold text-lg" for="title-${index}">Title
              <span aria-hidden="true">*</span>
            </label>
            <input type="text" name="title-${index}" id="title-${index}" placeholder="Your question" aria-required="true"
              aria-invalid="true" aria-describedby="titleError-${index} titleHint-${index}" />
            <span>
              <span></span>
              <span id="titleHint-${index}" hidden>Title is necessary for the question</span>
            </span>
          </div>
          <div class="col-start-2 relative flex flex-col gap-1">
            <label for="description-${index}">Description</label>
            <input type="text" name="description-${index}" id="description-${index}" placeholder="Description (optional)" />
          </div>
          <div class="col-start-2 relative flex flex-col gap-1">
            <label for="answer-${index}">Answer</label>
            <input type="text" name="answer-${index}" id="answer-${index}" placeholder="Type your answer here (generic)"
              disabled />
          </div>
          <!-- Hidden input to store the question's ID -->
          <input type="text" name="id" value="${index}" hidden />
        </div>
      </div>
    </section>`
}

// Function to save settings for a specific question
// This function mutates the global state variable "questionSettings"
const saveSettings = (id: string, settings: Record<string, unknown>) => {
  // Update the settings for the specific question by merging the existing settings with the new settings
  questionSettings[id] = { ...questionSettings[id], ...settings }
  // Note: This function mutates the global state. Use with caution.
}

// Function to handle events related to settings inputs
const handleSettingEvents = (e: Event, key: string, id: string) => {
  // Get the event target and narrow it down to specific element types
  const el = e.target as
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLButtonElement

  // Determine the name, value, and checked status based on the element type
  const name =
    el instanceof HTMLInputElement || el instanceof HTMLSelectElement
      ? el.name
      : null
  const value = el.value
  const checked = el instanceof HTMLInputElement ? el.checked : null

  // Based on the key (element type), handle the event by updating settings
  switch (key.toLowerCase()) {
    // For select and text inputs, update the corresponding setting
    case "select":
    case "text":
      saveSettings(id, { [name as string]: value })
      return
    case "button":
      // For buttons, no specific action needed in this context
      break
    case "checkbox":
      // For checkboxes, update the corresponding setting based on checked status
      saveSettings(id, { [name as string]: checked })
      return
    default:
      break
  }
}

// Function to add event listeners to settings panel elements
const addListeners = (children: HTMLCollection, id: string) => {
  // Iterate through the children of the settings panel
  Array.from(children).forEach((item) => {
    const name = item.nodeName

    // Add event listeners based on the element type
    if (["SELECT"].includes(name)) {
      // Add change event listener for SELECT elements
      item.addEventListener("change", (e) => handleSettingEvents(e, name, id))
    }
    if (["BUTTON"].includes(name)) {
      // Add click event listener for BUTTON elements
      item.addEventListener("click", (e) => handleSettingEvents(e, name, id))
    }
    if (["INPUT"].includes(name)) {
      const type = "type" in item ? item.type : null

      // Add change event listener for checkbox inputs
      if (type === "checkbox") {
        item.addEventListener("change", (e) => handleSettingEvents(e, type, id))
      }
      // Add keyup event listener for text inputs
      if (type === "text") {
        item.addEventListener("keyup", (e) => handleSettingEvents(e, type, id))
      }
    }

    // Recursively check for child nodes and add listeners
    if (item.hasChildNodes()) {
      addListeners(item.children, id)
    }
  })
}

// Function to update the settings panel with the specified question's settings
const updateSettings = (id: string) => {
  // Check if the settings panel element exists
  if (panelRightId) {
    // Replace the content of the settings panel with the updated settings content
    panelRightId.innerHTML = createSettings(id, questionSettings)

    // Add event listeners to the updated settings panel elements
    addListeners(panelRightId.children, id)
  }
}

// Event listener for the "Save" button click event
saveBtnId?.addEventListener("click", () => {
  // TODO: Reuse this event or use it to trigger the submit event and its function callback.

  // Use the `requestSubmit()` method to trigger form submission.
  // This can be reused or connected to a submit event's callback.
  ;(formId as HTMLFormElement).requestSubmit()

  // Exit the function early, as the remaining code won't execute after this point.
  return

  // Find all sections within the form or an empty array if none are found.
  const sections = formId?.querySelectorAll("section") || []

  // If there are no sections, exit the function early.
  if (!sections.length) return

  // Convert sections and their input data into an object using `Object.fromEntries()`.
  const data = Object.fromEntries(
    Array.from(sections).map((section) => {
      const id = section.getAttribute("data-question")
      // Find all input elements within the section that are not disabled.
      const inputs = Array.from(section.querySelectorAll("input") || []).filter(
        (input) => !input.disabled,
      )
      // Convert inputs' data into key-value pairs and filter out falsy values.
      const values = Object.fromEntries(
        inputs
          .map((input) => {
            if (!input.name) return
            return [input.name, input.value]
          })
          .filter(Boolean),
      )
      // Return the question ID and its associated values.
      return [id, values]
    }),
  )

  // Output the collected data to the console for debugging or verification.
  console.log(data)
})

// Event listener for form submission
formId?.addEventListener("submit", (event) => {
  // Prevent the form from sending a post or get request
  event.preventDefault()

  // Find all section elements within the form or default to an empty array
  const sections = formId?.querySelectorAll("section") || []

  // Create a new FormData object from the form
  const formData = new FormData(formId as HTMLFormElement)

  // Log the entries of the FormData object (used for debugging)
  // Could use this approach since we have the hidden field with id
  // This provides all the data we need from the form
  console.log(Array.from(formData.entries()))

  // If there are no sections, exit the function early
  if (!sections.length) return

  // Create an object that will hold the collected form data
  const data = Object.fromEntries(
    // Iterate through each section element and map its data to an array
    Array.from(sections).map((section) => {
      // Get the id attribute value from the section element
      const id = section.getAttribute("data-question")

      // Find input elements within the section or default to an empty array
      const inputs = Array.from(section.querySelectorAll("input") || []).filter(
        (input) => !input.disabled,
      )

      // Create an object that holds key-value pairs for each input
      const values = Object.fromEntries(
        inputs
          .map((input) => {
            if (!input.name) return
            // Extract the name part before the dash (-) in the input's name attribute
            const name = input.name.split("-")[0]
            // Return a key-value pair for this input, filtering out empty or falsy values
            return [name, input.value]
          })
          .filter(Boolean),
      )

      // Return a key-value pair for this section, including its settings from questionSettings
      return [id, { ...values, settings: questionSettings[id] || {} }]
    }),
  )

  // Log the collected form data (used for debugging)
  console.log(data)
})

// Event listener for the "keyup" event on the form element
formId?.addEventListener("keyup", (event) => {
  // Get the element that triggered the event
  const el = event.target

  // Check if the target element is an instance of HTMLInputElement
  if (!(el instanceof HTMLInputElement)) return

  // Check if the input element's name starts with "title"
  if (!el.name.startsWith("title")) return

  // Extract the id from the input element's id attribute
  // Split the id using "-" as a separator and get the last part
  const id = el.id.split("-").at(-1)

  // Update the title of the corresponding list item using the id and input value
  updateListTitle(id, el.value || `Placeholder title ${id}`)
})

// Global event listener attached to the form to handle clicks on elements with up, down, and settings events
formId?.addEventListener("click", (event) => {
  // Get the element that triggered the click event
  const el = event.target

  // Check if the triggered element is an instance of Element
  if (!(el instanceof Element)) return

  // Find the closest ancestor <section> element with a "data-question" attribute
  const parentSection = el.closest("section[data-question]")

  // If no suitable parent section is found, return
  if (!parentSection) return

  // Get the "data-question" attribute value to identify the question
  const id = parentSection.getAttribute("data-question")

  // Get the "data-event" attribute value to determine the specific event type (up, down, settings)
  const sectionEvent = el.getAttribute("data-event")

  // Use a switch statement to handle different event types
  switch (sectionEvent) {
    case sectionEvents.up:
      console.log("UP", id)
      break
    case sectionEvents.down:
      console.log("DOWN", id)
      break
    case sectionEvents.settings:
      // Call the "updateSettings" function with the question's id
      updateSettings(id)
      break
    default:
      // Do nothing for other event types
      break
  }
})

// Event listener for the "Add Question" button click (Does to much now)
addQuestionId?.addEventListener("click", () => {
  // Get all sections within the form or an empty array if none exist
  const sections = formId?.querySelectorAll("section") || []

  // Calculate the new question id by adding one to the total section count
  const id = Array.from(sections).length + 1

  // Get the last section and the number of items in the question list
  const lastSection = Array.from(sections).at(-1)
  const questionListItems = questionListId?.children.length

  // Get the second-to-last item in the question list
  const secondLastItem = Array.from(questionListId?.children || []).at(-2)

  // Insert a new list item in the question list after the second-to-last item
  secondLastItem?.insertAdjacentHTML(
    "afterend",
    createListItem(questionListItems - 2 + 1), // Use id as index for now
  )

  // Update the settings and UI for the new question
  updateSettings(id)

  // If there are no existing sections, add the new question at the beginning of the form
  if (!lastSection) {
    formId?.insertAdjacentHTML("afterbegin", createQuestion(id))
    return
  }

  // Insert the new question after the last section
  lastSection?.insertAdjacentHTML("afterend", createQuestion(id))
})
