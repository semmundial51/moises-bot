import 'dotenv/config';

import Moises from '../node_modules/moises/sdk.js';
import { Telegraf } from 'telegraf';
import fs, { readdirSync } from 'fs';
import { downloadAudioFile, processAudioFile, convertWavToMp3 } from './audioProcessor.js';

const bot = new Telegraf(process.env.BOT_KEY);
const moises = new Moises({ apiKey: process.env.MOISES_KEY });
const outputFolderPath = "./output";
const inputFolderPath = "./input";
const tempFileName = "audio_tmp";

console.log("Bot is online.");

const replyWithAudio = async (ctx, outputFilePath) => {
    process.stdout.write("Replying with audio... ");
    try {
        await ctx.replyWithAudio({ source: outputFilePath });
        console.log("done!");
    } catch (error) {
        console.error('Error replying with audio: ', error);
    }
};

const removeTemporaryFiles = (inputFilePath, processedFilePath, outputFilePath) => {
    try {
        process.stdout.write("Removing temporary files... ");
        fs.unlinkSync(inputFilePath);
        fs.unlinkSync(processedFilePath);
        fs.unlinkSync(outputFilePath);
    } catch (error) {
        console.error("Error removing temporary files:", error);
        throw error;
    }
    console.log("done!");
}

bot.on('audio', async (ctx) => {
    await ctx.reply("Downloading your audio file, this may take a few seconds...");

    const inputFilePath = inputFolderPath + "/" + tempFileName + ".mp3";

    await downloadAudioFile(ctx, ctx.message.audio.file_id, inputFilePath);
    
    await ctx.reply("Nice! I downloaded your audio file. Send a command to indicate how can I process it. (ex.: /overdriveguitar).");
}); 

bot.on('voice', async (ctx) => {
    await ctx.reply("Downloading your voice message, this may take a few seconds...");

    const inputFilePath = inputFolderPath + "/" + tempFileName + ".ogg";

    await downloadAudioFile(ctx, ctx.message.voice.file_id, inputFilePath);

    await ctx.reply("Nice! I downloaded your voice message. Send a command to indicate how can I process it. (ex.: /overdriveguitar).");
});

bot.command('help', (ctx) => {
    const helpMessage =
        'To get started, use the /start command. \n\n' +
        '/overdriveguitar - Apply overdrive effect to the guitar.\n' +
        '/isolatebass - Isolate the sound of the bass.\n' +
        '/isolateguitar - Isolate the sound of the guitar.\n' +
        '/reverseguitar - Reverse the audio of the guitar.\n' +
        '/reverbguitar - Apply reverb to the guitar.\n' +
        '/aimastering - Apply AI-based mastering.\n' +
        '/muteguitar - Remove the sound of the guitar.\n' +
        '/halfstepdown - Decrease the tuning by half step.\n' +
        '/halfstepup - Increase the tuning by half step.\n' +
        '/mutevocals - Remove the sound of vocals.\n\n';
    ctx.reply(helpMessage);
});

bot.command('overdriveguitar', async (ctx) => {
    try {
        const files = readdirSync(inputFolderPath);
        
        for (const filePath of files) {
            await ctx.reply('Cool, processing the audio file.');

            const inputFilePath = inputFolderPath + '/' + filePath;

            await processAudioFile(moises, inputFilePath, outputFolderPath, "overdrive-guitar");

            const processedFilePath = outputFolderPath + "/overdrive-guitar.wav";
            const outputFilePath = outputFolderPath + "/overdrive-guitar.mp3";

            await convertWavToMp3(processedFilePath, outputFilePath);
            await replyWithAudio(ctx, outputFilePath);

            removeTemporaryFiles(inputFilePath, processedFilePath, outputFilePath);
        }
    } catch (error) {
        console.error('Error reading folder or processing files:', error);
    }
});

bot.command('isolatebass', async (ctx) => {
    try {
        const files = readdirSync(inputFolderPath);

        for (const filePath of files) {
            await ctx.reply('Cool, processing the audio file.');

            const inputFilePath = inputFolderPath + '/' + filePath;

            await processAudioFile(moises, inputFilePath, outputFolderPath, "isolate-bass");

            const processedFilePath = outputFolderPath + "/isolated-bass.wav";
            const outputFilePath = outputFolderPath + "/isolated-bass.mp3";

            await convertWavToMp3(processedFilePath, outputFilePath);
            await replyWithAudio(ctx, outputFilePath);

            removeTemporaryFiles(inputFilePath, processedFilePath, outputFilePath);
        }
    } catch (error) {
        console.error('Error reading folder or processing files:', error);
    }
}); 

bot.command('isolateguitar', async (ctx) => {
    try {
        const files = readdirSync(inputFolderPath);

        for (const filePath of files) {
            await ctx.reply('Cool, processing the audio file.');

            const inputFilePath = inputFolderPath + '/' + filePath;

            await processAudioFile(moises, inputFilePath, outputFolderPath, "isolate-guitar");

            const processedFilePath = outputFolderPath + "/isolated-guitar.wav";
            const outputFilePath = outputFolderPath + "/isolated-guitar.mp3";

            await convertWavToMp3(processedFilePath, outputFilePath);
            await replyWithAudio(ctx, outputFilePath);

            removeTemporaryFiles(inputFilePath, processedFilePath, outputFilePath);
        }
    } catch (error) {
        console.error('Error reading folder or processing files:', error);
    }
}); 

bot.command('reverseguitar', async (ctx) => {
    try {
        const files = readdirSync(inputFolderPath);

        for (const filePath of files) {
            await ctx.reply('Cool, processing the audio file.');

            const inputFilePath = inputFolderPath + '/' + filePath;

            await processAudioFile(moises, inputFilePath, outputFolderPath, "reverse-guitar");

            const processedFilePath = outputFolderPath + "/reversed-guitar.wav";
            const outputFilePath = outputFolderPath + "/reversed-guitar.mp3";

            await convertWavToMp3(processedFilePath, outputFilePath);
            await replyWithAudio(ctx, outputFilePath);

            removeTemporaryFiles(inputFilePath, processedFilePath, outputFilePath);
        }
    } catch (error) {
        console.error('Error reading folder or processing files:', error);
    }
}); 

bot.command('reverbguitar', async (ctx) => {
    try {
        const files = readdirSync(inputFolderPath);

        for (const filePath of files) {
            await ctx.reply('Cool, processing the audio file.');

            const inputFilePath = inputFolderPath + '/' + filePath;

            await processAudioFile(moises, inputFilePath, outputFolderPath, "reverb-guitar");

            const processedFilePath = outputFolderPath + "/reverb-guitar.wav";
            const outputFilePath = outputFolderPath + "/reverb-guitar.mp3";

            await convertWavToMp3(processedFilePath, outputFilePath);
            await replyWithAudio(ctx, outputFilePath);

            removeTemporaryFiles(inputFilePath, processedFilePath, outputFilePath);
        }
    } catch (error) {
        console.error('Error reading folder or processing files:', error);
    }
}); 

bot.command('aimastering', async (ctx) => {
    try {
        const files = readdirSync(inputFolderPath);

        for (const filePath of files) {
            await ctx.reply('Cool, processing the audio file.');

            const inputFilePath = inputFolderPath + '/' + filePath;

            await processAudioFile(moises, inputFilePath, outputFolderPath, "ai-mastering");

            const processedFilePath = outputFolderPath + "/ai-mastering.wav";
            const outputFilePath = outputFolderPath + "/ai-mastering.mp3";

            await convertWavToMp3(processedFilePath, outputFilePath);
            await replyWithAudio(ctx, outputFilePath);

            removeTemporaryFiles(inputFilePath, processedFilePath, outputFilePath);
        }
    } catch (error) {
        console.error('Error reading folder or processing files:', error);
    }
}); 

bot.command('muteguitar', async (ctx) => {
    try {
        const files = readdirSync(inputFolderPath);

        for (const filePath of files) {
            await ctx.reply('Cool, processing the audio file.');

            const inputFilePath = inputFolderPath + '/' + filePath;

            await processAudioFile(moises, inputFilePath, outputFolderPath, "deleteguitar");

            const processedFilePath = outputFolderPath + "/mute-guitar.wav";
            const outputFilePath = outputFolderPath + "/mute-guitar.mp3";

            await convertWavToMp3(processedFilePath, outputFilePath);
            await replyWithAudio(ctx, outputFilePath);

            removeTemporaryFiles(inputFilePath, processedFilePath, outputFilePath);
        }
    } catch (error) {
        console.error('Error reading folder or processing files:', error);
    }
}); 

bot.command('halfstepdown', async (ctx) => {
    try {
        const files = readdirSync(inputFolderPath);

        for (const filePath of files) {
            await ctx.reply('Cool, processing the audio file.');

            const inputFilePath = inputFolderPath + '/' + filePath;

            await processAudioFile(moises, inputFilePath, outputFolderPath, "half-step-down");

            const processedFilePath = outputFolderPath + "/half-step-down.wav";
            const outputFilePath = outputFolderPath + "/half-step-down.mp3";

            await convertWavToMp3(processedFilePath, outputFilePath);
            await replyWithAudio(ctx, outputFilePath);

            removeTemporaryFiles(inputFilePath, processedFilePath, outputFilePath);
        }
    } catch (error) {
        console.error('Error reading folder or processing files:', error);
    }
}); 

bot.command('halfstepup', async (ctx) => {
    try {
        const files = readdirSync(inputFolderPath);

        for (const filePath of files) {
            await ctx.reply('Cool, processing the audio file.');

            const inputFilePath = inputFolderPath + '/' + filePath;

            await processAudioFile(moises, inputFilePath, outputFolderPath, "half-step-up");

            const processedFilePath = outputFolderPath + "/half-step-up.wav";
            const outputFilePath = outputFolderPath + "/half-step-up.mp3";

            await convertWavToMp3(processedFilePath, outputFilePath);
            await replyWithAudio(ctx, outputFilePath);

            removeTemporaryFiles(inputFilePath, processedFilePath, outputFilePath);
        }
    } catch (error) {
        console.error('Error reading folder or processing files:', error);
    }
}); 

bot.command('mutevocals', async (ctx) => {
    try {
        const files = readdirSync(inputFolderPath);

        for (const filePath of files) {
            await ctx.reply('Cool, processing the audio file.');

            const inputFilePath = inputFolderPath + '/' + filePath;

            await processAudioFile(moises, inputFilePath, outputFolderPath, "mute-vocals");

            const processedFilePath = outputFolderPath + "/mute-vocals.wav";
            const outputFilePath = outputFolderPath + "/mute-vocals.mp3";

            await convertWavToMp3(processedFilePath, outputFilePath);
            await replyWithAudio(ctx, outputFilePath);

            removeTemporaryFiles(inputFilePath, processedFilePath, outputFilePath);
        }
    } catch (error) {
        console.error('Error reading folder or processing files:', error);
    }
}); 

bot.start((ctx) => ctx.reply('Welcome, please insert an mp3 or send an voice message.'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))