import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const tempDir =
      process.env.NODE_ENV === "production" ? "/tmp" : "./public/temp";

    if (!fs.existsSync(tempDir)) {
      fs.mkdisSync(tempDir, { recursive: true });
    }
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

export const upload = multer({ storage });
