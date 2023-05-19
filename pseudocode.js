/*****************************************************************/
/* Pre game setup */
/*****************************************************************/

// Set up the basic file structure/component tree of the React and Firebase project.
// Configure Firebase Authentication to enable email/password authentication and anonymous authentication for registered and guest players.
// Create a component for user authentication and profile management.
// Implement user registration functionality using email and password in Firebase.
// Implement anonymous authentication for guest players.
// Store user authentication state in the React component.
// Create a user profile component to display and update user information, including ROBO Avatars.
// Allow guest players to create a registered profile after playing as an anonymous user.

/*****************************************************************/
/* Game setup */
/*****************************************************************/

// Implement user authentication checks in the game setup component to determine if a user is logged in or playing as a guest.
// Upon logging in, redirect the user to a lobby or dashboard where they can create a new game room.
// If the user is the host:
//   - Fetch the available categories and levels from the Open Trivia API.
//   - Display the categories and levels in the game setup component.
//   - Allow the host to select a category, level, and number of players.
//   - Handle form submission and create a game room in Firebase.
//   - Fetch trivia questions from the Open Trivia API based on the selected options.
//   - Store the questions in the component state.
// If the user is a normal player:
//   - Display a waiting screen or join game form where the player can enter the game room ID.
//   - Fetch the game details (category, level, number of players) from Firebase using the provided game room ID.
//   - Fetch the trivia questions from Firebase based on the game details.
//   - Store the fetched questions in the component state.

/*****************************************************************/
/* During game setup */
/*****************************************************************/

// Display the first question and answer options.
// Allow the user to select an answer.
// Validate the selected answer and update the score accordingly.
// Show a cool animation to indicate whether the answer was right or wrong.
// Move to the next question.
// Repeat the steps until all questions have been answered.

/*****************************************************************/
/* Post game setup (contains stretch goals as well) */
/*****************************************************************/

// Display the final score and offer the option to share the score with a friend.
// Generate a unique shareable link containing the game room ID.
// Allow the user to copy the shareable link to the clipboard.
// Implement a component to input the shareable link received from a friend.
// Extract the game room ID from the received shareable link.
// Fetch the game details ( category, level, user score) from the game room in Firebase using the extracted game room ID.
// Fetch the same set of trivia questions based on the extracted game details.
// Display the trivia questions to the friend.
// Allow the friend to play and answer the trivia questions.
// Validate the friend's answers and calculate their score.
// Display the friend's score and compare it to the user's score.
// Show whether they beat the user's score or not.
