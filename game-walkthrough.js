/*****************************************************************/
/* User Authentication and Profile Management */
/*****************************************************************/

// Users can register and log in using their email and password or choose to play as a guest with anonymous authentication.
// After logging in, users can create or update their profiles with additional information.
// If playing as a guest, users will have the option to create a profile after completing a game.
// User can either create or join a game room.

/*****************************************************************/
/* Game Setup*/
/*****************************************************************/

// Start Setup:
// The user who initiates the game setup process becomes the Host of the game.
// The Host selects the desired category, level, and number of players to set up the game.
// When the Host submits the form, a new game room is created in Firebase.
// A unique game room ID is generated and associated with the room.

// Game Lobby:
// After the game room is created, Host is redirected to a game lobby screen.
// The lobby displays the game room details, including the game room ID.
// The Host can share the game room ID or an invitation link with other players and they can all join.

// Joining the Game:
// Other players who want to join the game need to enter the game room ID .
// When a player joins the room, their user information is added to the game room document in Firebase, indicating their participation.

// Starting the Game:
// Once the desired number of players has joined the room, the host or a designated player can initiate the game start.
// This can be done through a "Start Game" button or a similar mechanism in the game lobby.

/*****************************************************************/
/* Trivia Game*/
/*****************************************************************/

// The user is redirected to the game screen with the game room ID.
// Trivia questions are fetched from the Open Trivia DB API based on the selected category and level.
// The first question is displayed along with the answer options.
// DO WE ADD TIMER LIKE 30 SECONDS FOR EVERY QUESTION ?
// Users can select an answer, and the selected answer is validated.
// The user's score is updated based on the correctness of the answer, and a cool animation indicates whether the answer was right or wrong.
// The game progresses to the next question, and the steps for displaying questions and updating scores are repeated until all questions have been answered.

/*****************************************************************/
/* Final Score and Sharing*/
/*****************************************************************/

// After answering all the questions, the final scores of all the participants is displayed to the user.
// THINK ABOUT GIVING BATCHES AND TROPIES HERE TO THE WINNER.

/*****************************************************************/
/* Sharing the game with Friend*/
/*****************************************************************/

// Host can generate a unique shareable link containing the game room ID. This will have all the questions that the Host's game had.
// The link can be copied to the clipboard and shared with a friend.
// The friend can click on the shared link and play the game either as registered or anonymous user.

/*****************************************************************/
/* Friend's Gameplay*/
/*****************************************************************/

// The friend is redirected to the game screen with the shared game room ID.
// Trivia questions are fetched based on the game room's category and level.
// The friend can play and answer the trivia questions, similar to the Host's gameplay.
// The friend's score is calculated and displayed, and a comparison is made between the friend's score and the Host's score.
