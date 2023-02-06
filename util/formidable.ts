import { Request } from "express";
import formidable from "formidable";
import fs from "fs";
export const uploadDir = "uploads";

fs.mkdirSync(uploadDir, { recursive: true });
export const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 10 * 1024 ** 3,
    filter: (part) => part.mimetype?.startsWith("image") || false,
});

export function formParsePromise(req: Request) {
    return new Promise<{
        fields: formidable.Fields;
        files: formidable.Files;
    }>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                fields,
                files,
            });
        });
    });
}
