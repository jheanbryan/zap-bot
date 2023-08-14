const ytdl = require('ytdl-core');
const fs = require('fs');
const { BOT_EMOJI, TEMP_FOLDER } = require("../config");
const { extractDataMessage, downloadImage } = require("../utils");



module.exports = downloadAudio;