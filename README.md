# Moises Bot

This is a bot that utilizes the Moises API for audio processing.

## Configuration

Before running the bot, it is necessary to set up a `.env` file with two essential pieces of information:

1. `BOT_KEY`: Bot key.
2. `MOISES_KEY`: Moises API key.

Additionally, it's important to add the bot to a group or channel to ensure it operates correctly.

## Execution


After configuring the `.env` file and adding the bot to your group or channel, follow these steps:

1. Clone this repository to your local environment.
2. Open the terminal in the project folder.
3. Execute the following command to install dependencies:
  ```
   npm install 
   ```
4. Download [ffmpeg](https://ffmpeg.org/).

5. Next, start the bot with the following command:
  ```
   nodemon
   ```

## Available Commands

Currently, the bot supports the following commands:

- `/start`: This command needs to be run before using other commands.
- `/overdriveguitar`: Applies overdrive effect to the guitar.
- `/isolatebass`: Isolates the sound of the bass.
- `/isolateguitar`: Isolates the sound of the guitar.
- `/reverseguitar`: Reverses the audio of the guitar.
- `/reverbguitar`: Applies reverb to the guitar.
- `/aimastering`: Applies AI-based mastering.
- `/muteguitar`: Removes the sound of the guitar.
- `/halfstepdown`: Decreases the tuning by half step.
- `/halfstepup`: Increases the tuning by half step.
- `/mutevocals`: Removes the sound of vocals.

## Latest Telegram update

After the latest Telegram update, the bot can only receive audio files when accessed through the mobile application.