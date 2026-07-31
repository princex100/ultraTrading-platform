import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = "./public/temp";

// Ensure the directory exists before saving files
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, tempDir);

    },
    filename: function (req, file, cb) {

        const name = String(file.fieldname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);

        cb(null, `${name}-${uniqueSuffix}${ext}`);
    }
    
});

export const upload = multer({ 
    storage, 
});
