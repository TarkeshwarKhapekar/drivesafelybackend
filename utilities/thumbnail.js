import ffmpeg from 'fluent-ffmpeg';
import multer from "multer";
import path from "path";
import fse from "fs-extra";
const sharp = require('sharp');

function createThumbnail(videoFile, thumbnailPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoFile)
      .on('end', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      })
      .screenshot({
        timestamps: ['50%'],
        filename: thumbnailPath,
        folder: './thumbnails',
        size: '320x240'
      });
  });
}

async function createThumbnails(req, res, next) {
  const files = req?.files?.videos;

  if (!files || files.length === 0) {
    // return res.status(400).json({ message: 'No files uploaded' });
    next();
    return;
  }

  const thumbnailPromises = files.map((file) => {
    const thumbnailPath = Date.now() + "_" + `thumbnail_${file.originalname.split('.').slice(0, -1).join('.')}.jpg`;
    return createThumbnail(file.path, thumbnailPath)
      .then(() => {
        file.thumbnail = thumbnailPath; // Add the thumbnail path to the file object
        return thumbnailPath;
      })
      .catch((err) => {
        console.error(`Error creating thumbnail for ${file.originalname}: ${err}`);
        return null;
      });
  });

  try {
    const thumbnails = await Promise.all(thumbnailPromises);
    req.files.videos = files; // Update the videos array in the request object
    req.files.videos.thumbnail = thumbnails.filter((thumbnail) => thumbnail !== null); // Add the thumbnails array to the videos object
    next();
  } catch (err) {
    console.error('Error creating thumbnails:', err);
    return res.status(500).json({ message: 'Error creating thumbnails' });
  }
}

module.exports = {
  createThumbnails
};
