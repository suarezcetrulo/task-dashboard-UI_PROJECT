FRONT END setup: 


The TaskList component:

Fetches and displays a list of tasks.
Uses Socket.io to receive real-time updates about task creation and updates from a server.
Manages task data with local state (socketTasks), synchronizing it with both fetched data and real-time updates.
Displays a task overview with some statistics and a detailed task list in a table format.
Handles loading and error states 

The App component serves as the main container for the task management dashboard:

It uses a custom hook (useTasks) to fetch and manage the state of tasks.
It provides a high-level overview of tasks using the TaskOverview component.
It displays a detailed, real-time list of tasks using the TaskList component.
The structure is styled using global CSS rules from App.css.

The Sidebar component provides a simple, styled sidebar for a task management application:

Functionality: It serves as a navigational tool within the application, providing links to different sections (e.g., a list of tasks).
Customization: The sidebar can be easily expanded with more links or additional content to suit the application's needs.
Styling: It is styled using a dedicated CSS file (Sidebar.css), ensuring a consistent look and feel within the application.

The TaskOverview component provides a summarized view of task statistics within the task management application:

Functionality: It displays key metrics about the tasks, including the total number of tasks, how many have been completed, and how many are in progress.
Presentation: The component is styled using a dedicated CSS file (TaskOverview.css), ensuring the statistics are visually clear and appealing.
Reusability: It can be easily reused or placed in different parts of the application wherever a quick summary of tasks is needed.

The useTasks custom hook provides a reusable way to fetch task data with robust error handling and a retry mechanism:

Data Management: Manages tasks, loading, and error states within a React component.
Retry Mechanism: Retries failed requests up to a specified number of times (retryCount) with a specified delay (retryDelay).
Error Handling: Provides detailed error messages based on the nature of the failure (server response, no response, request setup error).
Reusability: Can be reused across multiple components in the application, centralizing the data-fetching logic for tasks.