import axios from 'axios';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path'

const downloadAudioFile = async (ctx, fileId, filePath) => {
    try {
        const fileLink = await ctx.telegram.getFileLink(fileId);
        process.stdout.write("Downloading audio... ");

        const response = await axios({
            method: 'get',
            url: fileLink,
            responseType: 'stream',
        });

        const writer = response.data.pipe(fs.createWriteStream(filePath));

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log("done!");
    } catch (error) {
        console.error("Error downloading audio:", error);
        throw error;
    }
};

const processAudioFile = async (moises, inputFolderPath, outputFolderPath, workflow) => {
    try {
        process.stdout.write("Processing audio... ");
        await moises.processFile(workflow, inputFolderPath, outputFolderPath);
        console.log("done!");
    } catch (error) {
        console.error("Error processing audio:", error);
        throw error;
    }
};

const processAudioFolder = async (moises, inputFolderPath, outputFolderPath, workflow) => {
    try {
        process.stdout.write("Processing audio... ");
        await moises.processFolder(workflow, inputFolderPath, outputFolderPath);
        console.log("done!");
    } catch (error) {
        console.error("Error processing audio:", error);
        throw error;
    }
};

const convertWavToMp3 = (inputFilePath, outputFilePath) => {
    process.stdout.write("Converting .wav to .mp3... ");
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(inputFilePath)
            .audioCodec('libmp3lame')
            .toFormat('mp3')
            .on('end', () => {
                console.log('done!');
                resolve();
            })
            .on('error', (err) => {
                console.error('Error during conversion:', err);
                reject(err);
            })
            .save(outputFilePath);
    });
};

const getFileType = (filePath) => {
    try {
      const buffer = fs.readFileSync(filePath);
      const type = fileType(buffer);
  
      if (type) {
        return type.ext; // Return the file extension (e.g., 'mp3', 'ogg')
      } else {
        return 'Unknown';
      }
    } catch (error) {
      console.error('Error reading file:', error.message);
      return 'Error';
    }
  }

export { downloadAudioFile, processAudioFolder, processAudioFile, convertWavToMp3 };